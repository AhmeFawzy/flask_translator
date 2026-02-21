// app/static/js/app.js

// ===== Configuration =====
const API_ENDPOINT = '/api/translate';
const MAX_CHARS = 5000;

// ===== Language Metadata =====
const LANGUAGES = {
  auto: { name: 'Auto-Detect', dir: 'ltr', flag: '🔍' },
  en: { name: 'English', dir: 'ltr', flag: '🇬🇧' },
  fr: { name: 'French', dir: 'ltr', flag: '🇫🇷' },
  de: { name: 'German', dir: 'ltr', flag: '🇩🇪' },
  ar: { name: 'Arabic', dir: 'rtl', flag: '🇸🇦' },
  es: { name: 'Spanish', dir: 'ltr', flag: '🇪🇸' },
  it: { name: 'Italian', dir: 'ltr', flag: '🇮🇹' },
  pt: { name: 'Portuguese', dir: 'ltr', flag: '🇵🇹' },
  ru: { name: 'Russian', dir: 'ltr', flag: '🇷🇺' },
  zh: { name: 'Chinese', dir: 'ltr', flag: '🇨🇳' },
  ja: { name: 'Japanese', dir: 'ltr', flag: '🇯🇵' },
  ko: { name: 'Korean', dir: 'ltr', flag: '🇰🇷' },
  hi: { name: 'Hindi', dir: 'ltr', flag: '🇮🇳' },
  tr: { name: 'Turkish', dir: 'ltr', flag: '🇹🇷' },
  nl: { name: 'Dutch', dir: 'ltr', flag: '🇳🇱' },
  pl: { name: 'Polish', dir: 'ltr', flag: '🇵🇱' },
  sv: { name: 'Swedish', dir: 'ltr', flag: '🇸🇪' },
  da: { name: 'Danish', dir: 'ltr', flag: '🇩🇰' },
  fi: { name: 'Finnish', dir: 'ltr', flag: '🇫🇮' },
  no: { name: 'Norwegian', dir: 'ltr', flag: '🇳🇴' },
  cs: { name: 'Czech', dir: 'ltr', flag: '🇨🇿' },
  el: { name: 'Greek', dir: 'ltr', flag: '🇬🇷' },
  he: { name: 'Hebrew', dir: 'rtl', flag: '🇮🇱' },
  th: { name: 'Thai', dir: 'ltr', flag: '🇹🇭' },
  vi: { name: 'Vietnamese', dir: 'ltr', flag: '🇻🇳' },
  id: { name: 'Indonesian', dir: 'ltr', flag: '🇮🇩' },
  ms: { name: 'Malay', dir: 'ltr', flag: '🇲🇾' },
  uk: { name: 'Ukrainian', dir: 'ltr', flag: '🇺🇦' },
  ro: { name: 'Romanian', dir: 'ltr', flag: '🇷🇴' },
  hu: { name: 'Hungarian', dir: 'ltr', flag: '🇭🇺' },
  fa: { name: 'Persian', dir: 'rtl', flag: '🇮🇷' },
  ur: { name: 'Urdu', dir: 'rtl', flag: '🇵🇰' },
  bn: { name: 'Bengali', dir: 'ltr', flag: '🇧🇩' },
  ta: { name: 'Tamil', dir: 'ltr', flag: '🇮🇳' },
  sw: { name: 'Swahili', dir: 'ltr', flag: '🇰🇪' },
  af: { name: 'Afrikaans', dir: 'ltr', flag: '🇿🇦' },
  sq: { name: 'Albanian', dir: 'ltr', flag: '🇦🇱' },
  hy: { name: 'Armenian', dir: 'ltr', flag: '🇦🇲' },
  az: { name: 'Azerbaijani', dir: 'ltr', flag: '🇦🇿' },
  eu: { name: 'Basque', dir: 'ltr', flag: '🇪🇸' },
  be: { name: 'Belarusian', dir: 'ltr', flag: '🇧🇾' },
  bg: { name: 'Bulgarian', dir: 'ltr', flag: '🇧🇬' },
  ca: { name: 'Catalan', dir: 'ltr', flag: '🇪🇸' },
  hr: { name: 'Croatian', dir: 'ltr', flag: '🇭🇷' },
  et: { name: 'Estonian', dir: 'ltr', flag: '🇪🇪' },
  tl: { name: 'Filipino', dir: 'ltr', flag: '🇵🇭' },
  gl: { name: 'Galician', dir: 'ltr', flag: '🇪🇸' },
  ka: { name: 'Georgian', dir: 'ltr', flag: '🇬🇪' },
  gu: { name: 'Gujarati', dir: 'ltr', flag: '🇮🇳' },
  ht: { name: 'Haitian Creole', dir: 'ltr', flag: '🇭🇹' },
  is: { name: 'Icelandic', dir: 'ltr', flag: '🇮🇸' },
  ga: { name: 'Irish', dir: 'ltr', flag: '🇮🇪' },
  jw: { name: 'Javanese', dir: 'ltr', flag: '🇮🇩' },
  kn: { name: 'Kannada', dir: 'ltr', flag: '🇮🇳' },
  kk: { name: 'Kazakh', dir: 'ltr', flag: '🇰🇿' },
  km: { name: 'Khmer', dir: 'ltr', flag: '🇰🇭' },
  ku: { name: 'Kurdish', dir: 'ltr', flag: '🇮🇶' },
  ky: { name: 'Kyrgyz', dir: 'ltr', flag: '🇰🇬' },
  lo: { name: 'Lao', dir: 'ltr', flag: '🇱🇦' },
  la: { name: 'Latin', dir: 'ltr', flag: '🏛️' },
  lv: { name: 'Latvian', dir: 'ltr', flag: '🇱🇻' },
  lt: { name: 'Lithuanian', dir: 'ltr', flag: '🇱🇹' },
  mk: { name: 'Macedonian', dir: 'ltr', flag: '🇲🇰' },
  mg: { name: 'Malagasy', dir: 'ltr', flag: '🇲🇬' },
  ml: { name: 'Malayalam', dir: 'ltr', flag: '🇮🇳' },
  mt: { name: 'Maltese', dir: 'ltr', flag: '🇲🇹' },
  mi: { name: 'Maori', dir: 'ltr', flag: '🇳🇿' },
  mr: { name: 'Marathi', dir: 'ltr', flag: '🇮🇳' },
  mn: { name: 'Mongolian', dir: 'ltr', flag: '🇲🇳' },
  ne: { name: 'Nepali', dir: 'ltr', flag: '🇳🇵' },
  ps: { name: 'Pashto', dir: 'rtl', flag: '🇦🇫' },
  pa: { name: 'Punjabi', dir: 'ltr', flag: '🇮🇳' },
  sr: { name: 'Serbian', dir: 'ltr', flag: '🇷🇸' },
  st: { name: 'Sesotho', dir: 'ltr', flag: '🇿🇦' },
  sn: { name: 'Shona', dir: 'ltr', flag: '🇿🇼' },
  sd: { name: 'Sindhi', dir: 'ltr', flag: '🇵🇰' },
  si: { name: 'Sinhala', dir: 'ltr', flag: '🇱🇰' },
  sk: { name: 'Slovak', dir: 'ltr', flag: '🇸🇰' },
  sl: { name: 'Slovenian', dir: 'ltr', flag: '🇸🇮' },
  so: { name: 'Somali', dir: 'ltr', flag: '🇸🇴' },
  su: { name: 'Sundanese', dir: 'ltr', flag: '🇮🇩' },
  tg: { name: 'Tajik', dir: 'ltr', flag: '🇹🇯' },
  te: { name: 'Telugu', dir: 'ltr', flag: '🇮🇳' },
  tt: { name: 'Tatar', dir: 'ltr', flag: '🇷🇺' },
  tk: { name: 'Turkmen', dir: 'ltr', flag: '🇹🇲' },
  ug: { name: 'Uyghur', dir: 'rtl', flag: '🇨🇳' },
  uz: { name: 'Uzbek', dir: 'ltr', flag: '🇺🇿' },
  cy: { name: 'Welsh', dir: 'ltr', flag: '🇬🇧' },
  xh: { name: 'Xhosa', dir: 'ltr', flag: '🇿🇦' },
  yi: { name: 'Yiddish', dir: 'rtl', flag: '🇮🇱' },
  yo: { name: 'Yoruba', dir: 'ltr', flag: '🇳🇬' },
  zu: { name: 'Zulu', dir: 'ltr', flag: '🇿🇦' }
};

