# WA Promo

Monorepo awal untuk landing page WA Promo dan API ringan berbasis Hono.

## Menjalankan

```bash
pnpm install
pnpm dev
```

Atau jalankan salah satu aplikasi saja:

```bash
pnpm dev:frontend
pnpm dev:backend
```

Frontend berjalan secara mandiri sebagai PWA dasar. Backend menyediakan
`GET /health`; belum ada koneksi antara kedua aplikasi pada tahap ini.

Proyek menggunakan pnpm workspace agar dependency tersimpan efisien dan satu
lockfile dipakai bersama. Pilihan package manager tidak mengubah ukuran bundle
atau kecepatan aplikasi di perangkat pengguna; itu ditentukan oleh kode dan
aset yang dikirim ke browser.
