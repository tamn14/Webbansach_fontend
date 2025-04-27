import { useState } from "react";
import Footer from "./Layouts/Header-footer/Footer";
import Navbar from "./Layouts/Header-footer/Navbar";
import HomePages from "./Layouts/Homepage/homepage";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import About from "./Layouts/About/About";
import ChiTietSach from "./Layouts/Prouducts/ChiTietSanPham";
import DangKyNguoiDung from "./Layouts/Users/DangKyNguoiDung";
function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

  return (
    <BrowserRouter>
      <div>
        <Navbar setTuKhoaTimKiem={setTuKhoaTimKiem} />
        <Routes>
          <Route path="/" element={<HomePages tuKhoaTimKiem={tuKhoaTimKiem} />} />
          <Route path="/:maTheLoai" element={<HomePages tuKhoaTimKiem={tuKhoaTimKiem} />} />
          <Route path="/sach/:maSach" element={<ChiTietSach />} />
          <Route path="/about" element={<About />} />
          <Route path="/DangKyNguoiDung" element={<DangKyNguoiDung />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
