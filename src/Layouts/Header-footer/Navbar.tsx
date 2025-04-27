import React, { useState } from "react";
import { Link, Links } from "react-router-dom";

interface props {

  setTuKhoaTimKiem: (value: string) => void;
}
const Navbar = ({ setTuKhoaTimKiem }: props) => {
  const [inputText, setInputText] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTuKhoaTimKiem(inputText);
  }
  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand fw-bold text-primary" href="#">
            Book<span className="text-dark">Store</span>
          </a>

          {/* Toggle button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar items */}
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Thể loại sách
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><Link className="dropdown-item" to="/1">Thể loại 1</Link></li>
                <li><Link className="dropdown-item" to="/2">Thể loại 2</Link></li>
                <li><Link className="dropdown-item" to="/3">Thể loại 3</Link></li>
              </ul>
            </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Quy định bán hàng
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Quy định 1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Quy định 2
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Quy định 3
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Liên hệ
                </a>
              </li>
            </ul>
            {/* Right side: search + cart + login */}
            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
              {/* Cart */}
              <a
                href="#"
                className="text-decoration-none position-relative"
              >
                <i className="fa fa-shopping-cart fs-5 text-dark"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
                </span>
              </a>
              {/* Auth */}
              <Link to="/DangKyNguoiDung" className="btn btn-outline-primary btn-sm">
                Login
              </Link>
              <Link to="/DangKyNguoiDung" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header with search */}
      <header className="py-4 bg-white border-bottom shadow-sm">
        <div className="container d-flex flex-wrap align-items-center justify-content-between">
          <form
            className="d-flex align-items-center ms-auto"
            role="search"
            onSubmit={handleSubmit}
          >
            <input
              type="search"
              className="form-control form-control-sm me-2"
              placeholder="Search books..."
              aria-label="Search"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary btn-sm"
              type="submit"
            >
              <i className="fa fa-search"></i>
            </button>
          </form>


        </div>
      </header>
    </div>
  );
};

export default Navbar;
