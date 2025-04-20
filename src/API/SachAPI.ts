import SachModel from "../models/SachModel";
import my_Request from "./Request";



export async function getAllBook(): Promise<SachModel[]> {
   
    const duongDan: string = "http://localhost:8080/sach?sort=maSach,desc";
    // Goi phuong thuc request
    return getBook(duongDan);
   
}

export async function get3Book(): Promise<SachModel[]> {
   
    const duongDan: string = "http://localhost:8080/sach?sort=maSach,desc&page=0&size=3";
    // Goi phuong thuc request
    return getBook(duongDan);
   
}

async function getBook(endpoint : string): Promise<SachModel[]> {
    const ketQua: SachModel[] = [];
    // Xac dinh endpoint
    
    const response = await my_Request(endpoint)
    // Lay ra json sach 
    const responseData = response._embedded.saches;
    for (const key in responseData) {
        ketQua.push({
            maSach: responseData[key].maSach,
            tenSach : responseData[key].tenSach,
            giaBan  : responseData[key].giaBan,
            giaNiemYet :responseData[key].giaNiemYet,
            moTa : responseData[key].moTa,
            soLuong : responseData[key].soLuong,
            tenTacGia : responseData[key].tenTacGia,
            trungBinhXepHang: responseData[key].trungBinhXepHang
        })
    }
    return ketQua;
}