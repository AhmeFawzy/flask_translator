# app/services/translator.py
import logging
from deep_translator import GoogleTranslator

logger = logging.getLogger(__name__)

SUPPORTED_LANGUAGES = {
    'auto', 'en', 'fr', 'de', 'ar', 'es', 'it', 'pt', 'ru', 'zh',
    'ja', 'ko', 'hi', 'tr', 'nl', 'pl', 'sv', 'da', 'fi', 'no',
    'cs', 'el', 'he', 'th', 'vi', 'id', 'ms', 'uk', 'ro', 'hu',
    'fa', 'ur', 'bn', 'ta', 'sw', 'af', 'sq', 'hy', 'az', 'eu',
    'be', 'bg', 'ca', 'hr', 'et', 'tl', 'gl', 'ka', 'gu', 'ht',
    'is', 'ga', 'jw', 'kn', 'kk', 'km', 'ku', 'ky', 'lo', 'la',
    'lv', 'lt', 'mk', 'mg', 'ml', 'mt', 'mi', 'mr', 'mn', 'ne',
    'ps', 'pa', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so',
    'su', 'tg', 'te', 'tt', 'tk', 'ug', 'uz', 'cy', 'xh', 'yi',
    'yo', 'zu'
}

LANG_CODE_MAP = {
    'zh': 'zh-cn',
    'he': 'iw',
    'yi': 'ji',
}

# Language detection mapping (common phrases to detect language)
LANGUAGE_HINTS = {
    'ar': ['مرحبا', 'السلام', 'كيف', 'شكرا'],
    'de': ['Hallo', 'Guten', 'Wie', 'Danke', 'ist', 'und'],
    'fr': ['Bonjour', 'Comment', 'Merci', 'être', 'et', 'je'],
    'es': ['Hola', 'Cómo', 'Gracias', 'ser', 'y', 'yo'],
    'it': ['Ciao', 'Come', 'Grazie', 'essere', 'e', 'io'],
    'pt': ['Olá', 'Como', 'Obrigado', 'ser', 'e', 'eu'],
    'ru': ['Привет', 'Как', 'Спасибо', 'быть', 'и', 'я'],
    'zh': ['你好', '谢谢', '是', '和', '我'],
    'ja': ['こんにちは', 'ありがとう', 'です', 'と', '私'],
    'ko': ['안녕', '감사', '입니다', '와', '나'],
    'hi': ['नमस्ते', 'कैसे', 'धन्यवाद', 'है', 'और', 'मैं'],
    'he': ['שלום', 'איך', 'תודה', 'הוא', 'ו', 'אני'],
    'fa': ['سلام', 'چطور', 'ممنون', 'است', 'و', 'من'],
    'ur': ['سلام', 'کیسے', 'شکریہ', 'ہے', 'اور', 'میں'],
    'th': ['สวัสดี', 'ขอบคุณ', 'คือ', 'และ', 'ฉัน'],
    'vi': ['Xin chào', 'Cảm ơn', 'là', 'và', 'tôi'],
}

def _detect_language_simple(text: str) -> str:
    """
    Simple language detection based on common words/characters.
    Returns language code or 'en' as default.
    """
    text_lower = text.lower()
    
    # Check for non-Latin scripts first
    if any('\u0600' <= c <= '\u06FF' for c in text):  # Arabic
        return 'ar'
    if any('\u0400' <= c <= '\u04FF' for c in text):  # Cyrillic (Russian, Ukrainian, etc.)
        return 'ru'
    if any('\u4e00' <= c <= '\u9fff' for c in text):  # Chinese
        return 'zh'
    if any('\u3040' <= c <= '\u309f' for c in text):  # Japanese Hiragana
        return 'ja'
    if any('\u30a0' <= c <= '\u30ff' for c in text):  # Japanese Katakana
        return 'ja'
    if any('\uac00' <= c <= '\ud7af' for c in text):  # Korean
        return 'ko'
    if any('\u0590' <= c <= '\u05FF' for c in text):  # Hebrew
        return 'he'
    if any('\u0900' <= c <= '\u097F' for c in text):  # Hindi/Devanagari
        return 'hi'
    if any('\u0e00' <= c <= '\u0e7f' for c in text):  # Thai
        return 'th'
    
    # Check for common words in Latin script languages
    for lang, hints in LANGUAGE_HINTS.items():
        if lang in ['ar', 'ru', 'zh', 'ja', 'ko', 'he', 'hi', 'th']:
            continue  # Already checked above
        for hint in hints:
            if hint.lower() in text_lower:
                return lang
    
    # Default to English
    return 'en'

def translate_text(text: str, source_lang: str, target_lang: str) -> dict:
    """
    Translate text using deep-translator (Google Translate backend).
    Returns dict with translated_text, detected_source, source, target
    """
    if not text or not text.strip():
        return {
            'translated_text': '',
            'detected_source': None,
            'source': source_lang,
            'target': target_lang
        }
    
    if target_lang not in SUPPORTED_LANGUAGES or target_lang == 'auto':
        raise ValueError(f"Unsupported target language: {target_lang}")
    
    detected_source = None
    actual_source = source_lang
    
    if source_lang == 'auto':
        try:
            logger.info(f"🔍 Auto-detecting language for: '{text[:50]}...'")
            detected_source = _detect_language_simple(text)
            logger.info(f"✅ Detected: {detected_source}")
            actual_source = detected_source
        except Exception as e:
            logger.warning(f"⚠️ Detection failed: {e}, defaulting to 'en'")
            actual_source = 'en'
    else:
        if source_lang not in SUPPORTED_LANGUAGES:
            raise ValueError(f"Unsupported source language: {source_lang}")
    
    if actual_source == target_lang:
        return {
            'translated_text': text.strip(),
            'detected_source': detected_source,
            'source': actual_source,
            'target': target_lang,
            'note': 'Source and target languages are identical'
        }
    
    try:
        mapped_source = LANG_CODE_MAP.get(actual_source, actual_source)
        mapped_target = LANG_CODE_MAP.get(target_lang, target_lang)
        
        logger.info(f"🔄 Translating: {actual_source} → {target_lang}")
        
        # Use GoogleTranslator with auto-detect capability
        translator = GoogleTranslator(source=mapped_source, target=mapped_target)
        result = translator.translate(text.strip())
        
        if not result:
            raise RuntimeError("Empty translation result")
        
        logger.info(f"✅ Success: '{text[:30]}...' → '{result[:30]}...'")
        
        return {
            'translated_text': result.strip(),
            'detected_source': detected_source,
            'source': actual_source,
            'target': target_lang
        }
        
    except Exception as e:
        logger.error(f"❌ Translation failed: {str(e)}", exc_info=True)
        raise RuntimeError(f"Translation service error: {str(e)}")