import { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import SachProps from "./Component/SachProps";
import { getAllBook } from "../../API/SachAPI";


const DanhSachSP = () => {

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        getAllBook().then(
            sachData => {
                setDanhSachQuyenSach(sachData) ; 
                setDangTaiDuLieu(false)
            }
        ).catch(
            error =>{
                setBaoLoi(error.message);
            }
        )
    }, [] // chi goi 1 lan 
    )

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
        <div className="container col-8">
            <div className="row mt-4">
                {
                    danhSachQuyenSach.map(book => (
                        <SachProps key={book.maSach} book={book} />
                        
                    ))
                }
            </div>
        </div>
    )

};
export default DanhSachSP; 
