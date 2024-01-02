<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">KRS ADMIN</a>
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
                <router-link class="nav-link" to="/">Dashboard</router-link>
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
                  <li><a class="dropdown-item" href="/krs">KRS</a></li>
                  <li><a class="dropdown-item" href="/detilkrs">Detail KRS</a></li>
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
    <div class="table-responsive shadow p-3 mb-5 bg-white rounded" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
      <h1 style="font-size: 36px; color: #333">Selamat Datang!</h1>
      <p style="text-align: center; margin-bottom: 20px; font-size: 18px; color: #555">
        Selamat datang di Dashboard Tata Usaha. Di sini Anda dapat mengelola Kartu Rencana Studi (KRS) mahasiswa. Gunakan menu di atas untuk navigasi ke berbagai fitur, termasuk pengelolaan data mahasiswa, matakuliah, dan KRS.
      </p>
      <canvas ref="chart" style="width: 100%; max-width: 600px"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logoutUser() {
      localStorage.removeItem('user');
      window.alert('Anda telah logout');
      this.$router.push('/login');
    },
  },
};
</script>
