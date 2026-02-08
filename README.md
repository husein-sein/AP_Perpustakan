# 📚 LibAdmin - Sistem Manajemen Perpustakaan Digital

Selamat datang di **LibAdmin**, solusi manajemen perpustakaan modern yang dibangun dengan teknologi terkini. Aplikasi ini dirancang untuk memudahkan pengelolaan buku, peminjam, dan transaksi peminjaman secara efisien dan elegan.

---

## 🚀 Fitur Utama

-   **Dashboard Intelijen**: Visualisasi data statistik perpustakaan secara real-time.
-   **Manajemen Buku**: Pengelolaan stok, kategori, dan informasi detail buku (Khusus Admin).
-   **Manajemen Anggota**: Pendataan peminjam secara terorganisir (Khusus Admin).
-   **Transaksi Peminjaman**: Alur peminjaman dan pengembalian yang sistematis.
-   **Keamanan Terjamin**: Autentikasi berbasis JWT dengan role-based access control (RBAC).
-   **Desain Modern**: Antarmuka yang bersih, responsif, dan premium.

---

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript, Vite, Tailwind CSS / Vanilla CSS.
-   **Backend**: Node.js, Express, PostgreSQL / MySQL.
-   **State Management**: Context API / Zustand.
-   **Routing**: React Router DOM.

---

## 🔑 Panduan Akses Login

Untuk mengakses aplikasi, Anda dapat menggunakan akun demo yang telah kami sediakan di bawah ini:

### 🛡️ 1. Akses Administrator (Admin)
Admin memiliki kontrol penuh atas sistem, termasuk menambah buku dan mengelola daftar peminjam.

-   **Halaman Login**: [http://localhost:5173/login](http://localhost:5173/login)
-   **Email**: `admin@lib.com`
-   **Password**: `password`
-   **Fitur Khusus**: Mengelola Buku, Mengelola Peminjam, Dashboard Statistik Lengkap.

### 👤 2. Akses Anggota (User/Member)
User dapat melihat katalog buku yang tersedia dan melihat riwayat peminjaman mereka sendiri.

-   **Halaman Login**: [http://localhost:5173/login](http://localhost:5173/login)
-   **Email**: `jon@lib.com`
-   **Password**: `password`
-   **Fitur**: Melihat Katalog, Riwayat Peminjaman Pribadi, Manajemen Profil.

---

## ⚙️ Cara Menjalankan Project

### 1. Persiapan Backend
Pastikan Anda memiliki database yang sudah berjalan.
```bash
cd server
npm install
npm start
```

### 2. Persiapan Frontend
Jalankan aplikasi React dalam mode development.
```bash
npm install
npm run dev
```

---

## 📂 Struktur Navigasi

| Route | Akses | Keterangan |
| :--- | :--- | :--- |
| `/` | Publik | Landing Page |
| `/login` | Publik | Halaman Masuk |
| `/app` | Authenticated | Beranda Aplikasi |
| `/app/buku` | **Admin Only** | Manajemen Data Buku |
| `/app/peminjam` | **Admin Only** | Manajemen Data Peminjam |
| `/app/transaksi` | User/Admin | Riwayat Transaksi |
| `/app/profile` | User/Admin | Pengaturan Profil |

---

## 🎨 Tampilan Aplikasi

Aplikasi ini mengusung tema **Modern Minimalist Blue**, memberikan kesan profesional dan nyaman di mata pengguna.

> **Tips**: Gunakan akun Admin untuk melihat seluruh menu navigasi yang tersedia di sidebar!

---
Dibuat dengan ❤️ oleh [Kelompok Anda]
