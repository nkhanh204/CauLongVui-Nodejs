---
description: Kiểm tra và đối soát toàn bộ mã nguồn hiện tại dựa trên các quy tắc về Coding Convention, Project Structure và API Design trong thư mục BE.
---

Dựa trên các tài liệu quy tắc bạn đã cung cấp, đây là bản Workflow: Kiểm tra & Phát triển dự án (Full Version) được thiết kế để đảm bảo tính đồng bộ tuyệt đối giữa bạn và AI Agent.

📋 WORKFLOW PHÁT TRIỂN & KIỂM TRA QUY TẮC
Bước 1: Khởi tạo & Đọc hiểu (Context Loading)
Trước khi thực hiện bất kỳ yêu cầu lập trình nào, AI Agent bắt buộc phải:

Đọc tài liệu quy tắc: Truy cập API_DESIGN_GUIDE.md, CODING_CONVENTIONS.md, và PROJECT_STRUCTURE.md.

Xác định Module: Xác định tính năng thuộc module nào (ví dụ: auth, user, court, booking, payment, voucher).

Kiểm tra cấu trúc: Đảm bảo không thay đổi các thư mục gốc trong src/.

Bước 2: Phân tích yêu cầu (Rule Validation)
Đối soát yêu cầu của người dùng với các tiêu chuẩn Clean Code:

Single Responsibility (SRP): Hàm/Class có làm quá nhiều việc không?

Guard Clauses: Kiểm tra các điều kiện sai để return hoặc throw sớm, tránh lồng if-else quá 3 tầng.

Security: Đảm bảo không trả về dữ liệu nhạy cảm như password hay token.

Cảnh báo: Nếu yêu cầu vi phạm quy tắc, AI phải báo cáo và đề xuất phương án tối ưu trước khi viết code.

Bước 3: Thực thi mã nguồn (Coding Standard)
Khi viết code, phải tuân thủ các quy chuẩn sau:

Naming: Variables/Functions (camelCase), Classes (PascalCase), Constants (UPPER_SNAKE_CASE), Files/Folders (kebab-case).

Layering: Tuân thủ luồng Controller -> Service -> Model.

Cross-module: Service module này không được gọi trực tiếp Model của module khác (phải gọi qua Service tương ứng).

Async/Await: Bắt buộc dùng async/await và bọc trong try/catch.

Documentation: Mọi hàm trong Service phải có JSDoc (@param, @returns).

Bước 4: Đối soát API & Response (API Alignment)
Đảm bảo kết quả trả về đúng chuẩn RESTful:

Status Codes: Sử dụng đúng mã (200, 201, 400, 401, 403, 404, 500).

Response Format: Luôn bọc trong cấu trúc { success, message, data, error }.

Pagination: Nếu là danh sách, phải có object pagination chứa page, limit, total.

Data Mapping: Luôn map dữ liệu (DTO) trước khi trả về, không trả raw model từ database.

Bước 5: Báo cáo & Kiểm tra lỗi (Reporting)
Sau khi hoàn thành, AI Agent phải cung cấp báo cáo theo mẫu:

Danh sách file đã tạo/chỉnh sửa: Liệt kê tên file theo chuẩn kebab-case.

Xác nhận quy tắc: Khẳng định đã kiểm tra Naming, Clean Code, và Structural Integrity.

Lưu ý (nếu có): Các điểm đặc biệt về logic nghiệp vụ (như Transaction cho Payment, Timeout cho Booking).