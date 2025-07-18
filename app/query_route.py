import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import openai
from dotenv import load_dotenv
from pinecone import Pinecone

load_dotenv()

router = APIRouter()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Pinecone setup
pinecone_api = os.getenv("PINECONE_API_KEY")
pinecone_env = os.getenv("PINECONE_ENV")
pinecone_index_name = os.getenv("PINECONE_INDEX_NAME")
pc = Pinecone(api_key=pinecone_api)
index = pc.Index(pinecone_index_name)

# Request model
class QueryRequest(BaseModel):
    question: str

@router.post("/query")
async def query_handler(req: QueryRequest):
    question = req.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Empty question.")

    try:
        # Embed the question
        embedding = openai.Embedding.create(
            input=[question],
            model="text-embedding-3-small"
        )["data"][0]["embedding"]

        # Retrieve top 5 similar chunks
        results = index.query(vector=embedding, top_k=5, include_metadata=True)

        # Build context string from matched chunks
        context_parts = []
        for match in results.get("matches", []):
            chunk_text = match["metadata"].get("text")
            if chunk_text:
                context_parts.append(chunk_text)

        context = "\n---\n".join(context_parts)
        prompt = f"Use the following course materials to answer the question.\n---\n{context}\n---\nQuestion: {question}"

        # Get GPT response
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant for a university-level CS course."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.4
        )

        return {"answer": response["choices"][0]["message"]["content"]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
