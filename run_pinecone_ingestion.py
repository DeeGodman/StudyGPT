import os
import sys
import subprocess

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

# Run the embed_chunks_to_pinecone.py script
subprocess.run(['python', 'embed_chunks_to_pinecone.py'])