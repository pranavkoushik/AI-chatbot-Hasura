# 🚀 Deploy Your AI Chatbot to Netlify

Your build is ready! Here are the steps to deploy to Netlify:

## Method 1: Drag & Drop Deploy (Fastest)

1. **Download the build folder:**
   - The `dist` folder contains your built application
   - Zip the `dist` folder or prepare to drag it

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up or log in
   - Drag and drop your `dist` folder to the deployment area
   - Your app will be deployed instantly!

## Method 2: Connect via Git (Recommended for updates)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "AI Chatbot ready for Netlify"
   git branch -M main
   git remote add origin https://github.com/yourusername/ai-chatbot.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect GitHub and select your repository
   - Build settings:
     - Build command: `node build-client.js`
     - Publish directory: `dist`
     - Node version: `20`

## Environment Variables (Required)

Add these in Netlify dashboard under Site settings → Environment variables:

```
VITE_NHOST_SUBDOMAIN=mtgxujfteudjuldxiehh
VITE_NHOST_REGION=us-east-1
VITE_NHOST_GRAPHQL_URL=https://mtgxujfteudjuldxiehh.nhost.run/v1/graphql
VITE_NHOST_GRAPHQL_WS_URL=wss://mtgxujfteudjuldxiehh.nhost.run/v1/graphql
```

## What's Included

✅ **Nhost Authentication** - Full signup/login system
✅ **Real-time Chat** - Live messaging with GraphQL subscriptions  
✅ **Responsive UI** - Works on desktop and mobile
✅ **Database Integration** - Chats and messages stored in Nhost
✅ **Production Optimized** - Minified and optimized build

## Your Live Application Features

Once deployed, users can:
- Sign up and create accounts
- Log in securely with email/password
- Create multiple chat conversations
- Send and receive messages in real-time
- Delete conversations
- Access from any device

**Ready to deploy!** Your `dist` folder is built and ready for Netlify.