// RTL Languages
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur', 'ps', 'ug', 'yi'];

// ===== DOM Elements =====
const elements = {
  inputText: document.getElementById('inputText'),
  outputText: document.getElementById('outputText'),
  sourceLang: document.getElementById('sourceLang'),
  targetLang: document.getElementById('targetLang'),
  translateBtn: document.getElementById('translateBtn'),
  swapBtn: document.getElementById('swapLanguages'),
  clearSource: document.getElementById('clearSource'),
  clearTarget: document.getElementById('clearTarget'),
  copySource: document.getElementById('copySource'),
  copyTarget: document.getElementById('copyTarget'),
  loading: document.getElementById('loading'),
  error: document.getElementById('error'),
  errorMessage: document.getElementById('errorMessage'),
  success: document.getElementById('success'),
  charCount: document.getElementById('charCount'),
  translationTime: document.getElementById('translationTime'),
  apiStatus: document.getElementById('apiStatus'),
  timestamp: document.getElementById('timestamp'),
  detectedLangContainer: document.getElementById('detectedLangContainer'),
  detectedLangName: document.getElementById('detectedLangName'),
  correctLangBtn: document.getElementById('correctLangBtn')
};

// ===== State =====
let isTranslating = false;
let translationStartTime = null;
let debounceTimer = null;
let detectedSourceLang = null;

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Translator App Initialized');
  setupEventListeners();
  updateCharCount();
  updateTimestamp();
  updateTextDirection();
  checkApiHealth();
});

