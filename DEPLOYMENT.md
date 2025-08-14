# 🚀 Deploy AI Chatbot to GitHub & Netlify

## Step 1: Push to GitHub

Run these commands in your terminal:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your code
git commit -m "AI Chatbot with Nhost authentication and real-time messaging"

# Add your GitHub repository
git remote add origin https://github.com/pranavkoushik/AI-Chatbot-with-Nhost.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy to Netlify

### Option A: Connect GitHub to Netlify (Recommended)

1. Go to [netlify.com](https://netlify.com)
2. Sign up/login
3. Click "New site from Git"
4. Choose GitHub and authorize Netlify
5. Select your repository: `pranavkoushik/AI-Chatbot-with-Nhost`
6. Configure build settings:
   - **Build command**: `node build-client.js`
   - **Publish directory**: `client/dist`
   - **Node version**: `20`

### Option B: Manual Deploy

1. Download the `client/dist` folder
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder

## Step 3: Add Environment Variables

In Netlify dashboard, go to Site settings → Environment variables and add:

```
VITE_NHOST_SUBDOMAIN=mtgxujfteudjuldxiehh
VITE_NHOST_REGION=us-east-1
VITE_NHOST_GRAPHQL_URL=https://mtgxujfteudjuldxiehh.nhost.run/v1/graphql
VITE_NHOST_GRAPHQL_WS_URL=wss://mtgxujfteudjuldxiehh.nhost.run/v1/graphql
```

## ✅ Your AI Chatbot Features

Once deployed, your application will have:

- **User Authentication** - Secure signup/login with Nhost
- **Real-time Chat** - Live messaging with GraphQL subscriptions
- **Chat Management** - Create, view, delete conversations
- **Responsive Design** - Works on all devices
- **Database Storage** - All data stored in Nhost
- **Production Ready** - Optimized 648KB build

## 🎯 Ready Files

- ✅ **netlify.toml** - Netlify configuration
- ✅ **client/dist/** - Built application
- ✅ **Environment setup** - All Nhost credentials configured
- ✅ **Database schema** - Tables and permissions ready

Your AI chatbot is ready for production deployment!