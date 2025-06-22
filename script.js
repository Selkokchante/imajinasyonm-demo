let voices = [];
let isLooping = false;

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
};

function detectLang(text) {
  if (text.match(/[àâçéèêëîïôûùüÿœ]/i)) return "fr-FR"; // Fransè
  if (text.match(/\b(ou|mwen|li|nou|yo|pa|ki|sa)\b/i)) return "ht-HT"; // Kreyòl
  if (text.match(/\b(the|you|and|is|this|that|i|we|they|are)\b/i)) return "en-US"; // Anglè
  return "en-US"; // Default fallback
}

function playText() {
  const text = document.getElementById("textInput").value;
  const speed = parseFloat(document.getElementById("rate").value);

  if (!text.trim()) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const lang = detectLang(text);
  utterance.lang = lang;

  const matchedVoice = voices.find(v => v.lang === lang);
  if (matchedVoice) utterance.voice = matchedVoice;

  utterance.rate = speed;

  utterance.onend = function () {
    if (isLooping) speechSynthesis.speak(utterance);
  };

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function toggleLoop() {
  isLooping = !isLooping;
  alert("Repete otomatik: " + (isLooping ? "Aktive" : "Dekative"));
}

function stopSpeech() {
  speechSynthesis.cancel();
}

function startRecording() {
  alert("Fonksyon rekò vwa poko aktive. Nou ka ajoute l pita ak Web Audio API oswa sèvis ekstèn.");
    }
