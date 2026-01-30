# Gmail OTP Email Setup Guide

## 📧 How to Configure Gmail for Sending OTP Emails

### Step 1: Enable 2-Step Verification on Your Gmail Account

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", click on **2-Step Verification**
4. Follow the prompts to enable 2-Step Verification

### Step 2: Generate an App Password

1. After enabling 2-Step Verification, go back to **Security**
2. Under "Signing in to Google", click on **App passwords**
   - If you don't see this option, make sure 2-Step Verification is enabled
3. Click on **Select app** dropdown and choose **Mail**
4. Click on **Select device** dropdown and choose **Other (Custom name)**
5. Enter a name like "TalentIQ OTP Service"
6. Click **Generate**
7. Google will display a 16-character password - **COPY THIS PASSWORD**

### Step 3: Update Your .env File

Add these variables to your `.env` file in the project root:

```env
# Email Configuration (Gmail)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
```

**Example:**
```env
EMAIL_USER=talentiq.service@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

⚠️ **Important Notes:**
- Use the **App Password** (16 characters), NOT your regular Gmail password
- The app password may have spaces - you can include them or remove them
- Keep this password secure and never commit it to version control

### Step 4: Restart Your Server

After updating the `.env` file, restart your Node.js server:

```bash
npm start
# or
npm run dev
```

### Step 5: Test the OTP Email

1. Go to `http://localhost:5173/login-otp`
2. Enter an email address
3. Click "Continue with OTP"
4. Check the email inbox for the OTP

## 🔍 Troubleshooting

### "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solution:** Make sure you're using an **App Password**, not your regular Gmail password.

### "Less secure app access"

**Solution:** Google has deprecated "Less secure app access". You MUST use App Passwords with 2-Step Verification enabled.

### Email not received

1. **Check spam folder** - First-time emails might go to spam
2. **Verify EMAIL_USER and EMAIL_PASS** in `.env` file
3. **Check server console** - If email fails, OTP will be logged to console as fallback
4. **Gmail sending limits** - Free Gmail accounts have daily sending limits (~500 emails/day)

### Console Fallback Mode

If email credentials are not configured or fail, the system will automatically fall back to logging OTPs in the server console:

```
========== OTP EMAIL (Console Fallback) ==========
To: user@example.com
OTP: 123456
This OTP will expire in 10 minutes.
==================================================
```

## 🎨 Email Template Features

The OTP email includes:
- ✨ Professional HTML design with TalentIQ branding
- 🎯 Large, easy-to-read OTP code
- ⏰ Expiry time notification
- ⚠️ Security warnings
- 📱 Mobile-responsive design
- 🌙 Plain text fallback for email clients that don't support HTML

## 🔒 Security Best Practices

1. **Never share your App Password** - Treat it like a regular password
2. **Use environment variables** - Never hardcode credentials in your code
3. **Rotate passwords regularly** - Generate new App Passwords periodically
4. **Monitor usage** - Check your Gmail account for suspicious activity
5. **Use a dedicated email** - Consider using a separate Gmail account for sending automated emails

## 📊 Gmail Sending Limits

- **Free Gmail Account:** ~500 emails per day
- **Google Workspace:** Up to 2,000 emails per day
- **Rate limiting:** ~100 emails per hour recommended

For production with high volume, consider:
- **SendGrid** (12,000 free emails/month)
- **AWS SES** (62,000 free emails/month)
- **Mailgun** (5,000 free emails/month)

## 🚀 Alternative Email Services

If you want to use a different email service, update `src/services/email.service.js`:

### SendGrid Example:
```javascript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
```

### AWS SES Example:
```javascript
import AWS from 'aws-sdk';
const ses = new AWS.SES({ region: 'us-east-1' });
```

## ✅ Verification Checklist

- [ ] 2-Step Verification enabled on Gmail
- [ ] App Password generated
- [ ] EMAIL_USER added to .env
- [ ] EMAIL_PASS added to .env
- [ ] Server restarted
- [ ] Test email sent successfully
- [ ] OTP received in inbox

## 📞 Support

If you continue to have issues:
1. Check the server console for detailed error messages
2. Verify your Gmail account settings
3. Try generating a new App Password
4. Test with a different email address

---

**Last Updated:** January 2026
**TalentIQ Email Service v1.0**
