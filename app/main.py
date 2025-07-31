from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import os
from fastapi.middleware.cors import CORSMiddleware
from .query_route import router  # adjust import path if needed

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://study-gpt-n3ub.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

# Initialize OpenAI client
client = OpenAI()  # pulls OPENAI_API_KEY from env

class QueryRequest(BaseModel):
    question: str

@app.post("/query")
async def query_handler(req: QueryRequest):
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful CS course assistant."},
                {"role": "user", "content": req.question}
            ],
            max_tokens=300,
            temperature=0.3
        )
        return {"answer": response.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}
