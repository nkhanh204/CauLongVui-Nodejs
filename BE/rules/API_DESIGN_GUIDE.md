# 📘 Quy tắc thiết kế API RESTful

Tài liệu này định nghĩa các quy tắc thiết kế API để đảm bảo tính nhất quán, dễ sử dụng cho Frontend và tích hợp bên thứ ba (ví dụ: MoMo, VNPay).

---

## 1. HTTP Methods

* `GET`: Lấy dữ liệu (danh sách, chi tiết)
* `POST`: Tạo mới tài nguyên
* `PUT`: Cập nhật toàn bộ tài nguyên
* `PATCH`: Cập nhật một phần tài nguyên
* `DELETE`: Xóa (thường là soft delete)

---

## 2. Status Codes

* `200 OK`: Thành công
* `201 Created`: Tạo mới thành công
* `400 Bad Request`: Lỗi dữ liệu đầu vào
* `401 Unauthorized`: Chưa xác thực (chưa login)
* `403 Forbidden`: Không có quyền truy cập
* `404 Not Found`: Không tìm thấy tài nguyên
* `500 Internal Server Error`: Lỗi server

---

## 3. Chuẩn Response trả về

### ✅ Thành công

```json
{
  "success": true,
  "message": "Thành công",
  "data": {},
  "error": null
}
```

### ❌ Thất bại

```json
{
  "success": false,
  "message": "Có lỗi xảy ra",
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "details": []
  }
}
```

---

## 4. Error Handling (Chi tiết lỗi)

```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "date",
        "message": "Date cannot be in the past"
      }
    ]
  }
}
```

---

## 5. Pagination (Phân trang)

### Request

```
GET /api/v1/courts?page=1&limit=10
```

### Response

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100
    }
  }
}
```

---

## 6. Filtering & Sorting

### Ví dụ

```
GET /api/v1/courts?city=HCM&priceMin=100000&sort=price_asc
```

---

## 7. Authentication

Tất cả API cần xác thực phải gửi header:

```
Authorization: Bearer <access_token>
```

---

## 8. API Versioning

Luôn version hóa API:

```
/api/v1/...
```

---

## 9. Idempotency (Đặc biệt với Payment)

* Mỗi giao dịch phải có `orderId` duy nhất
* Tránh tạo nhiều giao dịch cho cùng một request

---

## 10. Naming Convention

* Sử dụng danh từ số nhiều:

```
/api/users
/api/bookings
/api/courts
```

* Không dùng:

```
/api/getUsers ❌
```

---

## 11. Soft Delete

* Không xóa dữ liệu khỏi database
* Chỉ cập nhật trạng thái:

```json
{
  "status": "deleted"
}
```

---

## 12. Bảo mật & Giới hạn (Optional)

* Rate limit API (login, payment)
* Validate dữ liệu đầu vào (Joi/Zod)
* Sanitize dữ liệu để tránh injection

---

## 13. Nguyên tắc tổng quát

* Response phải nhất quán
* Không trả về dữ liệu nhạy cảm (password, token)
* API phải dễ đọc, dễ đoán
* Luôn validate dữ liệu trước khi xử lý
