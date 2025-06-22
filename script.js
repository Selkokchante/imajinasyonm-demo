let voices = [];
let isLooping = false;
let wakeLock = null;
let mediaRecorder;
let recordedChunks = [];

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
};

function detectLang(text) {
  if (text.match(/[àâçéèêëîïôûùüÿœ]/i)) return "fr-FR";
  if (text.match(/\b(ou|mwen|li|nou|yo|pa|ki|sa)\b/i)) return "ht-HT";
  if (text.match(/\b(the|you|and|is|this|that|i|we|they|are)\b/i)) return "en-US";
  return "en-US";
}

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request("screen");
    console.log("✅ Wake Lock aktive");

    wakeLock.addEventListener("release", () => {
      console.log("🔓 Wake Lock lage");
    });
  } catch (err) {
    console.error(`❌ WakeLock error: ${err.name} - ${err.message}`);
  }
}

document.addEventListener("visibilitychange", () => {
  if (wakeLock !== null && document.visibilityState === "visible") {
    requestWakeLock();
  }
});

function playText() {
  const text = document.getElementById("textInput").value;
  const speed = parseFloat(document.getElementById("rate").value);

  if (!text.trim()) return;

  requestWakeLock();

  const utterance = new SpeechSynthesisUtterance(text);
  const lang = detectLang(text);
  utterance.lang = lang;

  const matchedVoice = voices.find((v) => v.lang === lang);
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
  alert("🔁 Repete otomatik: " + (isLooping ? "Aktive" : "Dekative"));
}

function stopSpeech() {
  speechSynthesis.cancel();
  if (wakeLock !== null) {
    wakeLock.release();
    wakeLock = null;
  }
}

// 🎙️ Rekò vwa
async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  recordedChunks = [];
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) recordedChunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: "audio/webm" });
    const url = URL.createObjectURL(blob);
    document.getElementById("recordedAudio").src = url;
  };

  mediaRecorder.start();
  alert("🎙️ Ap rekòde...");
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    alert("🛑 Rekò fini.");
  }
}
    
