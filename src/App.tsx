import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from "@/components/navbar/Navbar.tsx";
import Home from "@/pages/Home/home.tsx";

function App() {
  return (
    <BrowserRouter>
      <main className='flex flex-col min-h-screen bg-[var(--color-background-second)] text-[var(--color-text-first)]'>
        <Navbar />
        <section className='flex-grow'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
          </Routes>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
