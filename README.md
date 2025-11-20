# SecureGen AI 🔒✨

SecureGen AI is a modern, high-security password generator built with **React** and **Tailwind CSS**. It features a dual-mode generation system: a robust algorithmic generator for cryptographic strength and an AI-powered engine (using **Google Gemini 2.5 Flash**) for creating secure yet memorable passphrases.

## 🚀 Features

### 1. Standard Generator (Algorithmic)
- **Customizable:** Adjust length (6-64 chars) and character sets (Uppercase, Lowercase, Numbers, Symbols).
- **Secure:** Uses `window.crypto.getRandomValues` for cryptographically strong randomness.
- **Strength Meter:** Real-time visual feedback on password strength.
- **Local Execution:** Generated strictly in the browser for maximum privacy.

### 2. AI Generator (Gemini Powered)
- **Memorable Passphrases:** Generates "Correct-Horse-Battery" style passwords that are easy for humans to remember but hard for computers to crack.
- **AI Security Audit:** Provides a witty, sarcastic AI analysis of your chosen password's strength.
- **Powered by:** Google Gemini 2.5 Flash model via the `@google/genai` SDK.

### 3. User Experience
- **Modern UI:** Dark mode, glassmorphism design, and smooth animations.
- **History:** Keeps a temporary session history of generated passwords.
- **Clipboard:** One-click copy functionality.

## 🛠️ Technologies

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS
- **AI:** Google GenAI SDK (`@google/genai`)
- **Design:** Custom SVG Icons & Inter/JetBrains Mono fonts

## 📦 Getting Started

### Prerequisites
- A Google Gemini API Key (Get it from [Google AI Studio](https://aistudio.google.com/))

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/securegen-ai.git
   cd securegen-ai
   ```

2. Environment Variables:
   Ensure you have your `API_KEY` configured in your environment variables or build settings to access the Gemini API features.

### Usage

1. **Standard Tab:** Use sliders and checkboxes to generate complex random passwords.
2. **AI Powered Tab:** Click "Generate with AI" to get phrase-based passwords (e.g., `Blue-Sky-Walking-99`). Click on a generated password to copy it and trigger an AI security audit.

## ☁️ How to Push to GitHub

If you want to upload this project to your GitHub repository, run the following commands in your terminal:

1. **Initialize Git:**
   ```bash
   git init
   ```

2. **Add Files:**
   ```bash
   git add .
   ```

3. **Commit Changes:**
   ```bash
   git commit -m "Initial commit: SecureGen AI App"
   ```

4. **Link Repository** (Replace URL with your repo):
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

5. **Push:**
   ```bash
   git push -u origin main
   ```

## 🔐 Security & Deployment

- **API Key Safety:** This project uses `process.env.API_KEY` to access the Gemini API. The key is **never hardcoded** in the source files.
- **GitHub:** The included `.gitignore` file prevents you from accidentally uploading sensitive files like `.env`. **Never** commit your API key to GitHub.
- **Production:** If deploying to a public URL (like Vercel or Netlify), configure your `API_KEY` in the hosting provider's "Environment Variables" settings.
- **Privacy:** Algorithmic passwords are generated locally and never leave your browser. AI requests are sent securely to Google's servers only when using the AI mode.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.