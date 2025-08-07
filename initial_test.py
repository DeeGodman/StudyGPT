import requests
import time

# Test the updated query route
res = requests.post(
    "http://127.0.0.1:8000/query",
    json={"question": "What is binary search?"}
)

print("Status Code:", res.status_code)
print("Response:", res.json())

# Wait a bit before making another request
time.sleep(1)

# Test with another question
res2 = requests.post(
    "http://127.0.0.1:8000/query",
    json={"question": "Explain the concept of recursion in programming."}
)

print("\nSecond Request:")
print("Status Code:", res2.status_code)
print("Response:", res2.json())
