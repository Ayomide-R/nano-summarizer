// popup.js

const inputText = document.getElementById("inputText");
const output = document.getElementById("output");
const summarizeOnline = document.getElementById("summarizeOnline");
const summarizeOffline = document.getElementById("summarizeOffline");
const fileInput = document.getElementById("fileInput");
const summarizeFile = document.getElementById("summarizeFile");

const BACKEND_URL = "http://localhost:3000/api/summarize";

let summarizer = null; // cache the offline model

// --- 🌐 ONLINE SUMMARIZATION (Gemini via backend) ---
summarizeOnline.addEventListener("click", async () => {
  const text = inputText.value.trim();
  if (!text) return alert("Please enter or paste some text");

  output.textContent = "⏳ Summarizing online (Gemini)...";
  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    if (data.summary) {
      output.textContent = "✅ " + data.summary;
    } else {
      output.textContent = "⚠️ No summary returned.";
    }
  } catch (err) {
    console.error("❌ Online summarization error:", err);
    output.textContent = "❌ Error summarizing online.";
  }
});


// --- ⚙️ OFFLINE SUMMARIZATION (Xenova Transformer Model) ---
summarizeOffline.addEventListener("click", async () => {
  const text = inputText.value.trim();
  if (!text) return alert("Please enter or paste some text");

  try {
    output.textContent = summarizer
      ? "🧠 Summarizing offline..."
      : "⚙️ Loading offline model (this may take a bit on first run)...";

    // Load model only once (cached)
    if (!summarizer) {
      const { pipeline } = await import(
        "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2"
      );

      summarizer = await pipeline("summarization", "Xenova/distilbart-cnn-12-6");
      console.log("✅ Offline model loaded successfully");
    }

    // Perform summarization
    const result = await summarizer(text, {
      max_length: 120,
      min_length: 30,
      truncation: true,
    });

    output.textContent = "🧠 " + result[0].summary_text;
  } catch (err) {
    console.error("❌ Offline summarization error:", err);
    output.textContent =
      "❌ Error summarizing offline. Please check console for details.";
  }
});


// --- 📄 FILE UPLOAD SUMMARIZATION (Backend) ---
summarizeFile.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) return alert("Please select a file first.");

  output.textContent = "📄 Reading file...";

  try {
    const formData = new FormData();
    formData.append("file", file);

    output.textContent = "⏳ Uploading and summarizing file...";

    const res = await fetch("http://localhost:3000/api/summarize-file", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.summary) {
      output.textContent = "✅ " + data.summary;
    } else {
      output.textContent = "⚠️ No summary returned from file.";
    }
  } catch (err) {
    console.error("❌ File summarization error:", err);
    output.textContent = "❌ Error summarizing file.";
  }
});
