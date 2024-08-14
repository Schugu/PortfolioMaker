import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from "@/pages/Home/home.tsx";
import CreateProfile from "@/pages/CreateProfile/CreateProfile";

function App() {
  return (
    <BrowserRouter>
      <main className='flex flex-col min-h-screen'>
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
