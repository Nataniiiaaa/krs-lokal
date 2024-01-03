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
                          <router-link class="nav-link active" to="/datamahasiswa">Data Mahasiswa</router-link>
                      </li>
                      <li class="nav-item">
                            <router-link class="nav-link" to="/matakuliah">Data Matakuliah</router-link>
                        </li>
                      <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Data KRS
                          </a>
                          <ul class="dropdown-menu dropdown-menu-dark">
                          <li><a class="dropdown-item" href="/krs">KRS</a></li>
                          <li><a class="dropdown-item" href="/detilkrs">Detail KRS</a></li>
                          </ul>
                        </li>
                            <li class="d-flex justify-content-between my-3" style="text-align: left;">
                            <button type="button" class="btn btn-outline-danger" style="background-color: red; color: white;" @click="logoutUser">Logout</button>
                        </li>
                      </ul>
                  </div>
              </div>
          </div>
      </nav>
      <div class="container" style="padding-top: 70px; height: 100vh; overflow-y: auto;">
          <div class="d-flex justify-content-between my-3">
              <h2>DATA MAHASISWA</h2>
              <router-link class="btn btn-primary" to="/tambahmahasiswa">Tambah Data</router-link>
          </div>
          <div class="table-responsive shadow p-3 mb-5 bg-white rounded">
              <table class="table table-bordered table-striped">
                  <thead class="thead-dark">
                      <tr>
                          <th scope="col">NIM</th>
                          <th scope="col">Nama</th>
                          <th scope="col">Alamat</th>
                          <th scope="col">Tanggal Lahir</th>
                          <th scope="col">Agama</th>
                          <th scope="col">Aksi</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(Mahasiswa) in allMahasiswa" :key="Mahasiswa.id">
                          <td>{{ Mahasiswa.nim }}</td>
                          <td>{{ Mahasiswa.nama }}</td>
                          <td>{{ Mahasiswa.alamat }}</td>
                          <td>{{ Mahasiswa.lahir }}</td>
                          <td>{{ getAgamaName(Mahasiswa.agama_id) }}</td>
                          <td>
                              <div class="btn-group">
                                  <router-link :to="{ name: 'EditMahasiswa', params: { id: Mahasiswa.id } }" class="btn btn-warning">Edit</router-link>
                                  <router-link :to="{name: 'DetailMahasiswa', params:{id: Mahasiswa.id}}" class="btn btn-info">Detail</router-link>
                                  <button type="button" class="btn btn-danger" @click="removeMahasiswa(Mahasiswa)">Delete</button>
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
  import EditMahasiswa from '../components/EditMahasiswa.vue';
  import axios from 'redaxios';
  
  export default {
    name: 'Mahasiswa',
    data() {
      return {
        allMahasiswa: [],
        agamaList: [],
        Mahasiswa: {
          'id': '',
          'nim': '',
          'nama': '',
          'alamat': '',
          'lahir': '',
          'agama_id': ''
        }
      };
    },
    created() {
      this.loadAllMahasiswa();
      this.loadAgamaList();
    },
    methods: {
      loadAllMahasiswa() {
        var url = 'http://127.0.0.1:8000/api/mahasiswa';
        axios.get(url).then(({ data }) => {
          this.allMahasiswa = data;
          this.sortMahasiswa(); // Panggil fungsi sort setelah memuat data
        });
      },
      sortMahasiswa() {
        // Fungsi untuk menyortir array mahasiswa berdasarkan NIM
        this.allMahasiswa.sort((a, b) => {
          return a.nim.localeCompare(b.nim, undefined, { numeric: true, sensitivity: 'base' });
        });
      },
      loadAgamaList() {
        var agamaUrl = 'http://127.0.0.1:8000/api/agama';
        axios.get(agamaUrl).then(({ data }) => {
          this.agamaList = data;
        });
      },
      getAgamaName(agama_id) {
        const agama = this.agamaList.find((agama) => agama.id === agama_id);
        return agama ? agama.agama : 'Tidak Diketahui';
      },
      removeMahasiswa(Mahasiswa) {
        var url = `http://127.0.0.1:8000/api/mahasiswa/${Mahasiswa.id}`;
        axios.delete(url).then(() => {
          console.log('Data Berhasil Dihapus !');
          this.loadAllMahasiswa(); // Memanggil kembali data setelah menghapus
        }).catch((error) => {
          console.error('Error deleting data:', error);
        });
      },
      editMahasiswa(Mahasiswa) {
        this.$router.push({ name: 'EditMahasiswa', params: { id: Mahasiswa.id } });
      },
      logoutUser() {
        localStorage.removeItem('user');
        window.alert('Anda telah logout');
        this.$router.push('/login');
      },
    },
    components: {
      EditMahasiswa
    }
  };
  </script>
  