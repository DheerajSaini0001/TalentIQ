import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import CreateResume from './pages/CreateResume';
import EditResume from './pages/EditResume';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <div className='font-sans min-h-screen bg-slate-50 text-slate-900'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-resume" element={<CreateResume />} />
          <Route path="/resume/:id/edit" element={<EditResume />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
