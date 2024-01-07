<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Dashboard</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/datamahasiswa">Data Mahasiswa</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/matakuliah">Data Matakuliah</router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Data KRS </a>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><router-link class="nav-link" to="/krs">KRS</router-link></li>
                  <li><router-link class="nav-link" to="/detilkrs">Detil KRS</router-link></li>
                </ul>
              </li>
              <li class="d-flex justify-content-between my-3" style="text-align: left">
                <button type="button" class="btn btn-outline-danger" style="background-color: red; color: white" @click="logoutUser">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div class="table-responsive shadow p-3 mb-3 bg-white rounded" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
      <h1 style="font-size: 36px; color: #333">Selamat Datang!</h1>
      <p style="text-align: center; margin-bottom: 20px; font-size: 18px; color: #555">
        Selamat datang di Dashboard Tata Usaha. Di sini Anda dapat mengelola Kartu Rencana Studi (KRS) mahasiswa. Gunakan menu di atas untuk navigasi ke berbagai fitur, termasuk pengelolaan data mahasiswa, matakuliah, dan KRS.
      </p>
    </div>

    <div class="table-responsive shadow p-3 mb-5 bg-white rounded">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      addressCounts: [], // Menggunakan array objek untuk menyimpan alamat dan jumlah mahasiswa
      chart: null,
    };
  },
  created() {
    this.fetchMahasiswaData();
  },
  methods: {
    logoutUser() {
      localStorage.removeItem('user');
      window.alert('Anda telah logout');
      this.$router.push('/login');
    },
    fetchMahasiswaData() {
      const apiUrl = 'http://127.0.0.1:8000/api/mahasiswa';

      axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data;

          // Proses data untuk mengambil alamat dan jumlah mahasiswa
          const addressCountsMap = new Map();

          data.forEach((item) => {
            const address = item.alamat;

            // Jika alamat sudah ada dalam map, tambahkan jumlah mahasiswa
            if (addressCountsMap.has(address)) {
              addressCountsMap.set(address, addressCountsMap.get(address) + 1);
            } else {
              // Jika alamat belum ada dalam map, inisialisasi jumlah mahasiswa menjadi 1
              addressCountsMap.set(address, 1);
            }
          });

          // Konversi Map menjadi array objek
          this.addressCounts = Array.from(addressCountsMap).map(([address, count]) => ({ address, count }));

          // Panggil fungsi untuk membuat grafik
          this.createChart();
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
    createChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(this.$refs.chartCanvas, {
        type: 'bar',
        data: {
          labels: this.addressCounts.map((item) => item.address),
          datasets: [
            {
              label: 'Jumlah Mahasiswa',
              data: this.addressCounts.map((item) => item.count),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: 'y',
        },
      });
    },
  },
};
</script>
