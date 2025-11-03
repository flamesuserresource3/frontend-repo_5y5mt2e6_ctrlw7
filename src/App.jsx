import React from 'react';
import Navbar from './components/Navbar';
import PageRouter from './components/PageRouter';
import FloatingAddButton from './components/FloatingAddButton';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-slate-800">
      <Navbar />
      <PageRouter />
      <FloatingAddButton />
      <Footer />
    </div>
  );
}

export default App;
