# 📑 Court & TimeSlot API Design (FULL CRUD)

## 1. Overview
This document describes the full CRUD API design and processing flow for managed Badminton Courts and their corresponding Time Slots.

---

## 2. Court APIs (`/api/v1/courts`)

### 2.1. List Courts (R)
- **Method**: `GET /api/v1/courts`
- **Controller**: `CourtController.getCourts`
- **Validation**:
  - `page`: Number, min 1, default 1
  - `limit`: Number, min 1, max 100, default 10
  - `isMaintenance`: Boolean (Filter)
- **Response**: `200 OK` (with pagination metadata)

### 2.2. Get Court Detail (R)
- **Method**: `GET /api/v1/courts/:id`
- **Validation**: `:id` must be valid ObjectId.
- **Flow**: Throws `404 Not Found` if not exists.
- **Response**: `200 OK`

### 2.3. Create Court (C - Admin)
- **Method**: `POST /api/v1/courts`
- **Validation**:
  - `courtName`: Required, String.
  - `description`: Optional, String.
  - `images`: Optional, Array of Strings.
- **Response**: `201 Created`

### 2.4. Update Court (U - Admin)
- **Method**: `PUT /api/v1/courts/:id`
- **Validation**: Same as Create but fields are optional if it's a partial update (PATCH) or all provided if PUT. Use `PUT` for full update.
- **Response**: `200 OK`

### 2.5. Toggle Maintenance (U - Admin)
- **Method**: `PATCH /api/v1/courts/:id/maintenance`
- **Validation**: `isMaintenance`: Required, Boolean.
- **Response**: `200 OK`

### 2.6. Delete Court (D - Admin)
- **Method**: `DELETE /api/v1/courts/:id`
- **Flow**: Implementation uses Soft Delete (update `status` or a delete flag).
- **Response**: `200 OK` (message: "Deleted successfully")

---

## 3. TimeSlot APIs (`/api/v1/time-slots`)

### 3.1. List TimeSlots (R)
- **Method**: `GET /api/v1/time-slots`
- **Response**: `200 OK`

### 3.2. Get TimeSlot Detail (R)
- **Method**: `GET /api/v1/time-slots/:id`
- **Response**: `200 OK` / `404 Not Found`

### 3.3. Create TimeSlot (C - Admin)
- **Method**: `POST /api/v1/time-slots`
- **Validation**:
  - `startTime`: Required, String "HH:mm".
  - `endTime`: Required, String "HH:mm".
  - `price`: Required, Number >= 0.
- **Guard**: Ensure `endTime` > `startTime` and no overlaps.
- **Response**: `201 Created`

### 3.4. Update TimeSlot (U - Admin)
- **Method**: `PUT /api/v1/time-slots/:id`
- **Validation**: All fields provided.
- **Response**: `200 OK`

### 3.5. Delete TimeSlot (D - Admin)
- **Method**: `DELETE /api/v1/time-slots/:id`
- **Response**: `200 OK`

---

## 4. Status Request & Error Handling

| Status Code | Description | Usage |
|-------------|-------------|-------|
| `200 OK` | Success | GET, PUT, PATCH successful |
| `201 Created` | Created | POST successful |
| `400 Bad Request` | Validation Error | Missing fields, wrong format, logic overlap |
| `401 Unauthorized` | Not Authenticated | Missing or invalid Token |
| `403 Forbidden` | Not Authorized | Non-admin trying to modify data |
| `404 Not Found` | Not Found | Resource does not exist |
| `500 Server Error` | System Error | Unexpected error |

## 5. Standard Response Format
```json
{
  "success": true,
  "message": "Success message",
  "data": { ... },
  "error": null
}
```
