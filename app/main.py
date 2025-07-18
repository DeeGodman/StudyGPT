from fastapi import FastAPI, Request
from pydantic import BaseModel
import openai
import os

from fastapi import FastAPI
from app.query_route import router  # adjust import path if needed

app = FastAPI()
app.include_router(router)


openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

class QueryRequest(BaseModel):
    question: str

@app.post("/query")
async def query_handler(req: QueryRequest):
    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a helpful CS course assistant."},
            {"role": "user", "content": req.question}
        ],
        max_tokens=300,
        temperature=0.3
    )
    return {"answer": response['choices'][0]['message']['content']}
