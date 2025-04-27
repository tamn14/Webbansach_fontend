import React, { useState } from "react"

const DangKyNguoiDung = () => {
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [email, setEmail] = useState("");
    const [hoDem, setHoDem] = useState("");
    const [ten, setTen] = useState("");
    const [sdt, setSDT] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [matKhauLapLai, setMatKhauLapLai] = useState("");
    const [gioiTinh, setGioiTinh] = useState("M");
    const [thongbao, setThongBao] = useState("");

    // cac bien bao loi 
    const [errorTenDangNhap, setErrorTenDangNhap] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorMatKhau, setErrorMatKhau] = useState("");
    const [errorMatKhauLapLai, setErrorMatKhauLapLai] = useState("");

    // su ly submit
    const handleSubmit = async (e: React.FormEvent) => {
        // clear any previous error message
        setErrorEmail("")
        setErrorMatKhau("")
        setErrorMatKhauLapLai("")
        setErrorTenDangNhap("")

        // tranh click lien tuc 
        e.preventDefault() 

        // kiem tra dieu kien va gan ket qua vao bien 
        const isTenDangNhapValid = !await kiemTraTenDangNhapDaTonTai(tenDangNhap)
        const isEmailValid = !await kiemTraEmailDaTonTai(email)
        const isMatKhauValid = !kiemTraMatKhau(matKhau)
        const isMatKhauNhapLaiValid = !kiemTraMatKhaulapLai(matKhauLapLai)


        // kiem tra tat ca dieu kien  
        if(isTenDangNhapValid && isMatKhauNhapLaiValid && isMatKhauValid && isEmailValid) {
            try {
                const endpoint = `http://localhost:8080/taikhoan/dangky`
                const response = await fetch(endpoint,  
                    {
                        method : "POST" , 
                        headers : {
                            'Content-type' : "application/json"
                        } , 
                        body : JSON.stringify( {
                            tenDangNhap : tenDangNhap , 
                            email : email , 
                            matKhau : matKhau , 
                            hoDem : hoDem , 
                            ten : ten , 
                            sdt : sdt , 
                            gioiTinh: gioiTinh
                        }
                        )
                    }
                )
                if(response.ok) {
                    setThongBao("Thanh cong , vui long kiem tra email de kich hoat ")
                }
                else if(response.ok) {
                    setThongBao("Da xay ra loi trong qua trinh dang ky tai khoan ")
                }
            }

            catch(error) {
                setThongBao("Da xay ra loi trong qua trinh dang ky tai khoan ")
            }
        }
    }
    // Kiem tra ten dang nhap
    const kiemTraTenDangNhapDaTonTai = async (ten: string) => {
        const url = `http://localhost:8080/nguoidung/search/existsByTenDangNhap?tenDangNhap=${ten}`;
        // call api 
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorTenDangNhap("Tên đăng nhập đã tồn tại");
                return true;
            }
            return false;
        }
        catch (error) {
            console.log("Lỗi khi kiểm tra tên đăng nhập: " + error);
            return false;
        }
    }
    
    // xử lý lỗi khi nhập tên đăng nhập
    const handleTenDangNhapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTenDangNhap(value);    // Cập nhật input người dùng
        setErrorTenDangNhap("");  // Xóa lỗi cũ
        kiemTraTenDangNhapDaTonTai(value);   // Truyền giá trị mới vào
    }
    
    // kiem tra email 
    const kiemTraEmailDaTonTai = async (email: string) => {
        const url = `http://localhost:8080/nguoidung/search/existsByEmail?email=${email}`;
        // call api 
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorEmail("Email đã tồn tại");
                return true;
            }
            return false;
        }
        catch (error) {
            console.log("Lỗi khi kiểm tra email: " + error);
            return false;
        }
    }
    
    // xử lý lỗi khi nhập tên đăng nhập
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);    
        setErrorEmail("");  
        kiemTraEmailDaTonTai(value);   // Truyền giá trị mới vào
    }

    //Kiem tra mat khau  
    const kiemTraMatKhau = (matKhau: string) => {
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^+=-])[A-Za-z\d@$!%*#?&^+=-]{8,}$/;
        if (!passRegex.test(matKhau)) {
            setErrorMatKhau("Mật khẩu phải đủ 8 ký tự, gồm chữ, số và ký tự đặc biệt");
            return true;
        } else {
            setErrorMatKhau("");
            return false;
        }
    };
    
    const handleMatKhau = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMatKhau(value); 
        setErrorMatKhau(""); 
        kiemTraMatKhau(value);
    };
    
     //Kiem tra mat khau lap lai 
     const kiemTraMatKhaulapLai = (matKhauLaiLai: string) => {
        if (matKhauLaiLai!== matKhau) {
            setErrorMatKhauLapLai("Mật khẩu lap lai khong dung");
            return true;
        } else {
            setErrorMatKhau("");
            return false;
        }
    };
    
    const handleMatKhauLapLai = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMatKhauLapLai(value); 
        setErrorMatKhauLapLai(""); 
        kiemTraMatKhaulapLai(value);
    };


    return (

        <div className="container mt-5">
            <h2 className="mb-4">Đăng ký tài khoản</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên đăng nhập</label>
                    <input
                        type="text"
                        className="form-control"
                        value={tenDangNhap}
                        onChange={handleTenDangNhapChange}
                        required
                    />
                    <div className="text text-danger">{errorTenDangNhap}</div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                     <div className="text text-danger">{errorEmail}</div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Họ đệm</label>
                        <input
                            type="text"
                            className="form-control"
                            value={hoDem}
                            onChange={(e) => setHoDem(e.target.value)}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Tên</label>
                        <input
                            type="text"
                            className="form-control"
                            value={ten}
                            onChange={(e) => setTen(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Số điện thoại</label>
                    <input
                        type="tel"
                        className="form-control"
                        value={sdt}
                        onChange={(e) => setSDT(e.target.value)}
                    />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Mật khẩu</label>
                        <input
                            type="password"
                            className="form-control"
                            value={matKhau}
                            onChange={handleMatKhau}
                            required
                        />
                        <div className="text text-danger">{errorMatKhau}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            className="form-control"
                            value={matKhauLapLai}
                            onChange={handleMatKhauLapLai}
                            required
                        />
                        <div className="text text-danger">{errorMatKhauLapLai}</div>
                    </div>
                </div>

                <div className="mb-3">
                        <label htmlFor="gioiTinh" className="form-label">Giới tính</label>
                        <input
                            type="text"
                            id="gioiTinh"
                            className="form-control"
                            value={gioiTinh}
                            onChange={(e) => setGioiTinh(e.target.value)}
                        />
                    </div>

                <button type="submit" className="btn btn-primary">
                    Đăng ký
                </button>
                <div className="text text-success"> {thongbao}</div>
            </form>
        </div>
    );
}

export default DangKyNguoiDung 