# Troubleshooting Guide

## 🔴 Common Problems & Solutions

---

## **Problem 1: npm not found**

### ❌ Error Message:
```
'npm' is not recognized as an internal or external command
```

### ✅ Solution:
1. Node.js install کریں: https://nodejs.org/
2. Latest LTS version download کریں
3. Install کریں (اگلے صفحوں پر "Next" دبائیں)
4. Computer restart کریں
5. Terminal/CMD restart کریں
6. دوبارہ `npm --version` test کریں

---

## **Problem 2: Port 3000 Already in Use**

### ❌ Error Message:
```
Error: listen EADDRINUSE: address already in use :::3000
```

### ✅ Solution:

**Option A: Different port استعمال کریں**
```bash
npm run dev -- -p 3001
```

**Option B: Existing process بند کریں**

Windows:
```bash
netstat -ano | findstr :3000
kill /PID [PID_NUMBER]
```

Mac/Linux:
```bash
lsof -i :3000
kill -9 [PID]
```

---

## **Problem 3: Dependencies Install نہیں ہو رہی**

### ❌ Error Messages:
```
npm ERR! 404 Not Found
npm ERR! ERESOLVE unable to resolve dependency
```

### ✅ Solution:

```bash
# Cache صاف کریں
npm cache clean --force

# node_modules delete کریں
rm -rf node_modules
rm package-lock.json

# دوبارہ install کریں
npm install
```

---

## **Problem 4: N8N نہیں شروع ہو رہی**

### ❌ Error Message:
```
Cannot find module 'n8n'
Port 5678 already in use
```

### ✅ Solution:

**Global install check کریں:**
```bash
npm install -g n8n
```

**Different port استعمال کریں:**
```bash
N8N_PORT=5679 n8n start
```

---

## **Problem 5: Dashboard نہیں لوڈ ہو رہی**

### ❌ Error:
```
Cannot GET /
White screen
Syntax error
```

### ✅ Solution:

1. **Browser cache صاف کریں:**
   - Ctrl + Shift + Delete
   - "Cached images and files" delete کریں
   - Page refresh کریں

2. **Dev server چیک کریں:**
   ```bash
   npm run dev
   ```
   Errors دیکھیں terminal میں

3. **Correct URL check کریں:**
   ```
   http://localhost:3000  (صحیح)
   http://127.0.0.1:3000  (صحیح)
   http://0.0.0.0:3000    (غلط)
   ```

---

## **Problem 6: API Keys نہیں کام کر رہی**

### ❌ Error:
```
Invalid API Key
Unauthorized
401 Authentication Failed
```

### ✅ Solution:

1. **API key verify کریں:**
   - OpenAI: https://platform.openai.com/api-keys
   - SendGrid: https://app.sendgrid.com/settings/api_keys
   - MongoDB: https://cloud.mongodb.com/

2. **Key صحیح ہے؟**
   - Copy/paste check کریں
   - Extra spaces تو نہیں?
   - Quotes میں تو ہے?

3. **Environment variable check کریں:**
   ```bash
   # .env.local file موجود ہے?
   ls -la | grep env
   
   # Content check کریں
   cat .env.local
   ```

---

## **Problem 7: N8N Webhook کام نہیں کر رہی**

### ❌ Error:
```
404 Not Found
Webhook URL not responding
```

### ✅ Solution:

1. **N8N running ہے؟**
   ```bash
   http://localhost:5678
   ```
   Browser میں open کریں

2. **Workflow active ہے?**
   - Workflow میں جائیں
   - Top-right میں "Active" toggle check کریں
   - ON ہونی چاہیے

3. **Webhook URL صحیح ہے?**
   ```
   http://localhost:5678/webhook/business-analytics
   ```
   یہ copy کریں N8N node سے

4. **Test کریں curl سے:**
   ```bash
   curl -X POST http://localhost:5678/webhook/business-analytics \
     -H "Content-Type: application/json" \
     -d '{"revenue": "1000000"}'
   ```

---

## **Problem 8: MongoDB Connection Failed**

### ❌ Error:
```
MongooseServerSelectionError
Connection refused
ERR_CONNECT_ECONNREFUSED
```

### ✅ Solution:

1. **MongoDB Atlas وقت دیں:**
   - Free cluster شروع ہونے میں کچھ منٹ لگتے ہیں
   - 5 منٹ بعد try کریں

2. **IP Whitelist check کریں:**
   - MongoDB Atlas dashboard
   - "Network Access" → "IP Whitelist"
   - اپنا IP add کریں (یا 0.0.0.0 سب کے لیے)

3. **Connection String check کریں:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true
   ```
   - Username صحیح?
   - Password صحیح? (special characters escaped?)
   - Cluster name صحیح?

4. **Password reset کریں:**
   - MongoDB Atlas میں
   - "Database Access" → "Edit" → "Edit Password"
   - نیا password set کریں
   - Connection string میں update کریں

---

## **Problem 9: Email نہیں بھیجی جا رہی**

### ❌ Error:
```
Email failed
403 Forbidden
Sender not verified
```

### ✅ Solution:

1. **Sender Email verify کریں:**
   - SendGrid dashboard → "Settings" → "Sender Authentication"
   - Email verify کریں (link click کریں)
   - N8N میں same email استعمال کریں

2. **Recipient valid ہے?**
   - Email address صحیح spelling میں ہے?
   - Example: `admin@business.com`

3. **SendGrid API key check کریں:**
   - Full Access permission ہے?
   - Key active ہے?

4. **Test کریں SendGrid سے:**
   - https://app.sendgrid.com/email_status
   - Sent emails check کریں

---

## **Problem 10: Git Clone نہیں ہو رہی**

### ❌ Error:
```
git: command not found
Fatal: repository not found
```

### ✅ Solution:

1. **Git install کریں:**
   - https://git-scm.com/download
   - Install کریں
   - Restart terminal

2. **HTTP instead of SSH:**
   ```bash
   # غلط
   git clone git@github.com:username/repo.git
   
   # صحیح
   git clone https://github.com/username/repo.git
   ```

---

## **Problem 11: TypeScript Errors**

### ❌ Error:
```
Type 'undefined' is not assignable to type
Property '...' does not exist
```

### ✅ Solution:

```bash
# TypeScript compile کریں
npx tsc --noEmit

# Errors fix کریں
npm run build
```

---

## **Problem 12: Out of Memory**

### ❌ Error:
```
FATAL ERROR: Reached heap limit
JavaScript heap out of memory
```

### ✅ Solution:

```bash
# Memory increase کریں
node --max-old-space-size=4096 node_modules/.bin/next dev

# یا
NODE_OPTIONS="--max-old-space-size=4096" npm run dev
```

---

## 🆘 **اب بھی مسئلہ ہے؟**

### Step-by-step Debugging:

1. **Logs دیکھیں:**
   ```bash
   npm run dev 2>&1 | tee debug.log
   ```

2. **Console errors check کریں:**
   - Browser → F12 → Console tab
   - Red errors دیکھیں
   - Copy کریں

3. **پوری message save کریں:**
   - Terminal output
   - Browser error
   - N8N logs

4. **GitHub issue بنائیں:**
   - Logs attach کریں
   - کیا کر رہے تھے؟
   - Expected vs actual

---

## 💡 **Prevention Tips**

1. ✅ **Official docs پڑھیں**
2. ✅ **Step by step follow کریں**
3. ✅ **Frequently save کریں**
4. ✅ **Backup رکھیں** (.json files)
5. ✅ **Updates لگائیں** (npm update)

---

**اب آپ کسی بھی مسئلے کو حل کر سکتے ہو!** 🎉
