function playText() {
  const text = document.getElementById('textInput').value;

  if (!text.trim()) {
    alert("Tanpri mete tèks pou tande emisyon an!");
    return;
  }

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "ht-HT"; // Lang kreyòl (oswa ou ka mete "fr-FR", "en-US", elatriye)
  window.speechSynthesis.speak(speech);
}
