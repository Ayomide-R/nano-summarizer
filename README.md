# 🧠 NanoSummarizer — Chrome Built-in AI Text Summarizer Extension  

> ⚡ **Instant AI summaries online or offline — right inside Chrome.**  
> Built for the [Chrome Built-in AI Devpost Challenge](https://devpost.com/).

---

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Frontend-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/AI-Gemini%20%26%20Xenova-blueviolet?style=for-the-badge&logo=google"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Built%20for-Chrome%20AI%20Challenge-red?style=for-the-badge&logo=googlechrome"/>
</p>

---

## ✨ Overview

NanoSummarizer is a lightweight Chrome extension that can **summarize any text or document instantly** — even **without internet access**.  
It uses **Google’s Gemini API** for online summarization and **Xenova Transformers (DistilBART)** for offline summarization via WASM.

---

## 🚀 Features

✅ Dual-mode summarization:  
- **🌐 Online (Gemini AI)** → Smart, natural summaries  
- **⚙️ Offline (Local Model)** → Works offline using WebAssembly  

✅ File upload support (`.pdf`, `.docx`, `.txt`)  
✅ Clean popup UI built with HTML, CSS, and Vite  
✅ Privacy-first: Offline mode runs fully client-side  

---

## 🧩 Built With

| Technology | Purpose |
|-------------|----------|
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="30"/> **JavaScript (ES6)** | Core scripting for Chrome Extension |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="30"/> **Node.js + Express** | Backend server for online summarization |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" width="30"/> **Google Gemini API** | Online AI text summarization |
| <img src="https://cdn.jsdelivr.net/npm/@xenova/transformers/logo.svg" width="30"/> **Xenova Transformers** | Offline summarization via WASM |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" width="30"/> **Vite** | Fast bundling for Chrome extension |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="30"/> **HTML5 / CSS3** | Extension popup interface |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="30"/> **GitHub** | Source control & deployment |

---

## 🧱 Folder Structure

```

nano-summarizer/
├── backend/
│   ├── index.js              # Express backend with Gemini integration
│   ├── package.json
│   └── uploads/
├── public/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── styles.css
│   └── icon128.png
├── dist/                     # Production build for Chrome
├── vite.config.js
└── README.md

````

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Ayomide-R/nano-summarizer.git
cd nano-summarizer
````

### 2️⃣ Backend setup

```bash
cd backend
npm install
npm start
```

Create a `.env` file:

```
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

### 3️⃣ Frontend build

```bash
npm install
npm run build
```

Then open `chrome://extensions`, enable **Developer mode**,
click **“Load unpacked”**, and select the `dist/` folder.

---

## 🧪 Usage

1. Click the NanoSummarizer icon in Chrome
2. Paste text or upload a document
3. Choose:

   * 🌐 “Summarize Online” (Gemini)
   * ⚙️ “Summarize Offline” (Xenova)
4. Instantly view your AI summary inside the popup!


## 🧠 Challenges I Faced

* Integrating **Xenova Transformers** inside Chrome’s restricted JS sandbox
* Reducing **model load time** for WASM inference
* Handling **PDF and DOCX extraction** reliably
* Managing both **online/offline pipelines** in one interface

---

## 🏆 Accomplishments

* Built a **Chrome extension with dual AI engines**
* Achieved **offline summarization** without cloud APIs
* Clean and fast summarization UI with live feedback
* Seamless local + online switching

---

## 📚 What I Learned

* How to integrate **Gemini API** and **WebAI Transformers** together
* Optimizing **Chrome extension builds** with Vite
* Efficient **file handling and summarization** pipelines

---

## 🔮 What’s Next

* Add webpage summarization (auto-detect active tab text)
* Support for **audio summaries** via Speech API
* Publish to **Chrome Web Store**
* Add **multilingual support**

---

## 🧑‍💻 Author

**Ayomide Abiodun**
🌍 [GitHub](https://github.com/Ayomide-R) | 💼 [Devpost](https://devpost.com/royayomidear)

---

## 📜 License

MIT License © 2025 Ayomide Abiodun

---

<p align="center">
  ⭐ If you found this helpful, consider giving it a star on <a href="https://github.com/Ayomide-R/nano-summarizer.git">GitHub</a>!
</p>
