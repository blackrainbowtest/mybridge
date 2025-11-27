
# MyBridge API Documentation (v1.0)

## 1. AUTH API
Base: `/auth`

### POST /auth/register
Registers a new user.

Request:
```
{
  "email": "test@example.com",
  "password": "123456",
  "role": "STUDENT"
}
```

Response:
```
{
  "message": "Registered",
  "userId": "uuid"
}
```

### POST /auth/login
Logs user in.

Request:
```
{
  "email": "test@example.com",
  "password": "123456"
}
```

Response:
```
{
  "message": "Logged in",
  "accessToken": "jwt",
  "refreshToken": "jwt"
}
```

### POST /auth/refresh
Request:
```
{ "token": "refresh_token" }
```
Response:
```
{ "accessToken": "new_token" }
```

---

## 2. UPLOAD API
Base: `/upload`

### POST /upload/avatar
Form-data:
```
avatar: <file>
```

Response:
```
{
  "message": "Avatar uploaded",
  "url": "/uploads/img.png"
}
```

### POST /upload/logo
Same as avatar.

---

## 3. PROFILE API
Authorization required.

### GET /profile/student/:id
### PATCH /profile/student/:id
### GET /profile/owner/:id
### PATCH /profile/owner/:id

---

## 4. PROJECTS API
Base: `/projects`

### POST /projects
(owner only)

### GET /projects
List with filters.

### GET /projects/:id
### PATCH /projects/:id
### DELETE /projects/:id

---

## 5. APPLICATIONS API
Base: `/applications`

### POST /applications/apply/:projectId
(student only)

### GET /applications/project/:projectId
(owner only)

### PATCH /applications/:applicationId

---

## 6. CHAT API
Base: `/chat`

### POST /chat/create
Creates room.

### POST /chat/send
Sends message (text + attachmentUrl)

### GET /chat/rooms
User's chat rooms.

### GET /chat/room/:roomId/messages
Messages list.

### PATCH /chat/message/:messageId
Edit message.

### DELETE /chat/message/:messageId
Soft delete.

### POST /chat/message/:messageId/pin
### POST /chat/message/:messageId/unpin

### POST /chat/message/:messageId/reaction
### DELETE /chat/message/:messageId/reaction

---

Authorization header:
```
Authorization: Bearer <token>
```
