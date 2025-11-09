**Instruction Guide: Express.js Backend Implementation**

Copied from foodorder-api project.

---

**1. Further Setup**

- Install additional package for JWT: `jsonwebtoken`
- Added "ADMIN" user in db with passwd `admin123`. No explicit ADMIN registration.
  - `INSERT INTO users VALUES(default, 'Admin', 'admin@gmail.com', '$2a$10$3PcrXbU/1Y8ISJi49ucWyOB0RZje1X/KvJAEC5UVWOtXExBKrUMA2', '1234567890');`

---

**2. JWT & Auth Middleware**

- Modify `/users/authenticate` route to generate JWT token.
- Implement and register authentication middleware. Note: "role" is assigned to current user based on his email (for simplicity).

---

**3. Modify routes**

- Update users routes
  - Authentication returns JWT (alreay implemented)
  - Allow user to change own password.
  - Allow user to update own profile.
  - Allow user to delete own account.
  - No change in registration process.
- Update foods authorization
  - GET `/foods/*` allowed for all authenticated users.
  - POST, PUT, DELETE `/foods/*` allowed only for ADMIN.
- Update orders routes
  - User can access his own orders. Admin can access all orders.
  - User can place order for himself.
  - User can cancel his own order. Admin can change status of any order.

---

Follow each step, write code matching the commit sequence, and test as you go.  
Use middleware, validation, and modular code organization for best results.  
Refer to sample commits for actual logic and structure.
