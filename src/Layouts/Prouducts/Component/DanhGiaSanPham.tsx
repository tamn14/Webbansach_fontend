import { useEffect, useState } from "react";
import { getAllIPreviewByBook } from "../../../API/DanhGiaAPI";
import DanhGia from "../../../models/DanhGia";

type Props = {
  maSach: number;
};

const DanhGiaSanPham = ({ maSach }: Props) => {
  const [danhSachDanhGia, setDanhSachDanhGia] = useState<DanhGia[]>([]);
  const [hienThiToanBo, setHienThiToanBo] = useState(false);
  const [dangTai, setDangTai] = useState(true);
  const [loi, setLoi] = useState("");

  useEffect(() => {
    getAllIPreviewByBook(maSach)
      .then((data) => {
        setDanhSachDanhGia(data);
        setDangTai(false);
      })
      .catch((error) => {
        setLoi(error.message || "Lỗi không xác định");
        setDangTai(false);
      });
  }, [maSach]);

  if (dangTai) return <div className="text-center text-primary">Đang tải đánh giá...</div>;
  if (loi) return <div className="text-center text-danger">Gặp lỗi: {loi}</div>;
  if (danhSachDanhGia.length === 0) {
    return <div className="text-center text-muted">Chưa có đánh giá nào cho sách này.</div>;
  }

  // Giới hạn số đánh giá hiển thị nếu không phải xem toàn bộ
  const soLuongHienThi = hienThiToanBo ? danhSachDanhGia.length : 3;

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h5 className="text-dark mb-3 fw-bold">Đánh giá sản phẩm</h5>
      {danhSachDanhGia.slice(0, soLuongHienThi).map((danhGia, index) => (
        <div key={index} className="border-bottom pb-2 mb-3">
          <div className="d-flex align-items-center mb-1">
            <div className="me-2 text-warning fs-6">
              {"★".repeat(danhGia.diemXepHang || 0)}
              {"☆".repeat(5 - (danhGia.diemXepHang || 0))}
            </div>
          </div>
          <p className="text-secondary mb-0">
            {danhGia.nhanXet || "Không có nhận xét"}
          </p>
        </div>
      ))}

      {!hienThiToanBo && danhSachDanhGia.length > 3 && (
        <div className="text-center">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => setHienThiToanBo(true)}
          >
            Xem tất cả đánh giá ({danhSachDanhGia.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default DanhGiaSanPham;
