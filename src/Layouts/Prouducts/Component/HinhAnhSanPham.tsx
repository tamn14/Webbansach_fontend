import { useEffect, useState } from "react";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { getAllImageByBook } from "../../../API/HinhAnhAPI";

type hinhAnhSanPham = {
  maSach: number;
};

const HinhAnhSanPham = ({ maSach }: hinhAnhSanPham) => {
  const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
  const [hinhAnhDangChon, setHinhAnhDangChon] = useState<HinhAnhModel | null>(null);
  const [dangTai, setDangTai] = useState(true);
  const [loi, setLoi] = useState("");

  useEffect(() => {
    getAllImageByBook(maSach)
      .then((data) => {
        setDanhSachAnh(data);
        setHinhAnhDangChon(data[0]);
        setDangTai(false);
      })
      .catch((error) => setLoi(error.message));
  }, [maSach]);

  if (dangTai) return <div>Đang tải ảnh...</div>;
  if (loi) return <div>Gặp lỗi: {loi}</div>;

  return (
    <div className="text-center">
      {/* Ảnh chính */}
      <div className="mb-3">
        {hinhAnhDangChon && (
          <img
            src={hinhAnhDangChon.duLieuAnh}
            alt="Ảnh chính"
            className="img-fluid rounded shadow border"
            style={{
              maxHeight: "400px",
              objectFit: "contain",
            }}
          />
        )}
      </div>

      {/* Ảnh phụ */}
      <div className="d-flex justify-content-center flex-wrap gap-2">
        {danhSachAnh.map((hinhAnh, index) => (
          <div key={index} onClick={() => setHinhAnhDangChon(hinhAnh)} style={{ cursor: "pointer" }}>
            <img
              src={hinhAnh.duLieuAnh}
              alt={`Ảnh ${index + 1}`}
              className="img-thumbnail"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
                border:
                  hinhAnh.duLieuAnh === hinhAnhDangChon?.duLieuAnh
                    ? "2px solid #0d6efd"
                    : "1px solid #ccc",
                transition: "all 0.2s ease-in-out",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HinhAnhSanPham;
