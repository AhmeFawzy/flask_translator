import pytest
from unittest.mock import Mock, patch
from app.services.translator import translate_text

@patch('app.services.translator.GoogleTranslator')
def test_translate_success(mock_translator_class):
    """Test successful translation"""
    mock_instance = Mock()
    mock_instance.translate.return_value = "Bonjour"
    mock_translator_class.return_value = mock_instance
    
    result = translate_text("Hello", "en", "fr")
    
    assert result['translated_text'] == "Bonjour"
    assert result['source'] == "en"
    assert result['target'] == "fr"
    mock_translator_class.assert_called_once_with(source='en', target='fr')
    mock_instance.translate.assert_called_once_with("Hello")

@patch('app.services.translator.GoogleTranslator')
def test_translate_empty_text(mock_translator_class):
    """Test translation with empty text"""
    mock_instance = Mock()
    mock_instance.translate.return_value = ""
    mock_translator_class.return_value = mock_instance
    
    result = translate_text("", "en", "fr")
    
    assert result['translated_text'] == ""

@patch('app.services.translator.GoogleTranslator')
def test_translate_exception(mock_translator_class):
    """Test translation when API fails"""
    mock_instance = Mock()
    mock_instance.translate.side_effect = Exception("API Error")
    mock_translator_class.return_value = mock_instance
    
    with pytest.raises(Exception):
        translate_text("Hello", "en", "fr")