// ===== Event Listeners =====
function setupEventListeners() {
  if (elements.translateBtn) {
    elements.translateBtn.addEventListener('click', handleTranslate);
  }
  
  if (elements.inputText) {
    elements.inputText.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleTranslate();
      }
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        handleTranslate();
      }
    });
    
    elements.inputText.addEventListener('input', () => {
      updateCharCount();
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (elements.inputText.value.trim() && !isTranslating) {
          handleTranslate();
        }
      }, 800);
    });
  }
  
  if (elements.sourceLang) {
    elements.sourceLang.addEventListener('change', () => {
      detectedSourceLang = null;
      hideDetectedLanguage();
      updateTextDirection();
      if (elements.inputText?.value.trim() && !isTranslating) {
        handleTranslate();
      }
    });
  }
  
  if (elements.targetLang) {
    elements.targetLang.addEventListener('change', () => {
      updateTextDirection();
      if (elements.inputText?.value.trim() && !isTranslating) {
        handleTranslate();
      }
    });
  }
  
  if (elements.swapBtn) {
    elements.swapBtn.addEventListener('click', swapLanguages);
  }
  
  if (elements.clearSource) {
    elements.clearSource.addEventListener('click', () => clearField(elements.inputText));
  }
  if (elements.clearTarget) {
    elements.clearTarget.addEventListener('click', () => clearField(elements.outputText));
  }
  
  if (elements.copySource) {
    elements.copySource.addEventListener('click', () => copyToClipboard(elements.inputText));
  }
  if (elements.copyTarget) {
    elements.copyTarget.addEventListener('click', () => copyToClipboard(elements.outputText));
  }
  
  if (elements.correctLangBtn) {
    elements.correctLangBtn.addEventListener('click', () => {
      if (detectedSourceLang && elements.sourceLang) {
        elements.sourceLang.value = detectedSourceLang;
        hideDetectedLanguage();
        updateTextDirection();
      }
    });
  }
}

