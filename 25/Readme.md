# 🧪 Integration Testing in an Express + Prisma App

## 📌 Why Integration Tests?

While unit tests are great as they mock out a lot of external services (like DB, cache, message queues, etc.) to test functionality in isolation, **integration tests** focus on testing how all integrated components work together.

This means:
- You have to start all auxiliary services before running your tests.
- You **do not** mock out any external service calls.

### ❗ Downsides of Integration Tests:
- Slower to execute.
- Adds complexity.
- Requires a complete local development setup (e.g., Docker, databases).

---

## ⚙️ Prerequisites of Writing Integration Tests

Before we write an integration test, we should have:
- A script that starts the required external services.
- Data seeding mechanisms.
- A script to tear down services when tests pass/fail.

---

## 🚀 Setting Up an Express + Prisma App

### 1. Initialize Project

```bash
npm init -y
npx tsc --init
```

Update `tsconfig.json`:

```json
"rootDir": "src",
"outDir": "dist"
```

### 2. Install Dependencies

```bash
npm i express @types/express prisma
```

### 3. Initialize Prisma

```bash
npx prisma init
```

### 4. Update Prisma Schema

```prisma
model Request {
  id      Int   @id @default(autoincrement())
  a       Int
  b       Int
  answer  Int
  type    Type
}

enum Type {
  ADD
  MUL
}
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

---

## 🧱 Project Structure

### `src/db.ts`

```ts
import { PrismaClient } from "@prisma/client";
export const prismaClient = new PrismaClient();
```

### `src/index.ts`

```ts
import express from "express";
import { prismaClient } from "./db";

export const app = express();
app.use(express.json());

app.post("/sum", async (req, res) => {
  const a = req.body.a;
  const b = req.body.b;

  if (a > 1000000 || b > 1000000) {
    return res.status(422).json({
      message: "Sorry we dont support big numbers"
    });
  }

  const result = a + b;

  const request = await prismaClient.request.create({
    data: {
      a,
      b,
      answer: result,
      type: "ADD"
    }
  });

  res.json({ answer: result, id: request.id });
});
```

### `src/bin.ts`

```ts
import { app } from "./index";
app.listen(3000);
```

---

## 🧪 Testing the API Locally

### Compile & Run

```bash
tsc -b
node dist/bin.js
```

> ❗ The request might fail if the database is not running.

---

## 🐘 Start PostgreSQL via Docker

```bash
docker run -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

Update `.env`:

```
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
```

Run Migration:

```bash
npx prisma migrate dev
npx prisma generate
```

Test with Postman and check DB via:

```bash
npx prisma studio
```

> ✅ You’ve manually done an integration test! Now let’s automate.

---

## ⚡ Automate Integration Tests with Vitest

### 1. Install Vitest

```bash
npm i vitest
```

### 2. Create Docker Compose File

**`docker-compose.yml`**:

```yml
version: '3.8'
services:
  db:
    image: postgres
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=mysecretpassword
    ports:
      - '5432:5432'
```

### 3. Reset Database Before Each Test

**`src/tests/helpers/reset-db.ts`**

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async () => {
  await prisma.$transaction([
    prisma.request.deleteMany(),
  ]);
};
```

---

## 🔁 Setup Integration Script

### 1. Create `scripts/run-integration.sh`

```bash
#!/bin/bash

docker-compose up -d

echo '🟡 - Waiting for database to be ready...'
./scripts/wait-for-it.sh localhost:5432 -- echo '🟢 - Database is ready!'

npx prisma migrate dev --name init
npm run test

