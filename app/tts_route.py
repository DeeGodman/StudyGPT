from fastapi import APIRouter, Response
from pydantic import BaseModel
import os
from ghana_nlp import GhanaNLP

router = APIRouter()
GH_API = GhanaNLP(api_key=os.getenv("GHANANLP_API_KEY"))

class TTSRequest(BaseModel):
    text: str
    lang: str  # e.g., "ee", "tw", "gaa", "fat", "dag"

@router.post("/tts")
async def synthesize_speech(req: TTSRequest):
    audio_bytes = GH_API.text_to_speech(req.text, lang=req.lang)
    return Response(content=audio_bytes, media_type="audio/mpeg")