import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from pinecone import Pinecone

load_dotenv()

router = APIRouter()
client = OpenAI()  # pulls OPENAI_API_KEY from env

# Pinecone setup
pinecone_api = os.getenv("PINECONE_API_KEY")
pinecone_env = os.getenv("PINECONE_ENV")
pinecone_index_name = os.getenv("PINECONE_INDEX_NAME")
pc = Pinecone(api_key=pinecone_api)
index = pc.Index(pinecone_index_name)

# Request model
class QueryRequest(BaseModel):
    question: str

def build_pinecone_results(results):
    """Build pinecone_results from query results"""
    pinecone_results = []
    for match in results.get("matches", []):
        metadata = match.get("metadata", {})
        chunk_text = metadata.get("text")
        if chunk_text:
            pinecone_results.append({
                "text": chunk_text,
                "metadata": {
                    "source": metadata.get("source", "Unknown"),
                    "page": metadata.get("page", "N/A"),
                    "section": metadata.get("section", "N/A")
                }
            })
    return pinecone_results

@router.post("/query")
async def query_handler(req: QueryRequest):
    question = req.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Empty question.")

    try:
        # Embed the question
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=question
        )
        embedding = response.data[0].embedding

        # Retrieve top 5 similar chunks with metadata
        results = index.query(vector=embedding, top_k=5, include_metadata=True)
        
        # Debug: Print Pinecone results
        print(f"Pinecone results: {results}")
        
        # Build context with source information for citations
        pinecone_results = build_pinecone_results(results)
        
        # Debug: Print number of pinecone_results
        print(f"Number of pinecone_results: {len(pinecone_results)}")

        # Create system prompt
        system_prompt = """
You are a helpful course assistant AI.
You must only answer questions based on the provided context.
Always cite the material you reference using the format:
(Source: <source>, Page <page>, Section: <section>).

If the answer is not in the context, reply:
"I'm not sure based on the materials provided."
""".strip()

        # Create user prompt with context and question
        user_prompt = f"""
User question: {question}

Context:
{''.join([
    f"- {doc['text']} (Source: {doc['metadata']['source']}, Page {doc['metadata']['page']}, Section: {doc['metadata']['section']})\n"
    for doc in pinecone_results
])}
""".strip()
        
        # Debug: Print user prompt
        print(f"User prompt: {user_prompt}")

        # Get GPT response
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.3,
            max_tokens=400
        )

        return {"answer": response.choices[0].message.content}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
