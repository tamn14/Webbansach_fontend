import { useState, FormEvent } from "react";

const SachForm = () => {
  const [sach, setSach] = useState({
    maSach: 0,
    tenSach: '',
    giaBan: 0,
    giaNiemYet: 0,
    moTa: '',
    soLuong: 0,
    tenTacGia: '',
    isbn: '',
    trungBinhXepHang: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setSach((prev) => ({
      ...prev,
      [name]: name === 'giaBan' || name === 'giaNiemYet' || name === 'soLuong' || name === 'trungBinhXepHang'
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn chưa đăng nhập hoặc token đã hết hạn.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/sach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(sach),
      });

      if (response.ok) {
        alert('Đã thêm sách thành công!');
        setSach({
          maSach: 0,
          tenSach: '',
          giaBan: 0,
          giaNiemYet: 0,
          moTa: '',
          soLuong: 0,
          tenTacGia: '',
          isbn: '',
          trungBinhXepHang: 0,
        });
      } else {
        alert('Gặp lỗi trong quá trình thêm sách!');
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      alert("Lỗi kết nối đến máy chủ!");
    }
  };

  return (
    <form className="container mt-5 p-4 border rounded shadow-sm bg-light col-6" onSubmit={handleSubmit}>
      <h2 className="text-center mb-4">Thêm Sách</h2>

      {[
        { label: 'Tên sách', name: 'tenSach', type: 'text' },
        { label: 'Tác giả', name: 'tenTacGia', type: 'text' },
        { label: 'ISBN', name: 'isbn', type: 'text' },
        { label: 'Giá bán', name: 'giaBan', type: 'number' },
        { label: 'Giá niêm yết', name: 'giaNiemYet', type: 'number' },
        { label: 'Số lượng', name: 'soLuong', type: 'number' },
        { label: 'Trung bình xếp hạng', name: 'trungBinhXepHang', type: 'number' },
      ].map(({ label, name, type, ...rest }) => (
        <div className="mb-3" key={name}>
          <label className="form-label">{label}</label>
          <input
            type={type}
            className="form-control"
            name={name}
            value={(sach as any)[name]}
            onChange={handleChange}
            {...rest}
            required
          />
        </div>
      ))}

      <div className="mb-4">
        <label className="form-label">Mô tả</label>
        <textarea
          className="form-control"
          name="moTa"
          rows={4}
          value={sach.moTa}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Thêm sách
      </button>
    </form>
  );
};

export default SachForm;
