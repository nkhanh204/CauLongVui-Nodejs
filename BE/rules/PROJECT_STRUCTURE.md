# Cấu trúc thư mục dự án

```text
BE/
├── uploads/                # 🔥 ngoài src
│    ├── images/
│    ├── avatars/
│    └── temp/
├── src/
│
│    ├── config/                    # cấu hình hệ thống
│    │    ├── db.js
│    │    ├── env.js
│    │    ├── cloudinary.js
│    │    ├── momo.js
│    │    └── vnpay.js
│
│    ├── controllers/              #  nhận request
│    │    ├── auth.controller.js
│    │    ├── user.controller.js
│    │    ├── court.controller.js
│    │    ├── booking.controller.js
│    │    ├── payment.controller.js
│    │    └── voucher.controller.js
│
│    ├── services/                 #  business logic
│    │    ├── auth.service.js
│    │    ├── user.service.js
│    │    ├── court.service.js
│    │    ├── booking.service.js
│    │    ├── payment.service.js
│    │    ├── voucher.service.js
│    │
│    │    └── external/            #  tích hợp bên thứ 3
│    │         ├── momo.service.js
│    │         ├── vnpay.service.js
│    │         └── cloudinary.service.js
│
│    ├── models/                   #  mongoose schema
│    │    ├── user.model.js
│    │    ├── court.model.js
│    │    ├── booking.model.js
│    │    ├── payment.model.js
│    │    └── voucher.model.js
│
│    ├── validations/              #  validate input
│    │    ├── auth.validation.js
│    │    ├── user.validation.js
│    │    ├── booking.validation.js
│    │    └── voucher.validation.js
│
│    ├── dtos/                     #  format response
│    │    ├── user.dto.js
│    │    ├── booking.dto.js
│    │    └── voucher.dto.js
│
│    ├── middlewares/              #  middleware
│    │    ├── auth.middleware.js
│    │    ├── role.middleware.js
│    │    ├── error.middleware.js
│    │    ├── validate.middleware.js   #  NEW
│    │    └── upload.middleware.js
│
│
│    ├── utils/                    #  helper
│    │    ├── formatMoney.js
│    │    ├── date.js
│    │    ├── generateCode.js
│    │    ├── logger.js
│    │    └── response.js          #  NEW (format API response)
│
│    └── uploads/
│
│    ├── constants/                #  hằng số
│    │    ├── roles.js
│    │    ├── status.js
│    │    └── payment.js
│
│    ├── exceptions/               #  xử lý lỗi chuẩn
│    │    ├── ApiError.js
│    │    ├── BadRequestError.js   #  NEW
│    │    ├── NotFoundError.js     #  NEW
│    │    ├── UnauthorizedError.js #  NEW
│    │    └── errorCodes.js
│
│    ├── routes/                   #  route tổng
│    │    ├── auth.route.js
│    │    ├── user.route.js
│    │    ├── booking.route.js
│    │    ├── court.route.js
│    │    ├── payment.route.js
│    │    ├── voucher.route.js
│    │    └── index.js
│
│    ├── docs/                     #  API docs (optional nhưng nên có)
│    │    └── swagger.js
│
│    ├── jobs/                     # cron job (optional)
│    │    ├── cleanupBooking.job.js
│    │    └── reminder.job.js
│
│    ├── app.js                    # setup express
│    └── server.js                 # start server
│
├── tests/                         #  testing
│    ├── unit/
│    └── integration/
│
├── .env
├── .gitignore
├── package.json
└── README.md