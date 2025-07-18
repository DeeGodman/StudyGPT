import requests

res = requests.post(
    "http://127.0.0.1:8000/query",
    json={"question": "What is binary search?"}
)

print(res.status_code)
print(res.json())
