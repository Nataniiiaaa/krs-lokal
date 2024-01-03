<template>
  <div>
    <nav class="navbar navbar-dark bg-dark fixed-top">
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
    <div class="container" style="padding-top: 70px; height: 100vh; overflow-y: auto;">
      <div class="d-flex justify-content-between my-3">
        <h2>DATA MATAKULIAH</h2>
        <router-link class="btn btn-primary" to="/tambahmatakuliah">Tambah Data</router-link>
      </div>
      <div class="table-responsive shadow p-3 mb-5 bg-white rounded">
        <table class="table table-bordered table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Kode</th>
              <th scope="col">Nama Matakuliah</th>
              <th scope="col">SKS</th>
              <th scope="col">Semester</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="Matakuliah in allMatakuliah" :key="Matakuliah.id">
              <td>{{ Matakuliah.kode }}</td>
              <td>{{ Matakuliah.namamatakuliah }}</td>
              <td>{{ Matakuliah.sks }}</td>
              <td>{{ Matakuliah.semester }}</td>
              <td>
                <div class="btn-group">
                  <router-link :to="{ name: 'EditMataKuliah', params: { id: Matakuliah.id } }" class="btn btn-warning">Edit</router-link>
                  <router-link :to="{ name: 'DetailMatakuliah', params: { id: Matakuliah.id } }" class="btn btn-info">Detail</router-link>
                  <button type="button" class="btn btn-danger" @click="removeMatakuliah(Matakuliah)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'redaxios';

export default {
  name: 'Matakuliah',
  data() {
    return {
      allMatakuliah: {},
      Matakuliah: {
        id: '',
        kode: '',
        namamatakuliah: '',
        sks: '',
        semester: '',
      },
    };
  },
  created() {
    console.log('Created !');
    this.loadAllMatakuliah();
  },
  mounted() {
    console.log('Mounted !');
  },
  methods: {
    loadAllMatakuliah() {
      var url = 'http://127.0.0.1:8000/api/matakuliah';
      axios.get(url).then(({ data }) => {
        console.log(data);
        this.allMatakuliah = data;
        this.sortMatakuliah(); // Panggil fungsi sort setelah memuat data
      });
    },
    sortMatakuliah() {
      // Fungsi untuk menyortir array matakuliah berdasarkan semester
      this.allMatakuliah.sort((a, b) => {
        if (a.semester === b.semester) {
          // Jika semester sama, gunakan localeCompare untuk sorting berdasarkan kode matakuliah
          return a.kode.localeCompare(b.kode, undefined, { numeric: true, sensitivity: 'base' });
        }
        return a.semester - b.semester;
      });
    },
    removeMatakuliah(Matakuliah) {
      var url = `http://127.0.0.1:8000/api/matakuliah/${Matakuliah.id}`;
      axios
        .delete(url)
        .then(() => {
          console.log('Data Berhasil Dihapus !');
          this.loadAllMatakuliah(); // Memanggil kembali data setelah menghapus
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
        });
    },
    logoutUser() {
      localStorage.removeItem('user');
      window.alert('Anda telah logout');
      this.$router.push('/login');
    },
  },
};
</script>
