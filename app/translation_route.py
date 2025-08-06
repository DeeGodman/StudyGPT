from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import httpx
import json

router = APIRouter()

# Ghana NLP API configuration
api_key = os.getenv("GHANANLP_API_KEY")
translation_url = "https://translation-api.ghananlp.org/v1/translate"

def validate_language_code(lang: str) -> bool:
    """Validate if the language code is supported"""
    supported_languages = {"en", "tw", "gaa", "ee", "fat", "dag", "gur", "yo", "ki", "luo", "mer"}
    return lang in supported_languages

class TranslationRequest(BaseModel):
    text: str
    source_lang: str = "en"
    target_lang: str

@router.post("/translate")
async def translate_text(req: TranslationRequest):
    # Validate language codes
    if not validate_language_code(req.source_lang):
        raise HTTPException(status_code=400, detail=f"Unsupported source language: {req.source_lang}")
    if not validate_language_code(req.target_lang):
        raise HTTPException(status_code=400, detail=f"Unsupported target language: {req.target_lang}")
    
    # Check if API key is properly configured
    if not api_key:
        raise HTTPException(status_code=500, detail="GHANANLP_API_KEY not found in environment variables")
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
    
    print(f"Making translation request to {translation_url}")
    print(f"Headers: {headers}")
    print(f"Payload: {payload}")
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(translation_url, json=payload, headers=headers)
            
        print(f"Translation response status: {response.status_code}")
        print(f"Translation response headers: {dict(response.headers)}")
        
        if response.status_code != 200:
            error_text = await response.text()
            print(f"Translation API error response: {error_text}")
            raise HTTPException(status_code=response.status_code, detail=f"Translation API error: {error_text}")
        
        # Parse the response
        response_data = response.json()
        print(f"Translation response data: {response_data}")
        translated_text = response_data.get("translatedText") or response_data.get("text") or req.text
        
        return {
            "translated_text": translated_text,
            "source_lang": req.source_lang,
            "target_lang": req.target_lang
        }
    except httpx.RequestError as e:
        error_detail = f"Network error during translation request: {type(e).__name__}: {str(e)}"
        print(f"Network error: {error_detail}")
        raise HTTPException(status_code=500, detail=error_detail)
    except httpx.TimeoutException as e:
        error_detail = f"Timeout error during translation request: {type(e).__name__}: {str(e)}"
        print(f"Timeout error: {error_detail}")
        raise HTTPException(status_code=500, detail=error_detail)
    except json.JSONDecodeError as e:
        error_detail = f"JSON decode error in translation response: {type(e).__name__}: {str(e)}"
        print(f"JSON decode error: {error_detail}")
        raise HTTPException(status_code=500, detail=error_detail)
    except Exception as e:
        error_detail = f"Unexpected error during translation: {type(e).__name__}: {str(e)}"
        print(f"Unexpected error: {error_detail}")
        raise HTTPException(status_code=500, detail=error_detail)