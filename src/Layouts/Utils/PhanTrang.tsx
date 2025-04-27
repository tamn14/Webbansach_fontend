import React from "react";

type PhanTrangProps = {
  trangHienTai: number;
  tongSoTrang: number;
  onClickTrang: (trang: number) => void;
};

const PhanTrang = ({ trangHienTai, tongSoTrang, onClickTrang }: PhanTrangProps) => {
  const taoDanhSachTrang = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (tongSoTrang <= 5) {
      // Hiển thị tất cả nếu tổng số trang nhỏ
      for (let i = 1; i <= tongSoTrang; i++) pages.push(i);
    } else {
      pages.push(1); // Trang đầu

      if (trangHienTai > 3) pages.push("...");

      // Hiển thị 3 trang chính giữa
      const start = Math.max(2, trangHienTai - 1);
      const end = Math.min(tongSoTrang - 1, trangHienTai + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (trangHienTai < tongSoTrang - 2) pages.push("...");

      pages.push(tongSoTrang); // Trang cuối
    }

    return pages;
  };

  const danhSachTrang = taoDanhSachTrang();

  return (
    <nav>
      <ul className="pagination">
        {danhSachTrang.map((item, index) => (
          <li
            key={index}
            className={`page-item ${
              item === trangHienTai ? "active" : item === "..." ? "disabled" : ""
            }`}
          >
            {item === "..." ? (
              <span className="page-link">...</span>
            ) : (
              <button className="page-link" onClick={() => onClickTrang(Number(item))}>
                {item}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PhanTrang;
