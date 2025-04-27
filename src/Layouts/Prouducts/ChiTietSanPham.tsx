import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SachModel from "../../models/SachModel";
import { getById } from "../../API/SachAPI";
import HinhAnhSanPham from "./Component/HinhAnhSanPham";
import DanhGiaSanPham from "./Component/DanhGiaSanPham";

const ChiTietSach: React.FC = () => {
  const { maSach } = useParams();
  const [soLuong, setSoLuong] = useState(1);
  let maSachNumber = 0;
  try {
    maSachNumber = parseInt(maSach + "");
    if (Number.isNaN(maSachNumber)) maSachNumber = 0;
  } catch (error) {
    maSachNumber = 0;
    console.log("Error: ", error);
  }


  const [sach, setSach] = useState<SachModel | null>(null);
  const [loading, setLoading] = useState(true);
  const giamSoLuong = () => {
    if (soLuong > 1) setSoLuong(soLuong - 1);
  };

  const tangSoLuong = () => {
    if (sach?.soLuong && soLuong < sach.soLuong) setSoLuong(soLuong + 1);
  };

  useEffect(() => {
    if (maSach) {
      getById(Number(maSach))
        .then((data) => setSach(data))
        .finally(() => setLoading(false));
    }
  }, [maSach]);

  if (loading)
    return (
      <div className="text-center mt-5 fw-bold text-primary">
        Đang tải...
      </div>
    );

  if (!sach)
    return (
      <div className="text-center mt-5 text-danger fw-bold">
        Không tìm thấy sách
      </div>
    );


  const soLuongSach = sach.soLuong ?? 0;


  const handleThemVaoGioHang = () => {

  }
  const handleMuaNgay = () => {

  }
  return (
    <div className="container">
      <div className="row mt-5 mb-5">
        {/* Cột hình ảnh */}
        <div className="col-md-4 mb-4">
          <div className="border rounded shadow-sm p-3 bg-white">
            <HinhAnhSanPham maSach={maSachNumber} />
          </div>
        </div>

        {/* Cột thông tin sách */}
        <div className="col-md-8">
          <div className="p-4 bg-white rounded shadow h-100">
            <h2 className="fw-bold text-dark mb-2">{sach.tenSach}</h2>

            <h5 className="fw-medium text-muted mb-3">
              Tác giả: <span className="text-dark">{sach.tenTacGia}</span>
            </h5>

            <div className="mb-3">
              <span className="badge bg-warning text-dark me-2">
                ★ {sach.trungBinhXepHang} / 5
              </span>
              <span className={`fw-semibold ${soLuongSach > 0 ? 'text-success' : 'text-danger'}`}>
                {soLuongSach > 0 ? "Còn hàng" : "Hết hàng"}
              </span>
            </div>

            <div className="mb-3">
              <del className="text-muted me-2">
                {sach.giaNiemYet?.toLocaleString("vi-VN")} ₫
              </del>
              <span className="fs-4 fw-bold text-danger">
                {sach.giaBan?.toLocaleString("vi-VN")} ₫
              </span>
            </div>

            <p className="text-secondary" style={{ whiteSpace: "pre-line" }}>
              {sach.moTa}
            </p>

            {/* Chọn số lượng */}
            <div className="form-group mb-4">
              <div >
                <label className="form-label fw-semibold mb-3">Số lượng</label>

                <div className="d-flex align-items-center gap-3">
                  <button
                    className="btn btn-outline-secondary px-3"
                    onClick={giamSoLuong}
                    disabled={soLuong <= 1}
                  >
                    –
                  </button>

                  <div
                    className="border px-3 py-1 rounded bg-light text-center fw-medium"
                    style={{ minWidth: "50px" }}
                  >
                    {soLuong}
                  </div>

                  <button
                    className="btn btn-outline-secondary px-3"
                    onClick={tangSoLuong}
                    disabled={soLuong >= soLuongSach}
                  >
                    +
                  </button>
                </div>

                <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                  <span className="fw-semibold">Tạm tính:</span>
                  <span className="fw-bold text-danger">
                    {(sach?.giaBan && soLuong) ? (sach.giaBan * soLuong).toLocaleString("vi-VN") + " ₫" : "0 ₫"}
                  </span>
                </div>
              </div>
            </div>


            <div className="mt-4 d-flex gap-3">
              <button
                className="btn btn-danger btn-lg px-4 shadow-sm d-flex align-items-center"
                onClick={handleThemVaoGioHang}
              >
                <i className="bi bi-cart-plus me-2"></i>
                Thêm vào giỏ hàng
              </button>
              <button
                className="btn btn-outline-warning btn-lg px-4 shadow-sm d-flex align-items-center"
                onClick={handleMuaNgay}
              >
                <i className="bi bi-lightning me-2"></i>
                Mua ngay
              </button>
            </div>


          </div>
        </div>

        <div className="col mt-4 mb-4">
          <DanhGiaSanPham maSach={maSachNumber} />
        </div>
      </div>
    </div>
  );
};

export default ChiTietSach;
