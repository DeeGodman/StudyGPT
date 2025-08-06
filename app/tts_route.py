from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import requests
import io
import os

router = APIRouter()

GHANA_NLP_API_KEY = os.getenv("GHANANLP_API_KEY")

class TTSRequest(BaseModel):
    text: str
    language: str  # e.g. "tw"
    speaker_id: str  # e.g. "twi_speaker_4"

@router.post("/tts")
async def tts_endpoint(req: TTSRequest):
    headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": GHANA_NLP_API_KEY
    }

    payload = {
        "text": req.text,
        "language": req.language,
        "speaker_id": req.speaker_id
    }

    try:
        response = requests.post(
            "https://translation-api.ghananlp.org/tts/v1/synthesize",
            json=payload,
            headers=headers
        )
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"TTS API call failed: {e}")

    return StreamingResponse(io.BytesIO(response.content), media_type="audio/mpeg")