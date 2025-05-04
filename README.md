# Chatwise

<img src="https://github.com/abdifitahabdulkadir/chatwise/blob/main/chatwise.png" alt="easymart image" style="width: 100%; height: 500px; margin: 20px auto; display: block;" />

## 📝 Description

ChatWise is an intelligent AI-powered platform for seamless conversations, brainstorming, and problem-solving. Explore ideas, ask questions, and get insights instantly.
[](https://ibb.co/xgMzfx1)

## 🚀 Technogies

Here are Technogies used for building this project.

![NPM Version](https://img.shields.io/npm/v/next?style=for-the-badge&logoColor=blue&logoSize=100&label=Nextjs&labelColor=%22%234A4947%22&color=black)

![NPM Version](https://img.shields.io/npm/v/react?style=for-the-badge&logoColor=blue&logoSize=100&label=Reactjs&labelColor=227B94&color=black)

![NPM Version](https://img.shields.io/npm/v/typescript?style=for-the-badge&logoColor=blue&logoSize=100&label=Typescript&labelColor=08C2FF&color=black)

![NPM Version](https://img.shields.io/npm/v/tailwindcss?style=for-the-badge&logoColor=blue&logoSize=100&label=Tailwing.css&labelColor=0a83c9&color=black)

![NPM Version](https://img.shields.io/npm/v/framer-motion?style=for-the-badge&logoColor=blue&logoSize=100&label=Frame%20motion&labelColor=0a83c9&color=black)

![NPM Version](https://img.shields.io/npm/v/%40google%2Fgenerative-ai?style=for-the-badge&logoColor=blue&logoSize=100&label=Google%20Gemmini%20Ai&color=blue)

![NPM Version](https://img.shields.io/npm/v/%4011labs%2Freact?style=for-the-badge&logoColor=blue&logoSize=100&label=ElevenLabs%20React%20SDK&color=blue)

## 🌐 Demo

Here is a working live demo: https://chatwise1.vercel.app/

## 🛠️ Setup Project

### 🍴 Prerequisites

You need to install or make sure that these tools are pre-installed on your machine:

- [NodeJS](https://nodejs.org/en/download/): It is a JavaScript runtime build.
- [Git](https://git-scm.com/downloads): It is an open source version control system.

Clone the project

```bash
  https://github.com/abdifitahabdulkadir/chatwise.git
```

Go to the project directory

```bash
  cd chatwise
```

#### Make sure you get all the fallowing API keys In your Env files

1. At root of your application, create .env.local file.

2. This project is using Next-auth (Auth.js) so kindly read thier docs if you have been slepy for a while.
   thier offical webiste <br> 👉 **[Offical Link of Auth.js]([https://authjs.dev/getting-started/installation?framework=Next.js])**

3. Get Google API key for authentication Google OAuth
   form this link <br> 👉
   **[Google API Link]([https://console.cloud.google.com/apis/dashboard?pli=1&project=coffee-app-412811])**

```bash
AUTH_GOOGLE_ID="Google Client ID"
AUTH_GOOGLE_SECRET="Google  Secret ID"
```

4. Also get API keys from github using this link <br>
   👉 **[Github API Link]([https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/installing-an-oauth-app-in-your-personal-account])**

```bash
AUTH_GITHUB_ID="Github client ID"
AUTH_GITUB_SECRET="Github  Secret ID"
```

5. Create Database in mongodbDB and get Database Url <br> 👉 **[Official Account of MongoDB]([https://www.mongodb.com/])**

```bash
DATABASE_URL ='your database url'
```

6. This proect also is using 11Labs's React SDK for voice to voice chat, and you can get it <br> 👉 **[Offical React SDK Docs For 11labs]([https://elevenlabs.io/docs/conversational-ai/libraries/react])**

```bash
NEXT_PUBLIC_EVELNLABS_API_KEY="Your 11lbas API Key"
```

7. This proect is using Google's Gemmini API key for AI integration so grap the free API key from this link
   <br> 👉 **[Offical Google Studio AI]([https://aistudio.google.com/apikey])**

8. Finally, If you get trush issue from next-auth while running your next appliaciton locally then add
   the falflowng env variable to the .env.local

```bash
AUTH_TRUST_HOST='http://localhost:3000/'
```

9. finally the fallowing command to generate Secret key that next-auth (auth.js) will use it to hash your data.

```bash
npx auth secret
```

### Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## 🤔 FAQ

### Is this proejct open source?

Yes, It is open source project , feel free to contribute, clone and even learn by your own self.

### Is this project finished or still in process?

It is still in development, lacking a lot of features which will be soon in coming weeks and months.

### Can I use this project for my own?

No, you cannot use this project entirely for your own purposes. However, feel free to contribute, and if you use it, please provide proper credit and respect to the creater (@abdifitahabdulkadir).

## 📋 License

This is project is under MIT License.
