# TalentIQ

TalentIQ is an advanced, AI-powered Resume Builder application designed to help users create professional, ATS-friendly resumes in minutes. By leveraging AI (OpenAI), it assists users in generating compelling professional summaries and optimizing their content for better job match rates.

## 🚀 Features

- **User Authentication:** Secure email/password login and Google OAuth integration using Passport.js.
- **Dynamic Resume Sections:** Easily add, edit, and manage comprehensive resume sections including Personal Info, Experience, Education, Skills, Projects, and more.
- **AI-Powered Assistance:** Generate customized professional summaries based on your experience, industry, and goals using OpenAI.
- **Real-Time Preview & Customization:** Choose from various design styles (Minimal, Modern, Creative), colors, and fonts with real-time updates.
- **PDF Export:** Download your personalized resume directly as a high-quality PDF.
- **Cloud Storage:** Integrated with Cloudinary for seamless profile photo and asset uploads.

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** React 19 (via Vite)
- **Routing:** React Router v7
- **State Management:** Zustand
- **Styling:** Tailwind CSS v4, clsx, tailwind-merge
- **PDF Generation:** html2pdf.js, jspdf, react-to-print, html2canvas
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Authentication:** JWT, Passport.js (Google OAuth2.0), bcryptjs
- **File Uploads:** Multer, Cloudinary
- **AI Integration:** OpenAI API
- **Email Services:** Nodemailer (See `GMAIL_SETUP_GUIDE.md` for details)

## 📂 Project Structure

```text
TalentIQ/
├── client/           # React Frontend App
│   ├── src/          # Components, Pages, Stores, Services
│   └── package.json
├── server/           # Node.js/Express Backend App
│   ├── src/          # Controllers, Models, Routes, Services
│   └── package.json
├── shared/           # Shared types/utilities
├── .env              # Environment Variables
├── GMAIL_SETUP_GUIDE.md
└── README.md
```

## ⚙️ Prerequisites

- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local instance or MongoDB Atlas)
- **Cloudinary Account** (for image uploads)
- **OpenAI API Key** (for AI generation features)
- **Google Cloud Console Account** (for OAuth Client ID & Secret)

## 💻 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd TalentIQ
   ```

2. **Configure Environment Variables:**
   Update the existing `.env` file in the root directory (or create it if missing) with your credentials:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

3. **Install Dependencies:**
   Install both server and client dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

## 🏃‍♂️ Running the Application

To run the application locally, you need to start both the backend server and the frontend client.

**1. Start the Server:**
Open a new terminal window or tab:
```bash
cd server
npm run dev
```

**2. Start the Client:**
Open another terminal window or tab:
```bash
cd client
npm run dev
```

The frontend will be accessible at `http://localhost:5173` and the backend will run on your configured PORT (default: `http://localhost:5000`).

## 📄 License

This project is licensed under the ISC License.