# Gunakan image Node.js
FROM node:18

# Set working directory di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json (atau yarn.lock) untuk instalasi dependencies
COPY package*.json ./

# Instal dependencies
RUN npm install

# Salin seluruh kode sumber ke dalam container
COPY . .

# Build aplikasi
RUN npm run build

# Jalankan aplikasi
CMD ["node", "dist/main"]
