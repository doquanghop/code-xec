# 1️⃣ Sử dụng base image của Golang
FROM golang:1.24 AS builder

# 2️⃣ Thiết lập thư mục làm việc trong container
WORKDIR /app

# 3️⃣ Copy go.mod và go.sum trước để cài dependencies (tối ưu cache)
COPY go.mod go.sum ./
RUN go mod download

# 4️⃣ Copy toàn bộ mã nguồn vào container
COPY . .

# 5️⃣ Biên dịch ứng dụng Go thành binary
RUN go build -o execution-service .

# 6️⃣ Sử dụng một image nhỏ hơn để chạy binary (giảm kích thước container)
FROM debian:bookworm-slim

# 7️⃣ Thiết lập thư mục làm việc
WORKDIR /app

# 8️⃣ Copy binary từ builder sang image nhỏ gọn này
COPY --from=builder /internal/app/execution-service .

# 9️⃣ Mở cổng 8080 (hoặc cổng bạn đang dùng)
EXPOSE 8080

# 🔟 Chạy ứng dụng
CMD ["./execution-service"]


#docker build -t execution-service .
#
#docker run -p 8080:8080 execution-service