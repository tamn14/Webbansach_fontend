import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { getAllImageByBook } from "../../../API/HinhAnhAPI";

type bookProps = {
    book: SachModel;
};

const SachProps = ({ book }: bookProps) => {
    const maSach: number = book.maSach;
    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState<string | null>(null);

    useEffect(() => {
        getAllImageByBook(maSach).then(
            hinhAnhData => {
                setDanhSachAnh(hinhAnhData);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setBaoLoi(error.message);
            }
        )
    }, [maSach]);

    if (dangTaiDuLieu) {
        return <div><h1>Đang tải dữ liệu...</h1></div>;
    }

    if (baoLoi) {
        return <div><h1>Gặp lỗi: {baoLoi}</h1></div>;
    }

    return (
        <div className="col-md-3 col-sm-6 mb-4">
            <div className="card h-100 shadow rounded-3 border-0">
                {danhSachAnh.length > 0 && (
                    <Link to={`sach/${book.maSach}`}>
                        <img
                            src={danhSachAnh[0].duLieuAnh}
                            alt={book.tenSach}
                            className="card-img-top"
                            style={{
                                height: "180px",
                                objectFit: "cover",
                                borderTopLeftRadius: "0.75rem",
                                borderTopRightRadius: "0.75rem",
                                cursor: "pointer"
                            }}
                        />
                    </Link>
                )}

                <div className="card-body d-flex flex-column p-3">
                    <Link to={`/sach/${book.maSach}`} className="text-decoration-none">
                        <h6 className="card-title fw-semibold text-primary mb-2" style={{ fontSize: "1rem", cursor: "pointer" }}>
                            {book.tenSach}
                        </h6>
                    </Link>

                    <p className="card-text text-muted mb-3" style={{ fontSize: "0.9rem", flexGrow: 1 }}>
                        {book.moTa}
                    </p>

                    <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <small className="text-muted text-decoration-line-through" style={{ fontSize: "0.8rem" }}>
                                {book.giaNiemYet?.toLocaleString()} đ
                            </small>
                            <span className="text-danger fw-bold" style={{ fontSize: "1rem" }}>
                                {book.giaBan?.toLocaleString()} đ
                            </span>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-primary btn-sm w-100" style={{ fontSize: "0.85rem" }}>
                                🛒 Thêm giỏ
                            </button>
                            <button className="btn btn-outline-danger btn-sm w-100" style={{ fontSize: "0.85rem" }}>
                                ❤️ Yêu thích
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SachProps;
