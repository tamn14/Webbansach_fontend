import HinhAnhModel from "../models/HinhAnhModel";
import my_Request from "./Request";

export async function getAllImageByBook(masach : number): Promise<HinhAnhModel[]> {
   
    const duongDan: string = `http://localhost:8080/sach/${masach}/hinhAnhs`;
    return getImage(duongDan); 
}

export async function get1ImageByBook(masach : number): Promise<HinhAnhModel[]> {
   
    const duongDan: string = `http://localhost:8080/sach/${masach}/hinhAnhs?sort=maHinhAnh,asc&page=0&size=1`;
    return getImage(duongDan);  
}

async function getImage(endpoint : string): Promise<HinhAnhModel[]> {
    const ketQua: HinhAnhModel[] = [];
   
    // Goi phuong thuc request
    const response = await my_Request(endpoint)
    // Lay ra json sach 
    const responseData = response._embedded.hinhAnhs;
    for (const key in responseData) {
        ketQua.push({
            maHinhAnh : responseData[key].maHinhAnh , 
            tenHinhAnh : responseData[key].tenHinhAnh ,
            laIcon : responseData[key].laIcon ,
            duongDan : responseData[key].duongDan ,
            duLieuAnh : responseData[key].duLieuAnh ,
        })
    }
    return ketQua;
}