docker-compose down
```

### 2. Download `wait-for-it.sh`

```bash
curl https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -o scripts/wait-for-it.sh
```

### 3. Make Scripts Executable

```bash
chmod +x scripts/*
```

> 💡 On macOS:
```bash
brew install coreutils && alias timeout=gtimeout
```

---

## 🧪 Write Your First Integration Test

### 1. Install Supertest

```bash
npm i -D supertest @types/supertest
```

### 2. Create Test File

**`src/tests/sum.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import { app } from "..";
import request from "supertest";

describe("POST /sum", () => {
  it("should add 2 numbers", async () => {
    const { status, body } = await request(app).post('/sum').send({
      a: 1,
      b: 2
    });

    expect(status).toBe(200);
    expect(body).toEqual({ answer: 3, id: expect.any(Number) });
  });
});
```

---

## 🔧 Update `package.json` Scripts

```json
"scripts": {
  "test": "vitest",
  "test:integration": "./scripts/run-integration.sh"
}
```

---

## ✅ Run Integration Test

```bash
npm run test:integration
```

---

# Integration & End-to-End Testing Guide

This repo demonstrates how to implement integration and E2E (end-to-end) testing using **Vitest**, **Supertest**, and **Cypress**, along with setting up a CI/CD pipeline using **GitHub Actions**.


## 🧪 Integration Testing with Vitest + Supertest

### `beforeEach` - Run Before Every Test

If you want to clear the DB before **every test case**, use the `beforeEach` function.


```ts
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "..";
import request from "supertest";
import resetDb from "./helpers/reset-db";

describe("POST /sum", () => {
  beforeEach(async () => {
    console.log("clearing db");
    await resetDb();
  });

  it("should add 2 numbers", async () => {
    const { status, body } = await request(app).post('/sum').send({ a: 1, b: 2 });
    expect(status).toBe(200);
    expect(body).toEqual({ answer: 3, id: expect.any(Number) });
  });

  it("should add 2 negative numbers", async () => {
    const { status, body } = await request(app).post('/sum').send({ a: -1, b: -2 });
    expect(status).toBe(200);
    expect(body).toEqual({ answer: -3, id: expect.any(Number) });
  });
});
```

![img](./images/1.webp)

---

### `beforeAll` - Run Once Before All Tests

If you want to clear the DB **once before all tests**, use the `beforeAll` function.

```ts
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "..";
import request from "supertest";
import resetDb from "./helpers/reset-db";

describe("POST /sum", () => {
  beforeAll(async () => {
    console.log("clearing db");
    await resetDb();
  });

  it("should add 2 numbers", async () => {
    const { status, body } = await request(app).post('/sum').send({ a: 1, b: 2 });
    expect(status).toBe(200);
    expect(body).toEqual({ answer: 3, id: expect.any(Number) });
  });

  it("should add 2 negative numbers", async () => {
    const { status, body } = await request(app).post('/sum').send({ a: -1, b: -2 });
    expect(status).toBe(200);
    expect(body).toEqual({ answer: -3, id: expect.any(Number) });
  });
});
```
![img](./images/2.webp)

---

## ⚙️ CI/CD Pipeline with GitHub Actions

### ✅ Add `.env.example`

```env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
```

### ✅ Add `.github/workflows/test.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Set up Docker Compose
        uses: docker/setup-qemu-action@v2

      - name: Ensure Docker Compose is available
        run: docker-compose version

      - name: Copy .env.example to .env
        run: cp ./1-integration-test/.env.example ./1-integration-test/.env

      - name: Run integration script
        run: cd 1-integration-test && npm run test:integration
```

📁 Final Code Repo: [week-25-integ-e2e-tests](https://github.com/100xdevs-cohort-2/week-25-integ-e2e-tests)

---

## 🧪 End-to-End Tests with Cypress

### 💡 Why?

Until now, we haven’t tested our frontend + backend **together**. E2E tests simulate real user behavior inside a browser.

Popular tools:
- [Cypress](https://www.cypress.io/)
- [Playwright](https://playwright.dev/)
- [Nightwatch.js](https://nightwatchjs.org/)

We'll be using **Cypress** here.

---

## 🚀 Setup Cypress Project

### 1. Init a TS Project

```bash
npm init -y
npx tsc --init
mkdir src
```

Update `tsconfig.json`:

```json
{
  "rootDir": "./src",
  "outDir": "./dist"
}
```

---

### 2. Install Cypress

> **Linux users:** [Install Cypress prerequisites](https://docs.cypress.io/guides/getting-started/installing-cypress)

```bash
npm install cypress --save-dev
npx cypress open
```

- Choose the default example.
- Delete the `2-advanced-examples` folder.
- Try running the default todo test.

```bash
npx cypress run --browser chrome --headed
```

---

### 3. Example Test for `https://app.100xdevs.com`

```ts
describe('Testing app', () => {
  beforeEach(() => {
    cy.visit('https://app.100xdevs.com');
  });

  it('is able to log in', () => {
    cy.contains('Login').should('exist');
    cy.contains('Login').click();
    cy.contains('Signin to your Account').should('exist', { timeout: 10000 });

    cy.get('#email').type('harkirat.iitr@gmail.com');
    cy.get('#password').type('123random');
    cy.get('button').eq(4).click();

    cy.contains('View Content').should("exist", { timeout: 10000 });
  });
});
```

---

## 📌 Summary

✅ Integration Testing  
✅ beforeEach vs beforeAll  
✅ CI/CD with GitHub Actions  
✅ E2E Testing with Cypress  

---