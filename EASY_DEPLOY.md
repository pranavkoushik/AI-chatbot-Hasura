# 🚀 EASIEST DEPLOYMENT GUIDE

## Option 1: Download & Upload (5 minutes)

### Step A: Download Your Code
1. In Replit, click the three dots (...) in the file explorer
2. Select "Download as zip"
3. Extract the zip file on your computer

### Step B: Upload to GitHub
1. Go to https://github.com/pranavkoushik/AI-Chatbot-with-Nhost
2. Click "uploading an existing file" or drag and drop all files
3. Add commit message: "AI Chatbot ready for deployment"
4. Click "Commit changes"

### Step C: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git" → GitHub
3. Select your repo: `pranavkoushik/AI-Chatbot-with-Nhost`
4. Build settings:
   - Build command: `node build-client.js`
   - Publish directory: `client/dist`

### Step D: Add Environment Variables
In Netlify Site Settings → Environment Variables, add:
```
VITE_NHOST_SUBDOMAIN=mtgxujfteudjuldxiehh
VITE_NHOST_REGION=us-east-1
VITE_NHOST_GRAPHQL_URL=https://mtgxujfteudjuldxiehh.nhost.run/v1/graphql
VITE_NHOST_GRAPHQL_WS_URL=wss://mtgxujfteudjuldxiehh.nhost.run/v1/graphql
```

## Option 2: Direct Netlify Deploy (2 minutes)

### Step A: Download Built App
- Download the `client/dist` folder from your file explorer

### Step B: Deploy
1. Go to [netlify.com](https://netlify.com)
2. Drag the `dist` folder to the deploy area
3. Add the environment variables from Step D above

## ✅ Your Live Features
- User authentication with signup/login
- Real-time chat with message history
- Responsive design for mobile and desktop
- Secure database storage with Nhost

Your AI chatbot will be live at a custom Netlify URL!