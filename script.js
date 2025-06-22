let voices = [];

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
};

function detectLang(text) {
  if (text.match(/[àâçéèêëîïôûùüÿœ]/i)) return "fr-FR"; // Franse
  if (text.match(/\b(ou|mwen|li|nou|yo|pa|ki|sa)\b/i)) return "ht-HT"; // Kreyòl
  if (text.match(/\b(the|you|and|is|this|that)\b/i)) return "en-US"; // Anglè
  return "en-US"; // Default
}

function playText() {
  const text = document.getElementById("textInput").value;
  const speed = parseFloat(document.getElementById("speedControl").value);
  const repeat = document.getElementById("repeatToggle").checked;

  if (!text.trim()) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const lang = detectLang(text);
  utterance.lang = lang;

  const matchedVoice = voices.find(v => v.lang === lang);
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.rate = speed;

  utterance.onend = function () {
    if (repeat) {
      speechSynthesis.speak(utterance);
    }
  };

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

document.addEventListener("DOMContentLoaded", () => {
  // Ajoute kontwòl vitès
  const controlsDiv = document.createElement("div");
  controlsDiv.innerHTML = `
    <label for="speedControl">Vitès: <span id="speedValue">1x</span></label><br/>
    <input type="range" id="speedControl" min="0.5" max="2" value="1" step="0.1"/>
    <br/>
    <label><input type="checkbox" id="repeatToggle" /> Repete Emisyon an</label>
  `;
  document.querySelector(".container").appendChild(controlsDiv);

  document.getElementById("speedControl").addEventListener("input", function () {
    document.getElementById("speedValue").innerText = this.value + "x";
  });
});
  