// ===== Text Direction =====
function updateTextDirection() {
  const source = elements.sourceLang?.value || 'auto';
  const target = elements.targetLang?.value || 'fr';
  const detectedLang = detectedSourceLang || (source !== 'auto' ? source : null);
  
  if (elements.inputText) {
    const isRTL = detectedLang && RTL_LANGUAGES.includes(detectedLang);
    elements.inputText.dir = isRTL ? 'rtl' : 'ltr';
    elements.inputText.lang = detectedLang || 'en';
    elements.inputText.classList.toggle('rtl-text', isRTL);
    elements.inputText.classList.toggle('ltr-text', !isRTL);
  }
  
  if (elements.outputText) {
    const isRTL = target && RTL_LANGUAGES.includes(target);
    elements.outputText.dir = isRTL ? 'rtl' : 'ltr';
    elements.outputText.lang = target;
    elements.outputText.classList.toggle('rtl-text', isRTL);
    elements.outputText.classList.toggle('ltr-text', !isRTL);
  }
}

// ===== Detected Language UI =====
function showDetectedLanguage(langCode) {
  if (!elements.detectedLangContainer || !elements.detectedLangName) return;
  detectedSourceLang = langCode;
  const langInfo = LANGUAGES[langCode] || { name: langCode, flag: '' };
  elements.detectedLangName.textContent = `${langInfo.flag} ${langInfo.name}`;
  elements.detectedLangContainer.classList.remove('hidden');
}

function hideDetectedLanguage() {
  if (elements.detectedLangContainer) {
    elements.detectedLangContainer.classList.add('hidden');
  }
  detectedSourceLang = null;
}

// ===== Translation =====
async function handleTranslate() {
  if (isTranslating) return;
  
  const text = elements.inputText?.value.trim();
  let source = elements.sourceLang?.value || 'auto';
  const target = elements.targetLang?.value || 'fr';
  
  if (!text) {
    showError('Please enter text to translate');
    return;
  }
  
  if (text.length > MAX_CHARS) {
    showError(`Text exceeds ${MAX_CHARS} characters`);
    return;
  }
  
  if (source === target && source !== 'auto') {
    elements.outputText.value = text;
    showSuccess('Languages identical - text copied');
    return;
  }
  
  translationStartTime = performance.now();
  setLoading(true);
  hideFeedback();
  hideDetectedLanguage();
  
  try {
    console.log(`🔄 Translating: "${text.substring(0, 50)}..." (${source} → ${target})`);
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, source, target })
    });
    
    const data = await response.json();
    const duration = ((performance.now() - translationStartTime) / 1000).toFixed(2);
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }
    
    elements.outputText.value = data.translated_text || '';
    
    if (source === 'auto' && data.detected_source) {
      showDetectedLanguage(data.detected_source);
    }
    
    if (elements.translationTime) {
      elements.translationTime.textContent = `${duration}s`;
    }
    
    updateTextDirection();
    console.log('✅ Translation successful');
    showSuccess('Translation complete!');
    
  } catch (error) {
    console.error('❌ Translation error:', error);
    showError(error.message || 'Translation failed');
    elements.outputText.value = '';
  } finally {
    setLoading(false);
  }
}

// ===== Swap Languages =====
function swapLanguages() {
  if (!elements.sourceLang || !elements.targetLang) return;
  
  if (elements.sourceLang.value === 'auto') {
    showError('Cannot swap when source is Auto-Detect. Select a specific language first.');
    return;
  }
  
  const tempLang = elements.sourceLang.value;
  elements.sourceLang.value = elements.targetLang.value;
  elements.targetLang.value = tempLang;
  
  detectedSourceLang = null;
  hideDetectedLanguage();
  updateTextDirection();
  
  if (elements.inputText && elements.outputText) {
    const tempText = elements.inputText.value;
    elements.inputText.value = elements.outputText.value;
    elements.outputText.value = tempText;
  }
  
  updateCharCount();
  
  if (elements.inputText?.value.trim() && !isTranslating) {
    handleTranslate();
  }
}

