from fastapi import APIRouter
from pydantic import BaseModel
import os
from ghana_nlp import GhanaNLP

router = APIRouter()
GH_API = GhanaNLP(api_key=os.getenv("GHANANLP_API_KEY"))

class TranslationRequest(BaseModel):
    text: str
    source_lang: str = "en"
    target_lang: str

@router.post("/translate")
async def translate_text(req: TranslationRequest):
    try:
        # Create language pair in format expected by Ghana NLP API
        lang_pair = f"{req.source_lang}-{req.target_lang}"
        
        # Perform translation using Ghana NLP library
        translated_text = GH_API.translate(req.text, lang=lang_pair)
        
        return {
            "translated_text": translated_text,
            "source_lang": req.source_lang,
            "target_lang": req.target_lang
        }
    except Exception as e:
        return {"error": str(e)}