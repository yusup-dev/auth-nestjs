
# **NestJS Authentication API**

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Proyek ini adalah implementasi REST API untuk autentikasi pengguna menggunakan **NestJS**, **Prisma**, dan **Docker**. API ini menyediakan endpoint untuk registrasi dan login pengguna dengan keamanan yang kuat.

---

## **Fitur Utama**
- **Registrasi Pengguna**: Endpoint untuk membuat akun pengguna baru.
- **Autentikasi Pengguna**: Endpoint untuk login dan menghasilkan JWT.
- **Validasi Email Unik**: Memastikan email yang digunakan belum terdaftar.
- **Dokumentasi API**: Dokumentasi Swagger yang interaktif.
- **Health Check**: Endpoint untuk memeriksa status aplikasi.
- **Rate Limiting**: Melindungi aplikasi dari abuse dengan membatasi jumlah request.

---

## **Teknologi yang Digunakan**
- **Backend**: NestJS (TypeScript)
- **ORM**: Prisma
- **Containerization**: Docker & Docker Compose
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger/OpenAPI
- **Password Hashing**: bcrypt

---

## **Struktur Proyek**
```
project-root/
├── dist/                      # Folder untuk file yang di-build
├── node_modules/              # Dependencies
├── prisma/                    # Prisma schema dan migrasi
├── src/                       # Source code
│   ├── auth/                  # Modul untuk autentikasi
│   ├── common/                # Kode umum yang digunakan di seluruh aplikasi
│   ├── health/                # Modul untuk health check
│   ├── prisma/                # Prisma-related files
│   ├── app.module.ts          # Root module
│   ├── main.ts                # Entry point aplikasi
│   ├── swagger.ts             # Konfigurasi Swagger
├── test/                      # Unit dan integration tests
├── .dockerignore              # Ignore file for Docker
├── .env                       # Environment variables
├── .gitignore                 # Ignore file for Git
├── .prettierrc                # Konfigurasi Prettier
├── docker-compose.yml         # Docker Compose configuration
├── Dockerfile                 # Dockerfile untuk aplikasi
├── eslint.config.mjs          # Konfigurasi ESLint
├── nest-cli.json              # Konfigurasi NestJS CLI
├── package-lock.json          # Lock file untuk dependencies
├── package.json               # Dependencies and scripts
├── README.md                  # Project documentation
├── tsconfig.build.json        # Konfigurasi TypeScript untuk build
├── tsconfig.build.tsbuildinfo # Build info
├── tsconfig.json              # Konfigurasi TypeScript
├── tsconfig.tsbuildinfo       # Build info
```

---

## **Panduan Pengaturan**

### **Prasyarat**
- Docker dan Docker Compose terinstal.
- Node.js (v16 atau lebih baru).

---

### **Langkah 1: Clone Repository**
```bash
git clone https://github.com/yusup-dev/auth-nestjs.git
cd auth-nestjs
```

---

### **Langkah 2: Install Dependencies**
```bash
npm install
```

---

### **Langkah 3: Setup Environment Variables**
Buat file `.env` di root proyek dan tambahkan variabel berikut:
```env
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="Password123"
POSTGRES_DB="auth-db"
JWT_SECRET=51310a557a282c0790012c55dbefce096a920da69ec22e6ea2fe18b7557a3a9762eeb1230738dd5664b7fb76d8473ba07454098adb2bbb8a41c7534bd6f0c103
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public"
```

---

### **Langkah 4: Jalankan dengan Docker Compose**
```bash
docker-compose up --build   
```
Ini akan menjalankan:
- Aplikasi NestJS di port `3000`.
- PostgreSQL database di port `5432`.

---

### **Langkah 5: Jalankan Migrasi Prisma**
Setelah container berjalan, jalankan migrasi Prisma:
```bash
docker-compose exec app npx prisma migrate dev --name init
```

---

