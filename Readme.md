## 📦 Cài đặt & Chạy dịch vụ

### 1️⃣ Clone repository

```sh
git clone https://github.com/dqh999/code-xec
cd backend/execution-service
```

### 2️⃣ Xây dựng Docker container

```sh
docker build -t code-executor .
docker run -d --name code-exec-container code-executor
```

### 3️⃣ Chạy backend

```sh
go run main.go
```

Backend sẽ chạy tại `http://localhost:8080`