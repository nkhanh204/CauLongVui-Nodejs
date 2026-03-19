# 📘 BACKEND CODING RULES 

---

## 1. Naming Convention

### 1.1. Quy tắc chung

* Variables / Functions → `camelCase`
* Classes / Models → `PascalCase`
* Constants → `UPPER_SNAKE_CASE`
* Files / Folders → `kebab-case`

---

### 1.2. Boolean (BẮT BUỘC)

✔ Dùng:

* isPaid
* hasPermission
* canDelete
* shouldRedirect

❌ Không dùng:

* paid
* permission
* status

---

## 2. Async & Code Style

* Không dùng `var`
* Ưu tiên `const`, dùng `let` khi cần
* Bắt buộc dùng `async/await`
* Không dùng `.then()`

✔ Luôn có `try/catch`

---

## 3. Clean Code

### 3.1. Single Responsibility

* Mỗi function chỉ làm 1 việc

---

### 3.2. Function Size

* ≤ 40 dòng
* Dài hơn → tách nhỏ

---

### 3.3. Guard Clause

* Check lỗi sớm → return ngay
* Không lồng if quá sâu

---

## 4. Architecture

```text
Route → Controller → Service → Model
```

---

### 4.1. Controller

* Chỉ xử lý request/response
* Không chứa business logic
* Không query database

---

### 4.2. Service

* Xử lý nghiệp vụ
* Có thể gọi service khác

---

### 4.3. Model

* Chỉ làm việc với database

---

### 4.4. Rule giữa các module

✔ Service có thể:
- gọi service khác
- query model khác nếu hợp lý

⚠️ Nhưng:
- ưu tiên gọi qua service để giữ logic tập trung

## 5. DTO (Data Transfer Object)

### 5.1. Không trả raw data

❌ Sai:

* return user

✔ Đúng:

* map dữ liệu trước khi trả

---

### 5.2. Validate Output (KHUYẾN KHÍCH)

* Dùng Zod/Joi để validate output
* Không leak:

  * password
  * internal fields

---

## 6. Error Handling (BẮT BUỘC)

### 6.1. Không dùng Error thường

❌ Sai:

* throw new Error()

✔ Đúng:

* BadRequestError (400)
* UnauthorizedError (401)
* ForbiddenError (403)
* NotFoundError (404)
* InternalServerError (500)

---

### 6.2. Format lỗi

```json
{
  "success": false,
  "message": "Error message",
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "details": []
  }
}
```

---

### 6.3. Middleware

* Tất cả lỗi phải đi qua middleware
* Không xử lý rải rác

---

## 7. Dependency Injection

- Trong Node.js, có thể import trực tiếp dependency trong service
- Chỉ dùng DI khi:
  - cần test phức tạp
  - hoặc project lớn (enterprise)

✔ Chấp nhận:
- require/import trực tiếp model/service

✔ Có thể dùng DI cho:
- logger
- external services (momo, vnpay)

## 8. DRY & Utils

* Không lặp code
* Dùng `src/utils/` cho logic chung
* Pure function:

  * Không DB
  * Không side-effect

---

## 9. Logging

* Không dùng console.log trong production
* Dùng logger (winston/pino)

Log:

* error
* request
* payment

---

## 10. Security

* Không trả password/token
* Validate input
* Sanitize data
* Hash password (bcrypt)

---

## 11. Transaction & Concurrency

Áp dụng cho booking/payment:

* Có trạng thái holding
* Timeout giữ chỗ
* Tránh double booking

---

## 12. API Rules

* Controller không có logic
* Controller không query DB
* Service không trả raw model

---

## 13. Testing

* Unit test cho Service
* Mock dependency (DI)
* Integration test cho API

---

## 14. Documentation

* Service phải có JSDoc
* Mô tả input/output rõ ràng

---
## 15. Validation Flow

- Validation phải thực hiện ở middleware
- Không validate trong controller/service

Flow:
Route → Validate Middleware → Controller
