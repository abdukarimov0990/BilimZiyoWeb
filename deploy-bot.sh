#!/bin/bash
# BilimZiyo Telegram Bot - Server Deploy Script
# Usage: bash deploy-bot.sh

SERVER="root@89.126.220.107"
PASS='H9!5F%qqWg&Ou'
BOT_DIR="/root/bilimziyo-bot"

echo "=== BilimZiyo Bot Deploy ==="

# 1. SSH ga ulanib, Node.js, pm2 o'rnatish va bot papkasini yaratish
echo "[1/4] Serverda Node.js va pm2 o'rnatilmoqda..."
sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no "$SERVER" bash -s <<'REMOTE'
set -e

# Node.js o'rnatish (agar yo'q bo'lsa)
if ! command -v node &>/dev/null; then
  echo "Node.js o'rnatilmoqda..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

echo "Node.js versiya: $(node -v)"
echo "npm versiya: $(npm -v)"

# pm2 o'rnatish (agar yo'q bo'lsa)
if ! command -v pm2 &>/dev/null; then
  echo "pm2 o'rnatilmoqda..."
  npm install -g pm2
fi

# Bot papkasini yaratish
mkdir -p /root/bilimziyo-bot
echo "Server tayyor!"
REMOTE

echo "[2/4] Bot fayllari serverga ko'chirilmoqda..."
# 2. Bot fayllarini serverga ko'chirish
sshpass -p "$PASS" scp -o StrictHostKeyChecking=no \
  bot/index.js bot/bot.js bot/firebase.js bot/scheduler.js bot/sheets.js bot/users.json \
  "$SERVER:$BOT_DIR/"

echo "[3/4] package.json va .env yaratilmoqda..."
# 3. package.json va .env fayllarini serverda yaratish
sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no "$SERVER" bash -s <<'REMOTE'
set -e
cd /root/bilimziyo-bot

# package.json yaratish
cat > package.json <<'PKG'
{
  "name": "bilimziyo-bot",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "axios": "^1.13.2",
    "dotenv": "^17.2.3",
    "firebase-admin": "^13.7.0",
    "node-telegram-bot-api": "^0.66.0"
  }
}
PKG

# .env yaratish
cat > .env <<'ENV'
REACT_APP_GOOGLE_SHEET_ID=1y-SLaCkJUKYGWeF_Ic_nWjieK458qrhYWa8s83noWFI
REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
REACT_APP_GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"
REACT_APP_TELEGRAM_BOT_TOKEN=8389324958:AAGVcbeOYhf-Kd7HaVEua9kluz1N-wd_Wo4
REACT_APP_TELEGRAM_CHAT_ID=6276000412
FIREBASE_PROJECT_ID=bilimziyo-99112
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@bilimziyo-99112.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC848A6JwAMCH1H\nIc3eL6JBCfDMCMU8XB/XwrgRIuyU62Q128b0hmcMkMjpV99eEJRvazl4jI5CHM+T\niHSIhpx9qiD4tbpC0o3xQ+mTrUEuLw4jBpQN11m6HdiCoGVzUE0ZJtoGu6wMWZag\nSl4qcwSinWUSeuoRI51jZDwsDKkPx3Rvmxa+9EGVHyUqNIjY3BqSwFcLhk2R48pu\n+hQdtI2+7XShI+iRD93pY4dq4VnBtl26B/qPR+POvG6jD4N1AFWkwPbyYPPHclXr\ndwhKwmGoI02DTvqOCecc+z44RzbxIAg4xq/TIZ9n/PhLuf6c4cIf5CzOZ7bRXbJk\nVuN8iMflAgMBAAECggEAMYZJXTXihkUni6HqVyoIEaNoliZqiEPjOW/dUOjmPLln\nAdQI2w3uMNY5Ryz57LDOKlRjsh6wIddp+VWasD0TBMO5d1w2ZNTN0Ics08JmR5Sg\n0UAlS2e+J9UxcjZZwx03ybNtELzeBDLtEkPNYrXbbkN0P58ohavf1TJvsGD1ZqRC\nm+Aeh8p3wG9WP/iKBTHg2moySRWmfB9B/E8oZcoTETHvAspYRHNWSuKHhluePBX/\nkL74kqZHSFTTcwFsnudPAio+/b2lo8/QE3hYrEkAsnI6ZNnjHcBkV6rldcuG7n6t\n5WWFiY0lkfPzCCUe3r8CylWkOLn5QExGFLtr6LPA9QKBgQDjWf6qr84iH7jostLR\nRNYaXUJ3JAP+WanjcqYEyZPItrjOYZ3rDk7rowPwaw9wXCOgigiLyMYPq3ZNl1rL\ntkInCY7Acf1AmIDelDfPPFPeB02mGZI/wR5UfCUCm4LC6oFSN0/g9qlIpPYinCie\n9Tx0Sa9AFU9gOFB3wfSwGqbrbwKBgQDUsQkhSQO226k1m8RQrbmKkQMZ2ufoiv2q\nkGMRJaNIPRharCSGFn4Z07Pk4AoZjY6h2kduodCCJH52n/oma7cEaCKoFmR0PtkY\nD5+z/StSi8yRezlLzCrvOKIw0Mr/aldP0O8Ce7WZeb+XL3gAWftdSAJwwzF8uAwq\nZRlLBjtn6wKBgHB3gIenWG2BC9PxQmDLkK6SG+McKe2VJXmiqYYMwdK0sU9G8vvo\npBnlFnnEPGr06ZrtLbUYqQHvbCKOERhdHPR6wedpfEKMLpPs9n7J9SMMsdjNJY/s\nVLiugRB9JX6Oy1KEkjtTSgLpt+j/Hwkjf7h3Cv7Ei/OpaAUWKZlEVfZ5AoGBAIMS\nEmFLwJk4Zt9dfa6GUJf+411UlKOuu8IXtqVDf4st80s1WFC1ncJGv06lbjPvE13U\nyT55Q6hf2vs5fQueR6vUjL7vBbrJXDnCrxVZSBBXjJp+yIFYcYD4cqMImICsROAw\nDoqGOBQ7fgEqRJZa3VfP34kkEOQd+4lIwjyEu6k/AoGAUtKxSCOLB3DgAt72GvJO\nuo7QE09Y/iGClR4jj/R2VcrLaXgxRTB+59qdleMRu5lrSMtMZqzrvou9I6Y7mk9W\nQN8YhanqYFYGse+KQQa903AbRe7lUgDvtKvQ0wO8slKZNsCYvWO7DHeoNYGckQEF\no2sftgXqBeKPS9uVG5TrUc0=\n-----END PRIVATE KEY-----\n"
ENV

# npm install
echo "Dependencies o'rnatilmoqda..."
npm install

# pm2 bilan botni ishga tushirish
pm2 delete bilimziyo-bot 2>/dev/null || true
pm2 start index.js --name bilimziyo-bot
pm2 save
pm2 startup systemd -u root --hp /root 2>/dev/null || true

echo ""
echo "=== Bot muvaffaqiyatli ishga tushdi! ==="
pm2 status bilimziyo-bot
REMOTE

echo ""
echo "[4/4] Deploy tugadi!"
echo "Bot serverda pm2 orqali ishlamoqda."
echo "Loglarni ko'rish: sshpass -p '$PASS' ssh $SERVER 'pm2 logs bilimziyo-bot'"
