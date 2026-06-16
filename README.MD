# 🍃 SensorKita Tangerang — Platform Pemantauan Kualitas Udara Partisipatif

[cite_start]SensorKita Tangerang adalah sebuah platform *frontend* web responsif dan interaktif yang berfungsi sebagai pusat panduan perakitan perangkat IoT (Internet of Things) mandiri berbasis sensor Bosch BME680 dan mikrokomputer Seeed XIAO ESP32C3, sekaligus menyediakan visualisasi data *time series* secara *real-time*[cite: 3, 4, 35]. [cite_start]Proyek ini diinisiasi oleh **Bengkel Udara Community** guna meningkatkan kesadaran masyarakat Kabupaten Tangerang terhadap kebersihan lingkungan[cite: 58].

---

## 🚀 Fitur Utama

- **Dashboard Data Historis (Time Series):** Integrasi langsung menggunakan API publik Smart Citizen untuk menarik dan mengalkulasi data suhu serta kelembapan dari 3 device aktif di lapangan (ID: 19686, 19684, 19682).
- **Panduan Perakitan Interaktif (Wizard Steps):** Fitur penuntun langkah-demi-langkah (6 Langkah Utama) yang adaptif berdasarkan jenis paket perangkat yang dipilih pengguna (Paket Basic vs Paket Plus).
- **Papan Kontributor Lokalan (Leaderboard):** Sistem apresiasi kontributor warga Tangerang berdasarkan persentase waktu aktif (*uptime*) tertinggi dari node yang mereka deploy.
- **FAQ Kendala Teknis:** Fitur tanya-jawab interaktif berbasis menu *accordion* untuk membantu warga menyelesaikan masalah *troubleshooting* perangkat keras secara mandiri.
- **100% Responsif & Berbasis Komponen:** Antarmuka modern yang ramah pengguna (*user-friendly*) untuk perangkat Mobile, Tablet, maupun Desktop dengan skema warna alam (Material 3 Design).

---

## 📂 Struktur Direktori Proyek

Proyek ini menggunakan arsitektur multipage murni *frontend* tanpa *backend* dengan pembagian folder sebagai berikut:

```text
├── index.html                  # Halaman Beranda Utama (Landing Page)
└── assets/
    ├── css/
    │   └── style.css           # Kustomisasi Scrollbar & Utility CSS
    ├── img/
    │   ├── wiring_paket_basic.png  # Diagram Skema Jalur I2C Paket Basic
    │   └── wiring_paket_plus.png   # Diagram Skema Paralel Bus I2C Paket Plus
    ├── js/
    │   └── main.js             # Logika Wizard Penuntun, Navigasi & FAQ
    └── main/
        ├── data.html           # Dashboard Metrik & Integrasi API Smart Citizen
        ├── panduan.html        # Salinan Mandiri Wizard Penuntun Perakitan Alat
        └── komunitas.html      # Galeri Dokumentasi Aksi Warga & Widget Interaktif


