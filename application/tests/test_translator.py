import pytest
from unittest.mock import Mock, patch
from app.services.translator import translate_text

@patch('app.services.translator.GoogleTranslator')
def test_translate_success(mock_translator_class):
    # Arrange
    mock_instance = Mock()
    mock_instance.translate.return_value = "Bonjour"
    mock_translator_class.return_value = mock_instance
    
    # Act
    result = translate_text("Hello", "en", "fr")
    
    # Assert
    assert result['translated_text'] == "Bonjour"
    assert result['source'] == "en"
    assert result['target'] == "fr"