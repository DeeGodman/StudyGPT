from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import httpx

router = APIRouter()

# Ghana NLP API configuration
api_key = os.getenv("GHANANLP_API_KEY")
translation_url = "https://translation-api.ghananlp.org/v1/translate"

class TranslationRequest(BaseModel):
    text: str
    source_lang: str = "en"
    target_lang: str

@router.post("/translate")
async def translate_text(req: TranslationRequest):
    # Check if API key is properly configured
    if not api_key:
        raise HTTPException(status_code=500, detail="GHANANLP_API_KEY not found in environment variables")
    
    # Headers for Ghana NLP API
    headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": api_key
    }
    
    # Create language pair in format expected by Ghana NLP API
    lang_pair = f"{req.source_lang}-{req.target_lang}"
    
    # Payload for translation request
    payload = {
        "in": req.text,
        "lang": lang_pair
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(translation_url, json=payload, headers=headers)
            
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=f"Translation API error: {response.text}")
        
        # Parse the response
        response_data = response.json()
        translated_text = response_data.get("translatedText") or response_data.get("text") or req.text
        
        return {
            "translated_text": translated_text,
            "source_lang": req.source_lang,
            "target_lang": req.target_lang
        }
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Network error during translation request: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")