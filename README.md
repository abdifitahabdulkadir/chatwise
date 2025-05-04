# 🧠 Chatwise

<p align="center">
  <img src="https://github.com/abdifitahabdulkadir/chatwise/blob/main/chatwise.png" alt="Chatwise Screenshot" width="100%" height="500px" />
</p>

## ✨ Description

**ChatWise** is an intelligent AI-powered platform designed for seamless conversations, brainstorming, and problem-solving. Instantly explore ideas, ask questions, and get insightful responses.

🔗 [**Live App**](https://chatwise1.vercel.app/)

---

## 🚀 Technologies Used

| Technology       | Badge                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Next.js          | ![Next.js](https://img.shields.io/npm/v/next?style=for-the-badge&label=Next.js&color=black)                            |
| React.js         | ![React](https://img.shields.io/npm/v/react?style=for-the-badge&label=React.js&color=black)                            |
| TypeScript       | ![TypeScript](https://img.shields.io/npm/v/typescript?style=for-the-badge&label=TypeScript&color=black)                |
| Tailwind CSS     | ![Tailwind](https://img.shields.io/npm/v/tailwindcss?style=for-the-badge&label=TailwindCSS&color=black)                |
| Framer Motion    | ![Framer Motion](https://img.shields.io/npm/v/framer-motion?style=for-the-badge&label=Framer%20Motion&color=black)     |
| Google Gemini AI | ![Gemini](https://img.shields.io/npm/v/%40google%2Fgenerative-ai?style=for-the-badge&label=Google%20Gemini&color=blue) |
| ElevenLabs SDK   | ![ElevenLabs](https://img.shields.io/npm/v/%4011labs%2Freact?style=for-the-badge&label=ElevenLabs%20SDK&color=blue)    |

---

## 🌐 Live Demo

👉 [https://chatwise1.vercel.app/](https://chatwise1.vercel.app/)

---

## 🛠️ Getting Started

### 📦 Prerequisites

Make sure the following tools are installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)

---

### 📁 Clone the Repository

```bash
git clone https://github.com/abdifitahabdulkadir/chatwise.git

cd chatwise
```

---

### 🔐 Environment Setup

1. Create a `.env.local` file in the root directory.

2. Add the following credentials:

#### 🔑 Google OAuth (via [Google Console](https://console.cloud.google.com/apis))

```bash
AUTH_GOOGLE_ID="Your Google client ID"
AUTH_GOOGLE_SECRET="Your google Secret ID"
```

#### 🔑 GitHub OAuth (via [GitHub OAuth App](https://docs.github.com/en/apps/oauth-apps))

```bash
AUTH_GITHUB_ID="Your Github Client ID"
AUTH_GITUB_SECRET="Your Github Secret ID"
```

#### 🗃️ MongoDB Database (via [MongoDB](https://www.mongodb.com/))

```bash
DATABASE_URL="mongodb string url"
```

#### 🧠 Google Gemini AI (via [Gemini AI Studio](https://aistudio.google.com/apikey))

```bash
GEMINI_API_KEY="your-gemini-api-key"
```

#### 🎙️ ElevenLabs SDK (via [11Labs Docs](https://elevenlabs.io/docs/conversational-ai/libraries/react))

```bash
NEXT_PUBLIC_EVELNLABS_API_KEY="your-11labs-api-key"
```

#### ⚠️ NextAuth Host Issue Fix (Only in development)

if you get an error telling you have trust issue on your local machine -computer after you built the app locally then add local url to the .env.local file and you should good to go.

```bash
AUTH_TRUST_HOST='http://localhost:3000/'
```

3. Generate the Auth.js secret key:

```bash
npx auth secret
```

---

### 📦 Install Dependencies

```bash
npm install
```

---

### ▶️ Run the App

```bash
npm run dev
```

---

## 🙋‍♂️ FAQ

### ❓ Is this project open source?

✅ Yes! You’re welcome to contribute, fork, or learn it.

### ❓ Is the project complete?

🚧 Not yet! It’s still under active development. New features are coming soon.

### ❓ Can I use this project for commercial purposes?

❌ No, not entirely. You're welcome to learn from it or contribute, but credit to the author [@abdifitahabdulkadir](https://github.com/abdifitahabdulkadir) is required.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Finally, Feel free to ⭐️ the repository if you find it useful!.
