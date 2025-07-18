import os
import json
import openai
from dotenv import load_dotenv
from tqdm import tqdm
from pinecone import Pinecone, ServerlessSpec

# Load env variables
load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
pinecone_api = os.getenv("PINECONE_API_KEY")
pinecone_env = os.getenv("PINECONE_ENV")
pinecone_index_name = os.getenv("PINECONE_INDEX_NAME")

# Init Pinecone
pc = Pinecone(api_key=pinecone_api)

# Create index if needed
if pinecone_index_name not in pc.list_indexes().names():
    pc.create_index(
        name=pinecone_index_name,
        dimension=1536,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="gcp",
            region=pinecone_env  # e.g., "us-west4"
        )
    )

index = pc.Index(pinecone_index_name)

# Load chunked course content
with open("chunks_output.json", "r", encoding="utf-8") as f:
    chunks = json.load(f)

batch_size = 100
vectors = []

for chunk in tqdm(chunks, desc="Embedding and uploading chunks"):
    text = chunk["text"]
    try:
        embedding = openai.Embedding.create(
            input=[text],
            model="text-embedding-3-small"
        )["data"][0]["embedding"]
    except Exception as e:
        print(f"Embedding failed for {chunk['id']}: {e}")
        continue

    vectors.append({
        "id": chunk["id"],
        "values": embedding,
        "metadata": {
            "course": chunk["course"],
            "week": chunk["week"],
            "level": chunk["level"],
            "semester": chunk["semester"],
            "file": chunk["file"],
            "file_type": chunk["file_type"],
            "chunk_index": chunk["chunk_index"]
        }
    })

    if len(vectors) >= batch_size:
        index.upsert(vectors=vectors)
        vectors = []

# Final batch
if vectors:
    index.upsert(vectors=vectors)

print("✅ Embeddings uploaded to Pinecone successfully.")

