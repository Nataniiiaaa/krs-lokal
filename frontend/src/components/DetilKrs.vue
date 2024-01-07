<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">DETIL KRS</a>
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
    <div class="container">
      <div class="d-flex justify-content-between my-3">
        <h2>DATA DETIL KRS</h2>
        <router-link class="btn btn-primary" to="/tambahdetilkrs">Tambah Data</router-link>
      </div>
      <div class="table-responsive shadow p-3 mb-5 bg-white rounded">
        <table class="table table-bordered table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Tahun</th>
              <th scope="col">Semester</th>
              <th scope="col">Kode Matakuliah</th>
              <th scope="col">Nama Matakuliah</th>
              <th scope="col">NIM Mahasiswa</th>
              <th scope="col">Nama Mahasiswa</th>
              <th scope="col">Nilai</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="DetilKrs in allDetilKrs" :key="DetilKrs.id">
              <td>{{ getTahunKrs(DetilKrs.krs_id) }}</td>
              <td>{{ getSemesterKrs(DetilKrs.krs_id) }}</td>
              <td>{{ getKodeMatkul(DetilKrs.matakuliah_id) }}</td>
              <td>{{ getNamaMatkul(DetilKrs.matakuliah_id) }}</td>
              <td>{{ getNimMahasiswa(DetilKrs.mahasiswa_id) }}</td>
              <td>{{ getNamaMahasiswa(DetilKrs.mahasiswa_id) }}</td>
              <td>{{ DetilKrs.nilai }}</td>
              <td>
                <div class="btn-group">
                  <router-link :to="{ name: 'EditDetilKrs', params: { id: DetilKrs.id } }" class="btn btn-warning">Edit</router-link>
                  <!-- <button type="button" class="btn btn-warning" @click="editMahasiswa(Mahasiswa)">Edit</button> -->
                  <button type="button" class="btn btn-danger" @click="removeDetilKrs(DetilKrs)">Delete</button>
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
  name: 'DetilKrs',
  data() {
    return {
      allDetilKrs: {},
      KRSList: [],
      MahasiswaList: [],
      MatakuliahList: [],
      DetilKrs: {
        id: '',
        krs_id: '',
        mahasiswa_id: '',
        matakuliah_id: '',
        nilai: '',
      },
    };
  },
  created() {
    console.log('Created !');
    this.loadAllDetilKrs();
    this.loadKrsList();
    this.loadMatakuliahList();
    this.loadMahasiswaList();
  },
  mounted() {
    console.log('Mounted !');
  },
  methods: {
    loadAllDetilKrs() {
      var url = 'http://127.0.0.1:8000/api/detilkrs';
      axios.get(url).then(({ data }) => {
        console.log(data);
        this.allDetilKrs = data;
      });
    },
    loadKrsList() {
      var krsurl = 'http://127.0.0.1:8000/api/krs';
      axios.get(krsurl).then(({ data }) => {
        console.log(data);
        this.KRSList = data;
      });
    },
    loadMatakuliahList() {
      var matkulurl = 'http://127.0.0.1:8000/api/matakuliah';
      axios.get(matkulurl).then(({ data }) => {
        console.log(data);
        this.MatakuliahList = data;
      });
    },
    loadMahasiswaList() {
      var mhsurl = 'http://127.0.0.1:8000/api/mahasiswa';
      axios.get(mhsurl).then(({ data }) => {
        console.log(data);
        this.MahasiswaList = data;
      });
    },
    getTahunKrs(krs_id) {
      const krs = this.KRSList.find((krs) => krs.id === krs_id);
      return krs ? krs.tahun : 'Tidak Diketahui';
    },
    getSemesterKrs(krs_id) {
      const krs = this.KRSList.find((krs) => krs.id === krs_id);
      return krs ? krs.semester : 'Tidak Diketahui';
    },
    getKodeMatkul(matkuliah_id) {
      const matakuliah = this.MatakuliahList.find((matakuliah) => matakuliah.id === matkuliah_id);
      return matakuliah ? matakuliah.kode : 'Tidak Diketahui';
    },
    getNamaMatkul(matkuliah_id) {
      const matakuliah = this.MatakuliahList.find((matakuliah) => matakuliah.id === matkuliah_id);
      return matakuliah ? matakuliah.namamatakuliah : 'Tidak Diketahui';
    },
    getNimMahasiswa(mahasiswa_id) {
      const mahasiswa = this.MahasiswaList.find((mahasiswa) => mahasiswa.id === mahasiswa_id);
      return mahasiswa ? mahasiswa.nim : 'Tidak Diketahui';
    },
    getNamaMahasiswa(mahasiswa_id) {
      const mahasiswa = this.MahasiswaList.find((mahasiswa) => mahasiswa.id === mahasiswa_id);
      return mahasiswa ? mahasiswa.nama : 'Tidak Diketahui';
    },
    removeDetilKrs(DetilKrs) {
      var url = `http://127.0.0.1:8000/api/detilkrs/${DetilKrs.id}`;
      axios
        .delete(url)
        .then(() => {
          console.log('Data Berhasil Dihapus !');
          this.loadAllDetilKrs();
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
