// frontend/src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Sections/Navbar';
import { DashboardPage } from './pages/DashboardPage';
import { StockDetailPage } from './pages/StockDetailPage';
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { LearningPathPage } from './pages/LearningPathPage'; 
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';



function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/learn" element={<LearningPathPage />} /> 
        <Route path="/stock/:symbol" element={<StockDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;