import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from "@/components/navbar/Navbar.tsx";
import Home from "@/pages/Home/home.tsx";
import CreateProfile from "@/pages/CreateProfile.tsx";

function App() {
  return (
    <BrowserRouter>
      <main className='flex flex-col min-h-screen bg-gray-800 text-white'>
        <section className='flex-grow'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path='/createProfile' element={<CreateProfile />} />
          </Routes>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