### **Langkah 6: Akses Aplikasi**
- Aplikasi: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api`

---

## **Dokumentasi API**

### **Base URL**
```
http://localhost:3000
```

### **Endpoints**

#### **1. Registrasi Pengguna**
- **Method**: `POST`
- **URL**: `/auth/register`
- **Request Body**:
  ```json
  {
    "username": "string2",
    "email": "string2@gmail.com",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### **2. Login Pengguna**
- **Method**: `POST`
- **URL**: `/auth/login`
- **Request Body**:
  ```json
  {
    "email": "string2@gmail.com",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successfully",
    "user": {
        "id": "f1cb8cfb-75c5-436c-8beb-585cf1a2e81b",
        "username": "string2",
        "email": "string2@gmail.com"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZzJAZ21haW      wuY29tIiwic3ViIjoiZjFjYjhjZmItNzVjNS00MzZjLThiZWItNTg1Y2YxYTJlODFiIiwiaWF0IjoxNzM4N      Dk4ODQ1LCJleHAiOjE3Mzg1MDI0NDV9.dWJEKEkPaf4gz2PXBSDC2k3eRQdK3vVKAGMATlxpIZQ"
  }
  ```

#### **3. Health Check**
- **Method**: `GET`
- **URL**: `/health`
- **Response**:
  ```json
  {
    "status": "ok",
    "info": {},
    "error": {},
    "details": {}
  }
  
  ```

#### **4. Rate Limit**
  - **Response**:
    ```json
    {
      "statusCode": 429,
      "message": "ThrottlerException: Too Many Requests",
      "timestamp": "2025-02-02T12:56:37.077Z",
      "path": "/health"
    }
    ```

---

## **Konfigurasi Docker**

### **Dockerfile**
```dockerfile
FROM node:20-alpine as builder

ENV NODE_ENV=build

USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .

RUN npx prisma generate \
    && npm run build \
    && ls -l ./dist \
    && npm prune --omit=dev

FROM node:20-alpine

ENV NODE_ENV=production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

CMD ["node", "dist/main.js"]
```

### **docker-compose.yml**
```yaml
version: '3.5'

services:
  postgres:
    image: postgres:13
    restart: always
    env_file:
      - .env
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - '5432:5432'
    networks:
      - app-network

  app:
    build: .
    restart: always
    env_file:
      - .env
    environment:
      DATABASE_URL: ${DATABASE_URL}
      JWT_SECRET: ${JWT_SECRET}
      PORT: ${PORT}
    ports:
      - '3000:3000'
    depends_on:
      - postgres
    volumes:
      - ./src:/app/src
    networks:
      - app-network

  pgadmin:
    image: dpage/pgadmin4
    restart: always
    container_name: nest-pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@admin.com
      - PGADMIN_DEFAULT_PASSWORD=pgadmin4
    ports:
      - '5050:80'
    depends_on:
      - postgres
    networks:
      - app-network

volumes:
  postgres-data:

networks:
  app-network:
    driver: bridge
```

---

## **Environment Variables**
| Variable         | Description                          | Example Value                     |
|------------------|--------------------------------------|-----------------------------------|
| `POSTGRES_USER`           | Username database postgresql                 | `postgres`                            |
| `POSTGRES_PASSWORD`           | Password database postgresql                | `Password123`                            |
| `POSTGRES_DB`           | Nama database postgresql                 | `auth-db`                            |
| `JWT_SECRET`     | Secret key untuk JWT signing         | `51310a557a282c0790012c55dbefce096a920da69ec22e6ea2fe18b7557a3a9762eeb1230738dd5664b7fb76d8473ba07454098adb2bbb8a41c7534bd6f0c103`             |
| `DATABASE_URL`   | URL untuk koneksi database PostgreSQL | `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public` |

---

## **Development vs Production**
- **Development**:
  - Gunakan `npm run start:dev` untuk hot-reload.
  - Jalankan migrasi Prisma dengan `npx prisma migrate dev`.
- **Production**:
  - Gunakan `npm run start:prod` untuk menjalankan aplikasi yang sudah di-build.
  - Pastikan environment variables diatur dengan benar.

---
