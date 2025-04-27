import DanhGia from "../models/DanhGia";
import HinhAnhModel from "../models/HinhAnhModel";
import my_Request from "./Request";

export async function getAllIPreviewByBook(masach: number): Promise<DanhGia[]> {

    const duongDan: string = `http://localhost:8080/sach/${masach}/suDanhGias`;
    return getDanhGia(duongDan);
}



async function getDanhGia(endpoint: string): Promise<DanhGia[]> {
    const ketQua: DanhGia[] = [];

    // Goi phuong thuc request
    const response = await my_Request(endpoint)
    // Lay ra json sach 
    const responseData = response._embedded.suDanhGias;
    for (const key in responseData) {
        ketQua.push({
            maDanhGia: responseData[key].maDanhGia,
            diemXepHang: responseData[key].diemXepHang,
            nhanXet: responseData[key].nhanXet
           
        })
    }
    return ketQua;
}