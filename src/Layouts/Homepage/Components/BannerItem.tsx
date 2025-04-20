import { useEffect, useState } from "react";
import HinhAnhModel from "../../../models/HinhAnhModel";
import SachModel from "../../../models/SachModel";
import { get1ImageByBook } from "../../../API/HinhAnhAPI";

type BannerItemProps = {
  book: SachModel;
};

const BannerItem = ({ book }: BannerItemProps) => {
  const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);

  useEffect(() => {
    get1ImageByBook(book.maSach)
      .then((hinhAnhData) => {
        setDanhSachAnh(hinhAnhData);
      })
      .catch((error) => {
        console.error("Lỗi load ảnh: ", error.message);
      });
  }, [book.maSach]);

  if (danhSachAnh.length === 0) return null;

  return (
    <div className="swiper-slide">
      <div className="d-flex justify-content-center">
        <img
          src={danhSachAnh[0].duLieuAnh}
          alt={`Book ${book.tenSach}`}
          className="img-fluid zoom-in-fade"
          style={{
            objectFit: "contain",
            width: "100%",
            height: "500px",
            borderRadius: "12px",
          }}
        />
      </div>
    </div>
  );
};

export default BannerItem;