// ===== Clear Field =====
function clearField(textarea) {
  if (!textarea) return;
  textarea.value = '';
  
  if (textarea === elements.inputText) {
    if (elements.outputText) elements.outputText.value = '';
    if (elements.translationTime) elements.translationTime.textContent = '';
    updateCharCount();
  }
  
  hideFeedback();
  hideDetectedLanguage();
  textarea.focus();
}

// ===== Copy to Clipboard =====
async function copyToClipboard(textarea) {
  if (!textarea || !textarea.value) return;
  
  try {
    await navigator.clipboard.writeText(textarea.value);
    const btn = textarea === elements.inputText ? elements.copySource : elements.copyTarget;
    if (btn) {
      const original = btn.textContent;
      btn.textContent = '✅';
      setTimeout(() => { btn.textContent = original; }, 1500);
    }
  } catch (err) {
    console.error('Copy failed:', err);
    showError('Failed to copy to clipboard');
  }
}

// ===== UI Helpers =====
function setLoading(loading) {
  isTranslating = loading;
  
  if (elements.translateBtn) {
    elements.translateBtn.disabled = loading;
    elements.translateBtn.innerHTML = loading 
      ? '<span class="spinner-small"></span> Translating...' 
      : '<span class="translate-icon">✨</span> Translate';
  }
  
  if (elements.inputText) elements.inputText.disabled = loading;
  if (elements.sourceLang) elements.sourceLang.disabled = loading;
  if (elements.targetLang) elements.targetLang.disabled = loading;
  
  if (elements.loading) {
    elements.loading.classList.toggle('hidden', !loading);
  }
}

function showError(message) {
  if (elements.errorMessage) elements.errorMessage.textContent = message;
  if (elements.error) elements.error.classList.remove('hidden');
  if (elements.success) elements.success.classList.add('hidden');
  setTimeout(() => { if (elements.error) elements.error.classList.add('hidden'); }, 5000);
}

function showSuccess(message) {
  if (elements.error) elements.error.classList.add('hidden');
  if (elements.success) {
    elements.success.classList.remove('hidden');
    setTimeout(() => { elements.success.classList.add('hidden'); }, 2000);
  }
}

function hideFeedback() {
  if (elements.error) elements.error.classList.add('hidden');
  if (elements.success) elements.success.classList.add('hidden');
  if (elements.loading) elements.loading.classList.add('hidden');
}

function updateCharCount() {
  if (!elements.inputText || !elements.charCount) return;
  const count = elements.inputText.value.length;
  elements.charCount.textContent = `${count} / ${MAX_CHARS} characters`;
  elements.charCount.style.color = count > MAX_CHARS * 0.9 ? '#f59e0b' : '';
}

function updateTimestamp() {
  if (!elements.timestamp) return;
  const now = new Date();
  elements.timestamp.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  setTimeout(updateTimestamp, 60000);
}

async function checkApiHealth() {
  if (!elements.apiStatus) return;
  try {
    const response = await fetch('/health', { method: 'GET', cache: 'no-store' });
    if (response.ok) {
      elements.apiStatus.textContent = 'Ready';
      elements.apiStatus.style.color = '#10b981';
    } else {
      throw new Error('Health check failed');
    }
  } catch (error) {
    elements.apiStatus.textContent = 'Unavailable';
    elements.apiStatus.style.color = '#ef4444';
  }
}

// ===== Spinner Style =====
const style = document.createElement('style');
style.textContent = `
  .spinner-small {
    display: inline-block;
    width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    vertical-align: middle;
    margin-right: 6px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;
document.head.appendChild(style);