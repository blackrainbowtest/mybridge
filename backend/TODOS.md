## 1. Add sockets (real Live Chat)

Currently, chat works via REST → the frontend should do polling.
If you want a live chat, like Discord:

socket.io

roomJoin / roomMessage events

"New message" notifications

Real-time reactions

It fits perfectly with the current structure.

Done: 0% (not implemented)
Difficulty: Medium

## 2. Password reset

I currently have a login and registration, but:

forgotten password

password change

email confirmation

This is not available.

You can do this:

POST /auth/forgot

POST /auth/reset/:token

Completion: 0%
Difficulty: Low

## 3. Rate limiting protection (important for public access)

Protection against:

Brute force

DDOS via auth

Via express-rate-limit.

Readiness: 0%
Difficulty: Low

## 4. Permissions middleware (role-based access)

We partially implement checks in controllers, but it would be better to add:

roleRequired("OWNER")
roleRequired("STUDENT")

to match production.

Done: 70%
Difficulty: Low

## 5. Separating configs (prod/dev)

We currently have .env, but:

.env.production

.env.development

We can do better.

Complete: 50%

## 6. Sanitize / Validate all incoming data

We didn't:

Joi / Zod / Yup

XSS sanitization

SQL injection protection (Prisma is protected, but fields still need to be validated)

Useful.

Done: 0%

## 7. API Logs + Requests Monitoring

To see:

who visited where

speed

what dropped

Via:

morgan

own logger

Sentry (later)

Readiness: 0%

## 8. Automated tests (Jest / supertest)

There are currently no tests.

Auth tests

Project tests

Chat tests

Done: 0%

## 9. Swagger/OpenAPI (auto-generated documentation)

/docs

and see the Swagger UI.

Complete: 10%

## 10. Pagination (pages)

For:

Projects

Applications

Chat messages

Completion: 0%

## 11. Improve the Upload system

message attachments (pdf/doc/etc.)

size limit

mime-check

folders by category (/uploads/chat/, /uploads/avatar/)

Completion: 70%

## 12. Notifications API

For example:

"You have received a new request"

"Your message has been read"

"Your request has been accepted"

You can create a Notifications table and a /notifications endpoint.

Readiness: 0%

## 13. Admin Panel (roles ADMIN, BAN, MUTE, DELETE PROJECTS)

admin panel with the ability to:

ban users

delete messages

delete projects

view statistics

Completion: 0%