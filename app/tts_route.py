from fastapi import APIRouter, Response, HTTPException
from pydantic import BaseModel
import os
import httpx

router = APIRouter()

# Ghana NLP API configuration
api_key = os.getenv("GHANANLP_API_KEY")
tts_url = "https://translation-api.ghananlp.org/tts/v1/synthesize"

class TTSRequest(BaseModel):
    text: str
    lang: str  # e.g., "ee", "tw", "gaa", "fat", "dag"

@router.post("/tts")
async def synthesize_speech(req: TTSRequest):
    # Check if API key is properly configured
    if not api_key:
        raise HTTPException(status_code=500, detail="GHANANLP_API_KEY not found in environment variables")
    
    # Headers for Ghana NLP API
    headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": api_key
    }
    
    # Payload for TTS request
    payload = {
        "text": req.text,
        "language": req.lang,
        "speaker_id": f"{req.lang}_speaker_1"  # Default speaker, can be customized
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(tts_url, json=payload, headers=headers)
            
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=f"TTS API error: {response.text}")
        
        return Response(content=response.content, media_type="audio/mpeg")
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Network error during TTS request: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS synthesis failed: {str(e)}")