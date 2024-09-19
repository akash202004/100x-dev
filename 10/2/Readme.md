1. npm init -y
2. npm install prisma typescript ts-node @types/node --save-dev
3. npx tsc --init
   Change `rootDit` to `src`
   Change `outDir` to `dist`
4. npx prisma init
5. npx prisma migrate dev --name Initialize the schema
6. npx prisma generate
7. import { PrismaClient } from "@prisma/client";
   const prisma = new PrismaClient();
