let loop = false;

function detectLang(text) {
  if (/[àâçéèêëîïôûùüÿñæœ]/i.test(text)) return "fr-FR";
  if (/[a-zA-Z]/.test(text) && !text.includes("ò") && !text.includes("è")) return "en-US";
  if (/[\u00C0-\u017F]|[òèù]/i.test(text)) return "ht-HT"; // Kreyòl approximation
  return "en-US";
}

function speakText(text, lang = "auto", rate = 1) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === "auto" ? detectLang(text) : lang;
  utterance.rate = rate;
  speechSynthesis.cancel(); // anile avan li nouvo
  speechSynthesis.speak(utterance);

  if (loop) {
    utterance.onend = () => {
      setTimeout(() => {
        speakText(text, lang, rate);
      }, 1000);
    };
  }
}

function playText() {
  const text = document.getElementById("textInput").value;
  const rate = parseFloat(document.getElementById("rate").value);
  speakText(text, "auto", rate);
}

function toggleLoop() {
  loop = !loop;
  alert(loop ? "✅ Repete aktive" : "⛔ Repete dezaktive");
    }
