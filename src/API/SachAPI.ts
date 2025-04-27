import SachModel from "../models/SachModel";
import my_Request from "./Request";

type ketqua = {
    ketqua: SachModel[];
    tongSoTrang: number;
    soSachMotTrang: number;
}

export async function getAllBook(page: number): Promise<ketqua> {
    const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&page=${page - 1}&size=8`;
    return getBook(duongDan);
}


export async function get3Book(): Promise<ketqua> {

    const duongDan: string = "http://localhost:8080/sach?sort=maSach,desc&page=0&size=3";
    // Goi phuong thuc request
    return getBook(duongDan);

}

export async function getById(maSach: number): Promise<SachModel | null> {
    const duongDan: string = `http://localhost:8080/sach/${maSach}`;

    try {
        const response = await my_Request(duongDan);

        // Trường hợp API không trả về dữ liệu
        if (!response || response.status === 404) {
            return null;
        }

        // Trường hợp response là object JSON của 1 quyển sách
        const sachData = await response.json?.() || response; // nếu `my_Request` đã trả về JSON thì không cần .json()

        const ketQua: SachModel = {
            maSach: sachData.maSach,
            tenSach: sachData.tenSach,
            giaBan: sachData.giaBan,
            giaNiemYet: sachData.giaNiemYet,
            moTa: sachData.moTa,
            soLuong: sachData.soLuong,
            tenTacGia: sachData.tenTacGia,
            trungBinhXepHang: sachData.trungBinhXepHang
        };

        return ketQua;
    } catch (error) {
        console.error("Lỗi khi lấy sách theo ID:", error);
        return null;
    }
}

const soLuongSachTrenTrang = 8;

export async function timKiemSach(tuKhoa: string, page: number, maTheLoai: number): Promise<ketqua> {
    let duongDan = `http://localhost:8080/sach?sort=maSach,desc&page=${page - 1}&size=${soLuongSachTrenTrang}`;

    const tuKhoaEncoded = encodeURIComponent(tuKhoa.trim());

    if (tuKhoa.trim() !== "" && maTheLoai === 0) {
        duongDan = `http://localhost:8080/sach/search/findByTenSachContaining?tensach=${tuKhoaEncoded}&sort=maSach,desc&page=${page - 1}&size=${soLuongSachTrenTrang}`;
    } else if (tuKhoa.trim() !== "" && maTheLoai !== 0) {
        duongDan = `http://localhost:8080/sach/search/findByTenSachContainingAndTheLoais_MaTheLoai?tensach=${tuKhoaEncoded}&sort=maSach,desc&page=${page - 1}&size=${soLuongSachTrenTrang}&maTheLoai=${maTheLoai}`;
    } else if (tuKhoa.trim() === "" && maTheLoai !== 0) {
        duongDan = `http://localhost:8080/sach/search/findByTheLoais_MaTheLoai?sort=maSach,desc&page=${page - 1}&size=${soLuongSachTrenTrang}&maTheLoai=${maTheLoai}`;
    }

    return getBook(duongDan);
}


async function getBook(endpoint: string): Promise<ketqua> {
    const ketQua: SachModel[] = [];
    // Xac dinh endpoint

    const response = await my_Request(endpoint)
    // Lay ra json sach 
    const responseData = response._embedded.saches;

    // lay thong tin trang 
    const tongSoTrang: number = response.page.totalPages;
    const tongSoSach: number = response.page.totalElements;
    for (const key in responseData) {
        ketQua.push({
            maSach: responseData[key].maSach,
            tenSach: responseData[key].tenSach,
            giaBan: responseData[key].giaBan,
            giaNiemYet: responseData[key].giaNiemYet,
            moTa: responseData[key].moTa,
            soLuong: responseData[key].soLuong,
            tenTacGia: responseData[key].tenTacGia,
            trungBinhXepHang: responseData[key].trungBinhXepHang
        })
    }
    return { ketqua: ketQua, tongSoTrang: tongSoTrang, soSachMotTrang: tongSoSach };
}