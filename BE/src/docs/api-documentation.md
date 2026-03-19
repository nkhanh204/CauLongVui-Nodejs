# Full API Specification - CauLongVui

**Base URL**: `http://localhost:5000/api/v1`

---

## 1. Authentication Module (`/auth`)

### 1.1. User Registration
- **URL**: `POST /auth/register`
- **Logic**: Create a new user account.
- **Request Body**:
```json
{
  "phoneNumber": "0901234567",
  "password": "password123",
  "fullName": "Nguyen Van A"
}
```

### 1.2. User Login
- **URL**: `POST /auth/login`
- **Logic**: Authenticate user and return Access/Refresh tokens.
- **Request Body**:
```json
{
  "phoneNumber": "0901234567",
  "password": "password123"
}
```

### 1.3. User Logout
- **URL**: `POST /auth/logout`
- **Logic**: Invalidate current session tokens.

---

## 2. User Module (`/users`)

### 2.1. List Users
- **URL**: `GET /users`
- **Logic**: Fetch all users with pagination.
- **Query Params**: `?page=1&limit=10`

### 2.2. Get User Detail
- **URL**: `GET /users/:id`
- **Logic**: Retrieve specific user information.

### 2.3. Create User (Admin)
- **URL**: `POST /users`
- **Logic**: Manually create a user.
- **Request Body**:
```json
{
  "phoneNumber": "0988776655",
  "password": "password123",
  "fullName": "Tran Thi B",
  "roleId": "65f..." 
}
```

### 2.4. Update User
- **URL**: `PUT /users/:id`
- **Logic**: Update user profile or status.
- **Request Body**:
```json
{
  "fullName": "Tran Thi Updated",
  "status": "active"
}
```

### 2.5. Delete User
- **URL**: `DELETE /users/:id`
- **Logic**: Soft delete user (updates `status` to `deleted`).

---

## 3. Court Module (`/courts`)

### 3.1. List Courts
- **URL**: `GET /courts`
- **Logic**: List all badminton courts.

### 3.2. Get Court Detail
- **URL**: `GET /courts/:id`

### 3.3. Create Court
- **URL**: `POST /courts`
- **Method**: `POST`
- **Type**: `multipart/form-data`
- **Fields**:
    - `courtName`: (String) e.g., "Sân A1"
    - `description`: (String) e.g., "Sân thảm mới"
    - `images`: (File) Select multiple files
- **Success Response (201)**:
```json
{
  "success": true,
  "message": "Create court success",
  "data": {
    "id": "65f...",
    "courtName": "Sân A1",
    "imageUrl": "/uploads/images/defaul.png",
    "images": [
      "/uploads/images/file1.jpg",
      "/uploads/images/file2.jpg"
    ]
  }
}
```

### 1.2. Update Court
- **URL**: `PUT /courts/:id`
- **Method**: `PUT`
- **Type**: `multipart/form-data`
- **Fields**: Same as Create. If no files are sent, `images` remains unchanged or falls back to default.

---

## 2. User Module (Avatar & Fallback)

### 2.1. Get User Profile
- **URL**: `GET /users/:id`
- **Sample Response (with Fallback)**:
```json
{
  "courtId": "65f...",
  "startTime": "08:00",
  "endTime": "09:00",
  "price": 60000
}
```

### 4.3. Update Slot
- **URL**: `PUT /time-slots/:id`
- **Request Body**:
```json
{
  "startTime": "08:30",
  "endTime": "09:30",
  "price": 70000
}
```

### 4.4. Delete Slot
- **URL**: `DELETE /time-slots/:id`

---

## 5. Booking Module (`/bookings`)

### 5.1. Create Booking
- **URL**: `POST /bookings`
- **Request Body**:
```json
{
  "courtId": "65f...",
  "slotId": "65f...",
  "bookingDate": "2026-03-25",
  "voucherId": null
}
```

### 5.2. Update Booking Info
- **URL**: `PUT /bookings/:id`
- **Logic**: Change core booking details (date/slot).
- **Request Body**:
```json
{
  "bookingDate": "2026-03-26",
  "slotId": "65f..."
}
```

### 5.3. Update Status
- **URL**: `PATCH /bookings/:id/status`
- **Request Body**:
```json
{
  "status": "Cancelled"
}
```

---

## 6. Payment Module (`/payments`)

### 6.1. Initialize Payment
- **URL**: `POST /payments`
- **Request Body**:
```json
{
  "bookingId": "65f...",
  "amount": 120000,
  "paymentMethod": "VNPay"
}
```

### 6.2. Update Payment Status
- **URL**: `PATCH /payments/:id/status`
- **Request Body**:
```json
{
  "status": "Success",
  "transactionId": "TX123456"
}
```

---

## 7. Voucher Module (`/vouchers`)

### 7.1. Create Voucher
- **URL**: `POST /vouchers`
- **Request Body**:
```json
{
  "code": "KM20K",
  "discountValue": 20000,
  "minSpend": 100000,
  "expiryDate": "2026-05-30"
}
```

### 7.2. Update Voucher
- **URL**: `PUT /vouchers/:id`
- **Request Body**:
```json
{
  "discountValue": 25000,
  "minSpend": 120000
}
```

---

## 8. Review Module (`/reviews`)

### 8.1. Post Review
- **URL**: `POST /reviews`
- **Request Body**:
```json
{
  "courtId": "65f...",
  "bookingId": "65f...",
  "rating": 5,
  "comment": "Sân tuyệt vời"
}
```

### 8.2. Update Review
- **URL**: `PUT /reviews/:id`
- **Request Body**:
```json
{
  "rating": 4,
  "comment": "Tốt nhưng hơi nóng"
}
```

### 8.3. Get Reviews by Court
- **URL**: `GET /reviews/court/:courtId`

---

## 9. File Management (`/files`)

### 9.1. Upload Images
- **URL**: `POST /files/images` (Form-Data: `images`)

### 9.2. Upload Avatar
- **URL**: `POST /files/avatar` (Form-Data: `avatar`)

---

## 11. Realtime Events (Socket.io)

### Client to Server
| Event | Payload | Description |
|-------|---------|-------------|
| `join_court` | `{ "courtId": "..." }` | Join a room for a specific court |
| `slot:hold` | `{ "courtId": "...", "slotId": "...", "bookingDate": "..." }` | Temporarily "lock" a slot for selection |
| `slot:unhold` | `{ "courtId": "...", "slotId": "...", "bookingDate": "..." }` | Release a temporarily "locked" slot |

### Server to Client
| Event | Payload | Description |
|-------|---------|-------------|
| `slot:holding` | `{ "slotId": "...", "bookingDate": "...", "userId": "..." }` | Broadcasted when a user holds a slot |
| `slot:released`| `{ "slotId": "...", "bookingDate": "...", "reason": "..." }` | Broadcasted on unhold, cancellation, or timeout (10m) |
| `slot:confirmed`| `{ "slotId": "...", "bookingDate": "..." }` | Broadcasted when payment succeeds (Slot closed) |
| `slot:booked`  | `{ "slotId": "...", "bookingDate": "..." }` | Broadcasted when a booking is created (Pending) |

---

## 12. Standard Response Structure
```json
{
  "success": true,
  "message": "Operation description",
  "data": { ... }
}
```
