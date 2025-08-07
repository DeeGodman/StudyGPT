import os
from dotenv import load_dotenv
from pinecone import Pinecone

# Load env variables
load_dotenv()

pinecone_api = os.getenv("PINECONE_API_KEY")
pinecone_env = os.getenv("PINECONE_ENV")
pinecone_index_name = os.getenv("PINECONE_INDEX_NAME")

# Init Pinecone
pc = Pinecone(api_key=pinecone_api)

# Get index stats
index = pc.Index(pinecone_index_name)
stats = index.describe_index_stats()

print("Pinecone Index Stats:")
print(f"Index Name: {pinecone_index_name}")
print(f"Dimensions: {stats.get('dimension', 'Unknown')}")
print(f"Total Vector Count: {stats.get('total_vector_count', 'Unknown')}")
print(f"Namespaces: {stats.get('namespaces', 'None')}")