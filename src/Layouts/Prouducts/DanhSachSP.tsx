import { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import SachProps from "./Component/SachProps";
import { getAllBook, timKiemSach } from "../../API/SachAPI";
import PhanTrang from "../Utils/PhanTrang";

interface danhSachSanPhamProps {
    tuKhoaTimKiem: string ; 
    maTheLoai : number ; 
}

const DanhSachSP = ({ tuKhoaTimKiem , maTheLoai }: danhSachSanPhamProps) => {

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1)
    const [tongSoTrang, setTongSoTrang] = useState(0)
    const [tongSoSach, setTongSoSach] = useState(0)

    useEffect(() => {
        setDangTaiDuLieu(true);
        const fetchData = (tuKhoaTimKiem.trim() === " " && maTheLoai == 0  )
            ? getAllBook(trangHienTai)
            : timKiemSach(tuKhoaTimKiem, trangHienTai , maTheLoai); 

        fetchData
            .then(sachData => {
                setDanhSachQuyenSach(sachData.ketqua);
                setTongSoTrang(sachData.tongSoTrang);
                setTongSoSach(sachData.soSachMotTrang);
            })
            .catch(error => {
                setBaoLoi(error.message);
            })
            .finally(() => {
                setDangTaiDuLieu(false);
            });
    }, [trangHienTai, tuKhoaTimKiem , maTheLoai]);


    const phanTrang = (trangHienTai: number) => setTrangHienTai(trangHienTai)
    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>
                    Dang tai du lieu
                </h1>
            </div>
        )
    }
    if (baoLoi) {
        return (
            <div>
                <h1> Gap loi: {baoLoi}</h1>
            </div>
        )
    }
    return (
        <div className="container col-8 mt-5">
            <div className="row mt-4">
                {
                    danhSachQuyenSach.map(book => (
                        <SachProps key={book.maSach} book={book} />

                    ))
                }
            </div>
            <PhanTrang trangHienTai={trangHienTai}
                tongSoTrang={tongSoTrang}
                onClickTrang={phanTrang} />
        </div>
    )

};
export default DanhSachSP; 


