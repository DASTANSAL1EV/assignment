import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TaskDetailPage from './pages/TaskDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={2500} />
    </BrowserRouter>
  );
}