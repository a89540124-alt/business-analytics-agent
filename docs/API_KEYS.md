# API Keys Setup Guide

## 🔑 OpenAI API Key

### کیسے حاصل کریں:
1. جائیں: https://platform.openai.com/api-keys
2. **"Create new secret key"** پر کلک کریں
3. Key کو کاپی کریں (صرف ایک بار نظر آئے گی)
4. محفوظ جگہ پر سیو کریں

### N8N میں استعمال کریں:
1. N8N Dashboard کھولیں
2. Workflow میں جائیں
3. "AI Analysis" node کھولیں
4. "OpenAI" credentials میں API key paste کریں
5. Test کریں

---

## 📧 SendGrid API Key

### کیسے حاصل کریں:
1. جائیں: https://sendgrid.com/
2. Sign up کریں (یا login کریں)
3. **"Settings"** → **"API Keys"** → **"Create API Key"**
4. **"Full Access"** منتخب کریں
5. Key کو کاپی کریں

### پہلے Sender Email Setup کریں:
1. "Settings" → "Sender Authentication"
2. Email verify کریں
3. وہی email N8N میں استعمال کریں

### N8N میں استعمال کریں:
1. "Send Email" node میں جائیں
2. "SendGrid" credentials شامل کریں
3. API Key paste کریں
4. Test کریں

---

## 💾 MongoDB Setup

### کیسے حاصل کریں:
1. جائیں: https://cloud.mongodb.com
2. **Free Account** بنائیں
3. **Create Cluster**
4. **Connect** پر کلک کریں
5. **Connection String** کاپی کریں

### Connection String کی شکل:
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### N8N میں استعمال کریں:
1. MongoDB node میں جائیں
2. "MongoDB" credentials شامل کریں
3. Connection string paste کریں
4. Database name enter کریں: `business_analytics`
5. Test کریں

---

## ✅ سب کچھ Test کریں

### Test کریں کہ سب کچھ کام کر رہا ہے:

```bash
# 1. OpenAI Test
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.openai.com/v1/models | head

# 2. SendGrid Test (Dashboard میں چیک کریں)

# 3. MongoDB Test
mongo "mongodb+srv://username:password@cluster.mongodb.net/test"
```

---

## 🔒 Security Tips

⚠️ **کبھی بھی API keys commit نہ کریں!**

### صحیح طریقہ:
1. `.env.local` فائل میں رکھیں
2. `.gitignore` میں `.env.local` شامل کریں
3. GitHub پر upload نہ کریں

### غلط طریقہ:
```javascript
// ❌ یہ نہ کریں!
const apiKey = "sk-1234567890abcdef";

// ✅ یہ کریں:
const apiKey = process.env.OPENAI_API_KEY;
```

---

## 🆘 مسائل حل کریں

### "Invalid API Key"
- API key صحیح ہے؟
- Key active ہے (disabled تو نہیں)؟
- Copy/paste میں کوئی space تو نہیں؟

### "Email not verified" (SendGrid)
- Sender email verify کیا ہے?
- Settings میں check کریں

### "MongoDB connection failed"
- Connection string صحیح ہے?
- IP whitelist میں اپنا address ڈالا ہے؟
- Username اور password صحیح ہیں?

---

## 💡 Best Practices

1. **Keys الگ رکھیں** - ہر environment کے لیے الگ
2. **Keys rotate کریں** - ہر ماہ keys تبدیل کریں
3. **Monitoring** - کون سے keys استعمال ہو رہے ہیں track کریں
4. **Backup** - محفوظ جگہ پر محفوظ رکھیں

---

**اب آپ کے پاس تمام API keys ہیں! 🎉**
