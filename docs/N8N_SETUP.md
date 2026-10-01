# N8N Workflow Setup Guide

## 🚀 Installation

### Step 1: N8N Install کریں

```bash
# Global install
npm install -g n8n

# یا Local install
cd business-analytics-agent
npm install n8n
```

### Step 2: N8N شروع کریں

```bash
n8n start
```

آپ کو یہ message نظر آئے گا:
```
⚡ N8N is ready!
Editor: http://localhost:5678
```

### Step 3: Browser میں کھولیں

```
http://localhost:5678
```

---

## 📥 Workflow Import کریں

### Basic Workflow (سب کے لیے)

1. N8N Dashboard میں جائیں
2. **"Workflows"** (بائیں طرف menu)
3. **"Import from file"** پر کلک کریں
4. یہ فائل منتخب کریں:
   ```
   n8n-workflow/business-analytics-workflow.json
   ```
5. **"Import"** پر کلک کریں

### Advanced Workflow (PDF + Email کے ساتھ)

1. پھر سے **"Import from file"**
2. یہ فائل منتخب کریں:
   ```
   n8n-workflow/advanced-analytics-workflow.json
   ```
3. **"Import"** پر کلک کریں

---

## 🔧 Credentials Setup

### OpenAI Credentials

1. Workflow کھولیں
2. **"AI Analysis"** node پر double-click کریں
3. **"Credentials"** dropdown میں جائیں
4. **"Create New"** پر کلک کریں
5. یہ fill کریں:
   - **Name:** OpenAI API
   - **API Key:** (اپنی OpenAI API key)
6. **"Save"** پر کلک کریں

### SendGrid Credentials

1. **"Send Email"** node پر double-click کریں
2. **"Credentials"** dropdown میں جائیں
3. **"Create New"** پر کلک کریں
4. یہ fill کریں:
   - **Name:** SendGrid API
   - **API Key:** (اپنی SendGrid API key)
5. **"Save"** پر کلک کریں

### MongoDB Credentials

1. **"Save to Database"** node پر double-click کریں
2. **"Credentials"** dropdown میں جائیں
3. **"Create New"** پر کلک کریں
4. یہ fill کریں:
   - **Name:** MongoDB Connection
   - **Connection String:** `mongodb+srv://user:pass@cluster.mongodb.net/database`
5. **"Save"** پر کلک کریں

---

## ✅ Workflow Test کریں

### Test Data بھیجیں

1. Workflow میں **"Execute Workflow"** پر کلک کریں
2. یہ JSON data input کریں:
   ```json
   {
     "revenue": "$1,240,000",
     "orders": 12800,
     "region": "North America",
     "email": "your-email@example.com"
   }
   ```
3. **"Run"** پر کلک کریں
4. Execution logs دیکھیں

### Expected Output

✅ تمام nodes green ہونے چاہیں  
✅ Database میں data save ہونی چاہی  
✅ AI analysis generate ہونی چاہی  
✅ Email بھیجی جانی چاہی  

---

## 🔌 Webhook Setup (Automatic Trigger)

### Webhook URL تلاش کریں

1. Workflow میں **"Webhook"** node پر double-click کریں
2. **"Copy Webhook URL"** پر کلک کریں
3. یہ URL محفوظ کریں:
   ```
   http://localhost:5678/webhook/business-analytics
   ```

### Webhook سے Workflow Trigger کریں

```bash
curl -X POST http://localhost:5678/webhook/business-analytics \
  -H "Content-Type: application/json" \
  -d '{
    "revenue": "$1,240,000",
    "orders": 12800,
    "region": "North America",
    "email": "admin@business.com"
  }'
```

---

## 📊 Workflow کیا کرتا ہے؟

### Basic Workflow Flow:

```
1. Webhook Trigger
   ↓
2. Save Business Data (MongoDB)
   ↓
3. AI Analysis (OpenAI)
   ↓
4. Save AI Insights (MongoDB)
   ↓
5. Send Email Report (SendGrid)
   ↓
6. Update Dashboard (HTTP Request)
```

### Advanced Workflow Flow:

```
1. Webhook Trigger
   ↓
2. Store Raw Data
   ↓
3. Generate Executive Summary (AI)
   ↓
4. Generate Detailed Recommendations (AI)
   ↓
5. Save Full Report
   ↓
6. Generate PDF Report
   ↓
7. Send Email with PDF
   ↓
8. Push to Dashboard
```

---

## 🐛 Troubleshooting

### "Credentials Error"
- API key صحیح ہے؟
- Credentials properly configured ہیں؟
- Test کریں: **"Test Credentials"** button

### "MongoDB Connection Failed"
- Connection string صحیح ہے؟
- Database whitelist میں IP ہے؟
- MongoDB service چل رہی ہے؟

### "Email Not Sent"
- SendGrid sender email verified ہے؟
- Recipient email صحیح ہے؟
- API rate limit تو نہیں ہے?

### "Webhook Not Triggered"
- N8N running ہے؟
- Workflow active ہے؟
- URL صحیح ہے?

---

## 📱 Dashboard سے Integration

### Dashboard میں Workflow Test کریں

1. `http://localhost:3000` کھولیں
2. **"Integration"** tab پر جائیں
3. JSON data modify کریں
4. **"Send to N8N Workflow"** بٹن پر کلک کریں
5. Status message دیکھیں

---

## 💡 Advanced Features

### Custom Conditions شامل کریں

Workflow میں **IF/ELSE** node لگائیں:
- اگر revenue > $1M تو special email بھیجیں
- اگر orders < 5000 تو alert بھیجیں

### Multiple Regions Handle کریں

Loop node شامل کریں جو:
- ہر region کے لیے الگ analysis دے
- ہر region کو الگ email بھیجے

### Schedule Workflow

**Cron** node شامل کریں:
- ہر صبح 8 AM پر report بھیجے
- ہفتہ وار summary بھیجے

---

## 🎯 Best Practices

1. **Save Frequently** - ہر change کے بعد workflow save کریں
2. **Test Before Deploy** - Production میں جانے سے پہلے test کریں
3. **Monitor Execution** - Execution logs check کریں
4. **Document Changes** - کیا تبدیل کیا note کریں
5. **Backup Workflows** - JSON export کر کے backup رکھیں

---

## 🚀 اب تیار ہیں!

آپ کا workflow:
- ✅ Automatically data process کرتا ہے
- ✅ AI analysis generate کرتا ہے
- ✅ Emails بھیجتا ہے
- ✅ Dashboard update کرتا ہے

**شروع کریں اور automation کا فائدہ لیں!** 🎉
