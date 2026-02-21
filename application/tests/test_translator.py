import pytest
from unittest.mock import patch
from app.services.translator import translate_text

@patch("app.services.translator.requests.post")
def test_translate_success(mock_post):

    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = {
        "translation": "Bonjour"
    }

    result = translate_text("Hello", "en", "fr")

    assert result == "Bonjour"

