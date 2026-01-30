import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Demo from './pages/Demo';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPage from './pages/PrivacyPage';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';

import CreateResume from './pages/CreateResume';
import ResumePreview from './pages/ResumePreview';
import EditResume from './pages/EditResume';
import ProtectedRoute from './components/auth/ProtectedRoute';

import ScrollToTop from './components/layout/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-center" />
      <div className='font-sans min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 flex flex-col transition-colors duration-300'>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsOfService />} />
            </>

            {/* Public Resume Routes */}
            <Route path="/create-resume" element={<CreateResume />} />
            <Route path="/resume/preview" element={<ResumePreview />} />
            <Route path="/resume/:id/preview" element={<ResumePreview />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resume/:id/edit" element={<EditResume />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
