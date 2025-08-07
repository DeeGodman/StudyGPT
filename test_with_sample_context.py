import requests
import json

# Test the /test-query endpoint with sample context
sample_context = [
    {
        "text": "Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.",
        "metadata": {
            "source": "algorithms.pdf",
            "page": "15",
            "section": "Searching Algorithms"
        }
    },
    {
        "text": "Recursion is a method where the solution to a problem depends on solutions to smaller instances of the same problem. A recursive function calls itself to solve a smaller part of the problem.",
        "metadata": {
            "source": "programming_concepts.pdf",
            "page": "22",
            "section": "Recursion"
        }
    }
]

# Test question
question = "What is binary search?"

# Make request to the test endpoint
res = requests.post(
    "http://127.0.0.1:8000/test-query",
    json={
        "question": question,
        "context": sample_context
    }
)

print("Status Code:", res.status_code)
print("Response:", res.json())

# Test with another question
question2 = "Explain recursion"
res2 = requests.post(
    "http://127.0.0.1:8000/test-query",
    json={
        "question": question2,
        "context": sample_context
    }
)

print("\nSecond Request:")
print("Status Code:", res2.status_code)
print("Response:", res2.json())