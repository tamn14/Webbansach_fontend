import React from "react";
// import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <div className="bg-light border-top mt-5 pt-5">
      <div className="container">
        <div className="row">
          {/* Giới thiệu */}
          <div className="col-md-4 mb-4">
            <h5 className="text-primary fw-bold">BookStore</h5>
            <p className="text-muted">
              BookStore là nơi bạn có thể tìm thấy mọi cuốn sách bạn yêu thích. 
              Chúng tôi cam kết mang lại trải nghiệm mua sách tuyệt vời nhất.
            </p>
          </div>

          {/* Thông tin */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Thông tin</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none">Về chúng tôi</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Hướng dẫn mua hàng</a></li>
            </ul>
          </div>

          {/* Liên hệ & mạng xã hội */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Liên hệ</h5>
            <p className="text-muted mb-1"><i className="fas fa-phone me-2"></i> 0123 456 789</p>
            <p className="text-muted mb-3"><i className="fas fa-envelope me-2"></i> support@bookstore.com</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-dark"><i className="fab fa-facebook fa-lg"></i></a>
              <a href="#" className="text-dark"><i className="fab fa-instagram fa-lg"></i></a>
              <a href="#" className="text-dark"><i className="fab fa-twitter fa-lg"></i></a>
              <a href="#" className="text-dark"><i className="fab fa-youtube fa-lg"></i></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-top pt-3 pb-2 mt-4 text-muted small">
          &copy; 2025 BookStore. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
