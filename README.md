# Sổ Chi Tiêu — Thực hành buổi 2

Website quản lý chi tiêu cá nhân, hỗ trợ quản lý các giao dịch
thu và chi, tìm kiếm, lọc nâng cao và xem chi tiết giao dịch.

## Thông tin sinh viên

- Họ tên: Huỳnh Nhật Hào
- MSSV: 6651071017

## Xác định đề tài theo MSSV

- S = 6 + 6 + 5 + 1 + 0 + 7 + 1 + 0 + 1 + 7 = 34.
- D = 34 mod 15 = 4.
- Chủ đề: Quản lý chi tiêu cá nhân.
- F = 17 mod 10 = 7.
- C = 6 mod 5 = 1.
- Màu chủ đạo gợi ý: Emerald (#059669).

## Ba tính năng bắt buộc

1. Tìm kiếm và lọc nâng cao.
2. CRUD cục bộ hoàn chỉnh: thêm, xem, sửa, xóa giao dịch;
   lưu dữ liệu bằng localStorage.
3. Modal chi tiết giao dịch.

## Công nghệ

- React 18, sử dụng Hooks.
- TypeScript, bật strict và không sử dụng any.
- Vite.
- Tailwind CSS 3.
- React Router 6.
- State: useState, useReducer hoặc Context API.
- ESLint.
- Vitest.

## Cấu trúc giao diện dự kiến

### Trang danh sách: /

- Thanh tiêu đề và tên ứng dụng.
- Tổng thu, tổng chi và số dư.
- Ô tìm kiếm theo tên hoặc ghi chú giao dịch.
- Bộ lọc loại giao dịch, danh mục, khoảng ngày và khoảng tiền.
- Nút thêm giao dịch.
- Danh sách giao dịch.
- Các thao tác xem nhanh, mở trang chi tiết, sửa và xóa.
- Thông báo khi chưa có dữ liệu hoặc không có kết quả phù hợp.

### Trang chi tiết: /item/:id

- Tên giao dịch.
- Loại giao dịch: thu hoặc chi.
- Số tiền.
- Danh mục.
- Ngày giao dịch.
- Phương thức thanh toán.
- Ghi chú.
- Nút quay lại danh sách.
- Thông báo nếu giao dịch không tồn tại.

### Modal chi tiết

- Hiển thị nhanh thông tin giao dịch.
- Có nút đóng.
- Đóng được bằng phím Escape.
- Giữ focus trong modal khi mở.
- Trả focus về nút đã mở modal khi đóng.

## Dữ liệu

- Tối thiểu 20 giao dịch mẫu, phù hợp chủ đề.
- Mỗi giao dịch có ID duy nhất.
- Dữ liệu mẫu chỉ được sử dụng khi chưa có dữ liệu đã lưu.
- Các thao tác thêm, sửa, xóa được lưu vào localStorage.
- Danh sách rỗng sau khi xóa hết vẫn được giữ khi tải lại trang.

## Responsive

- Mobile: chiều rộng dưới 640px, danh sách 1 cột.
- Tablet: từ 640px đến 1024px, danh sách 2 cột.
- Desktop: trên 1024px, danh sách 3 cột.

## Wireframe

Các ảnh phác thảo giao diện được lưu trong thư mục design/.

## Chạy dự án

npm install
npm run dev

## Repository

https://github.com/huynhnhuthao6977-beep/6651071017-lab2-quan-ly-chi-tieu

## Liên kết nộp bài

- Website: (https://6651071017-lab2-quan-ly-chi-tieu.vercel.app/)
- Video demo: bổ sung sau khi hoàn thành.