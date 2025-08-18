# 📘 StudyGPT – AI-Powered Course Assistant

StudyGPT is an intelligent learning assistant that helps students interact with their course materials using **OpenAI GPT models**, **Pinecone vector search**, and **GhanaNLP APIs** for translation and text-to-speech. The system provides **cited answers**, supports **local Ghanaian languages**, and is optimized for **web and mobile** use.

---

## 🚀 Features

* 💬 **AI Chat Assistant** – Ask questions in English and receive course-specific answers.
* 📚 **Course Material Search** – Sources answers from uploaded slides and notes (via Pinecone).
* 🔊 **Text-to-Speech (TTS)** – Play answers aloud in Twi and other local languages using GhanaNLP.
* 🌍 **Translation** – Translate AI responses from English to local Ghanaian languages.
* 📱 **Mobile-Optimized** – Responsive design with voice playback.
* 📂 **Library System** – Access static slides and materials stored in Amazon S3.
* 🔒 **Secure API Keys** – Uses `.env` for sensitive credentials.

---

## 🛠️ Tech Stack

| Component            | Technology                           |
| -------------------- | ------------------------------------ |
| Backend API          | FastAPI + Uvicorn                    |
| AI Model             | OpenAI GPT-4o                        |
| Database / Vector DB | Pinecone                             |
| Translation & TTS    | GhanaNLP APIs                        |
| Frontend             | Next.js + TailwindCSS                |
| Storage              | Amazon S3                            |
| Deployment           | Render (Backend) + Vercel (Frontend) |

---

## 📂 Project Structure

```
studygpt/
│── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI entry point
│   │   ├── query_route.py   # Chat query handling
│   │   ├── utils/           # Helper functions (translation, TTS, citation)
│── frontend/
│   ├── components/          # React components (ChatUI, Library, Settings)
│   ├── pages/               # Next.js pages
│   ├── utils/               # Fetch helpers, API calls
│── README.md
│── .env.example
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/studygpt.git
cd studygpt
```

### 2️⃣ Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # (or venv\Scripts\activate on Windows)
pip install -r requirements.txt
```

Create a `.env` file:

```env
OPENAI_API_KEY=your-openai-key
PINECONE_API_KEY=your-pinecone-key
GHANANLP_API_KEY=your-ghananlp-key
AWS_BUCKET=study-gpt-course-materials
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing

* **Backend Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
* **Frontend:** [http://localhost:3000](http://localhost:3000)
* Try sending a `POST /query` request with:

```json
{
  "question": "What is recursion in CS?"
}
```

---

## 📦 Deployment

* **Backend:** Render (with `start command: uvicorn app.main:app --host 0.0.0.0 --port 10000`)
* **Frontend:** Vercel (linking to backend API via `NEXT_PUBLIC_BACKEND_URL`).
* **Static Files:** Amazon S3 with public access for `SLIDES/`.

---

## 🎯 Roadmap

* [x] AI chat assistant
* [x] Pinecone integration
* [x] Library system with S3
* [x] GhanaNLP TTS & Translation

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.

---

## 📜 License

MIT License – free to use and modify.

---
