import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS } from '../config/env.js';

// Create transporter for Gmail
const createTransporter = () => {
    if (!EMAIL_USER || !EMAIL_PASS) {
        console.warn('⚠️  Email credentials not configured. OTPs will be logged to console only.');
        return null;
    }

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS, // Use App Password, not regular Gmail password
        },
    });
};

// Send OTP email
export const sendOTPEmail = async (email, otp, userName = '') => {
    const transporter = createTransporter();

    // Fallback to console if email not configured
    if (!transporter) {
        console.log(`\n========== OTP EMAIL (Console Fallback) ==========`);
        console.log(`To: ${email}`);
        console.log(`OTP: ${otp}`);
        console.log(`This OTP will expire in 10 minutes.`);
        console.log(`==================================================\n`);
        return { success: true, fallback: true };
    }

    const mailOptions = {
        from: {
            name: 'TalentIQ',
            address: EMAIL_USER,
        },
        to: email,
        subject: 'Your TalentIQ Login OTP',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 40px auto;
                        background: white;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
                        padding: 40px 20px;
                        text-align: center;
                        color: white;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 28px;
                        font-weight: 700;
                    }
                    .content {
                        padding: 40px 30px;
                    }
                    .greeting {
                        font-size: 18px;
                        color: #1f2937;
                        margin-bottom: 20px;
                    }
                    .message {
                        color: #4b5563;
                        margin-bottom: 30px;
                        font-size: 16px;
                    }
                    .otp-container {
                        background: #f9fafb;
                        border: 2px dashed #e5e7eb;
                        border-radius: 8px;
                        padding: 30px;
                        text-align: center;
                        margin: 30px 0;
                    }
                    .otp-label {
                        font-size: 14px;
                        color: #6b7280;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    .otp-code {
                        font-size: 36px;
                        font-weight: 700;
                        color: #2563eb;
                        letter-spacing: 8px;
                        font-family: 'Courier New', monospace;
                    }
                    .expiry {
                        color: #ef4444;
                        font-size: 14px;
                        margin-top: 15px;
                    }
                    .warning {
                        background: #fef3c7;
                        border-left: 4px solid #f59e0b;
                        padding: 15px;
                        margin: 20px 0;
                        border-radius: 4px;
                    }
                    .warning p {
                        margin: 0;
                        color: #92400e;
                        font-size: 14px;
                    }
                    .footer {
                        background: #f9fafb;
                        padding: 20px 30px;
                        text-align: center;
                        color: #6b7280;
                        font-size: 14px;
                        border-top: 1px solid #e5e7eb;
                    }
                    .footer a {
                        color: #2563eb;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎯 TalentIQ</h1>
                    </div>
                    
                    <div class="content">
                        <div class="greeting">
                            Hello${userName ? ` ${userName}` : ''},
                        </div>
                        
                        <div class="message">
                            You requested to log in to your TalentIQ account. Use the OTP below to complete your login:
                        </div>
                        
                        <div class="otp-container">
                            <div class="otp-label">Your One-Time Password</div>
                            <div class="otp-code">${otp}</div>
                            <div class="expiry">⏰ Expires in 10 minutes</div>
                        </div>
                        
                        <div class="warning">
                            <p><strong>⚠️ Security Notice:</strong> Never share this OTP with anyone. TalentIQ will never ask for your OTP via phone or email.</p>
                        </div>
                        
                        <div class="message">
                            If you didn't request this OTP, please ignore this email or contact our support team.
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p>© ${new Date().getFullYear()} TalentIQ. All rights reserved.</p>
                        <p>Need help? <a href="mailto:support@talentiq.com">Contact Support</a></p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `
Hello${userName ? ` ${userName}` : ''},

You requested to log in to your TalentIQ account.

Your One-Time Password (OTP): ${otp}

This OTP will expire in 10 minutes.

⚠️ Security Notice: Never share this OTP with anyone. TalentIQ will never ask for your OTP via phone or email.

If you didn't request this OTP, please ignore this email.

© ${new Date().getFullYear()} TalentIQ. All rights reserved.
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ OTP email sent successfully to ${email}`);
        console.log(`Message ID: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending OTP email:', error);

        // Fallback to console logging
        console.log(`\n========== OTP EMAIL (Error Fallback) ==========`);
        console.log(`To: ${email}`);
        console.log(`OTP: ${otp}`);
        console.log(`Error: ${error.message}`);
        console.log(`===============================================\n`);

        return { success: false, error: error.message, fallback: true };
    }
};

// Send welcome email (optional)
export const sendWelcomeEmail = async (email, userName) => {
    const transporter = createTransporter();

    if (!transporter) {
        console.log(`Welcome email would be sent to ${userName} (${email})`);
        return { success: true, fallback: true };
    }

    const mailOptions = {
        from: {
            name: 'TalentIQ',
            address: EMAIL_USER,
        },
        to: email,
        subject: 'Welcome to TalentIQ! 🎉',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
                    .button { display: inline-block; background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Welcome to TalentIQ! 🎉</h1>
                    </div>
                    <div class="content">
                        <h2>Hi ${userName},</h2>
                        <p>Thank you for joining TalentIQ! We're excited to help you create professional, ATS-friendly resumes.</p>
                        <p>Here's what you can do:</p>
                        <ul>
                            <li>✨ Create beautiful resumes with AI assistance</li>
                            <li>📝 Choose from 7+ professional templates</li>
                            <li>🎯 Get ATS-optimized content suggestions</li>
                            <li>💾 Save and manage multiple resumes</li>
                        </ul>
                        <a href="http://localhost:5173/create-resume" class="button">Create Your First Resume</a>
                        <p>If you have any questions, feel free to reach out to our support team.</p>
                        <p>Best regards,<br>The TalentIQ Team</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Welcome email sent to ${email}`);
        return { success: true };
    } catch (error) {
        console.error('❌ Error sending welcome email:', error);
        return { success: false, error: error.message };
    }
};

export default {
    sendOTPEmail,
    sendWelcomeEmail,
};
