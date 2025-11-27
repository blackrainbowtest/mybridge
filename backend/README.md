npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev

after any changes in schema.prisma need run migratge + comment
npx prisma migrate dev --name add_refresh_tokens

STUDENT

GET /profile/student/:id

PATCH /profile/student/:id

OWNER

GET /profile/owner/:id

PATCH /profile/owner/:id

Both protected authRequired.