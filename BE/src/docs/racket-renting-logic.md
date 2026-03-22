# Nghiệp vụ & Thiết kế CSDL: Cho Thuê Vợt (Racket Renting Logic)

Tài liệu này mô tả logic thiết kế cho tính năng "Cho Thuê Vợt". Do đặc thù của việc cho thuê là sản phẩm (vợt) có số lượng tồn kho (bị trừ đi khi khách lấy) và cần được hoàn trả (được cộng lại khi khách trả), bảng `Product` và `FoodOrder` cần được mở rộng.

## 1. Cập nhật Model

### 1.1 Model `Product`
- **Mở rộng `type`**: Thêm giá trị `Equipment` vào định dạng enum.
  - Hiện tại: `['Food', 'Drink']`
  - Mới: `['Food', 'Drink', 'Equipment']`
- **Quản lý đa dạng chủng loại**: Thay vì lưu 1 vợt duy nhất, mỗi loại vợt (Yonex, Lining, Vợt tập,...) sẽ được tạo lập như một sản phẩm riêng biệt trong bảng `Product` với `type = 'Equipment'`. Nhờ đó, việc thiết lập giá thuê và tổng số lượng tồn kho của từng dòng vợt hoàn toàn độc lập với nhau.

### 1.2 Model `FoodOrder` (hoặc đổi tên thành `Order` chung)
Model hóa đơn hiện tại chịu trách nhiệm ghi nhận các SP khách hàng mua/thuê tại sân. Bổ sung các field cần thiết để quản lý riêng biệt đồ bán đứt và đồ bắt buộc hoàn trả (như vợt).

```javascript
items: [{
  productId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: { 
    type: Number, 
    required: true,
    min: 1
  }, // Số lượng mua đứt HOẶC số lượng đem đi thuê
  unitPrice: { 
    type: Number, 
    required: true,
    min: 0
  },
  
  // --- CÁC FIELD MỚI CHO LOGIC THUÊ THIẾT BỊ ---
  isRent: { 
    type: Boolean, 
    default: false 
  }, // Cờ xác định item này là đồ cho thuê, phải hoàn trả
  returnedQuantity: { 
    type: Number, 
    default: 0, 
    min: 0 
  } // Track số lượng khách đã tiến hành hoàn trả cho nhân viên
}]
```

## 2. Luồng nghiệp vụ (Business Workflow)

### 2.1 Hiển thị và Lấy danh sách thiết bị cho thuê riêng biệt
- **Mục đích**: Vì khách hàng có thể có sẵn vợt (tính năng thuê là tuỳ chọn), danh sách vợt cần được hiển thị ở một Khu Vực/Menu riêng rẽ so với nước giải khát (Food/Drink là thiết yếu).
- **API**: `GET /api/v1/products?type=Equipment&status=Active`
- **Tối ưu hóa**: Model `Product` hiện tại đã được đánh index `productSchema.index({ status: 1, type: 1 });`, nên việc filter riêng phần "Cho Thuê Vợt" này là vô cùng nhanh và tối ưu. Front-end chỉ việc gọi API này để đổ dữ liệu ra giao diện Thuê Thiết Bị.

### 2.2 Tạo hóa đơn (Bao gồm Thuê Vợt & Mua Nước/Đồ ăn)
1. **API**: `POST /api/v1/food-orders`
2. **Logic Service**:
   - Nhận mảng `items` gồm `{ productId, quantity }`. Query database tìm kiếm thông tin `Product`.
   - **Validation Cốt lõi**: Kiểm tra `stockQuantity` (số lượng trong kho) của mỗi sản phẩm có đủ đáp ứng tĩnh `quantity` yêu cầu trong đơn hàng không.
   - Khi tạo array lưu DB, nếu `Product.type === 'Equipment'`, tự động gán `isRent = true` trong mảng items của hóa đơn.
   - Tạo hóa đơn, tính `totalAmount`.
   - **Cập nhật tồn kho (`stockQuantity`)**: Trừ số lượng tồn kho trong model `Product` cho cả thức ăn, nước và thiết bị.

### 2.2 Hoàn trả Vợt (Return Equipment)
1. **API**: `PATCH /api/v1/orders/:id/return`
2. **Logic Service**:
   - Nhận payload gồm mảng các thiết bị muốn trả: `[{ productId, returnQuantity }]`.
   - Lấy order (`FoodOrder`) từ database theo `id`. Nếu order không tồn tại hoặc `status === 'Cancelled'`, báo lỗi `BadRequestError`.
   - Lặp qua yêu cầu trả:
     - Tìm item trong hóa đơn mang đúng `productId` và có thuộc tính `isRent === true`. Nếu không có, bỏ qua hoặc báo lỗi.
     - **Validation trả hàng**: Số lượng khách đang trả (`returnQuantity`) + Số lượng khách đã trả trước đó (`returnedQuantity` trong DB) $\le$ Số lượng khách dã thuê (`quantity`). Khách không được trả quá số lượng đã lấy.
     - Cộng dồn phần số lượng nhận lại vào `returnedQuantity`.
   - **Phục hồi tồn kho (`stockQuantity`)**: Tăng số lượng trong model `Product` tương ứng với số `returnQuantity`.
   - Lưu lại `FoodOrder` và `Product`. (Khuyến nghị sử dụng MongoDB Transaction để đảm bảo tính Acid).

## 3. Các quy tắc phát triển (Tham chiếu CODING\_CONVENTIONS.md)
- **Data Validation Layer**: Ràng buộc dữ liệu từ mảng `items` gửi lên ở Route thông qua Joi/Zod nằm tại thư mục `validations/`. Middleware validate sẽ bắt lỗi nếu Front-end truyền dữ liệu sai.
- **Service Layering Principle**: Việc xử lý tạo order và cập nhật hoàn trả phải được đặt gọn trong thư mục `services/`. `food-order.service` không trực tiếp `findByIdAndUpdate` lên `Product` mà nên import `product.service` hoặc chia sẻ một transaction.
- **Lỗi & Response chuẩn hóa**: Trả về đúng format `{ success, message, data, error }`. Quăng các ngoại lệ như `NotFoundError` hay `BadRequestError` nếu tìm không thấy order/sản phẩm hoặc logic sai. Không xử lý Response trực tiếp trong Service.
