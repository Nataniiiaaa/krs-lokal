<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">DETAIL MATAKULIAH SEMESTER</a>
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
  </div>
  <div class="container">
    <div class="d-flex justify-content-between my-3">
      <h2>Detail Matakuliah Mahasiswa</h2>
    </div>
    <div class="d-flex justify-content-between my-3">
      <h5>Tahun : {{ krsDetails.tahun }}</h5>
    </div>
    <div class="d-flex justify-content-between my-3">
      <h5>Semester : {{ krsDetails.semester }}</h5>
    </div>
    <div class="d-flex justify-content-between my-3">
      <h5>NIM : {{ MhsDetail.nim }}</h5>
    </div>
    <div class="d-flex justify-content-between my-3">
      <h5>Nama : {{ MhsDetail.nama }}</h5>
    </div>
    <button class="btn btn-danger mb-4" @click="goBack">Kembali</button>
    <div class="table-responsive shadow p-3 mb-5 bg-white rounded">
      <table class="table table-bordered table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Kode Matakuliah</th>
            <th scope="col">Nama Matakuliah</th>
            <th scope="col">Nilai</th>
            <th scope="col">Predikat</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(matkul, index) in MatakuliahDetails" :key="index">
            <td>{{ matkul.kode }}</td>
            <td>{{ matkul.namamatakuliah }}</td>
            <td>{{ this.NilaiMatkul[index] }}</td>
            <td>{{ getPredikat(this.NilaiMatkul[index]) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'redaxios';

export default {
  name: 'MatkulMhs',
  data() {
    return {
      MahasiswaId: this.$route.params.id,
      KrsId: this.$route.params.krsid,
      MhsDetail: {
        nim: '',
        nama: '',
      },
      krsDetails: {
        tahun: '',
        semester: '',
      },
      DetilKrsList: [],
      MatkulID: [],
      DetilID: [],
      MatakuliahDetails: [],
      NilaiMatkul: [],
    };
  },
  mounted(){

  },
  created() {
    this.fetchMhsDetails();
    this.fetchKrsDetails();
    this.loadDetilKrs()
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    fetchKrsDetails() {
      const krsUrl = `http://127.0.0.1:8000/api/krs/${this.KrsId}`;
      axios
        .get(krsUrl)
        .then(({ data }) => {
          this.krsDetails.tahun = data.tahun;
          this.krsDetails.semester = data.semester;
        })
        .catch((error) => {
          console.error('Error fetching KRS details:', error);
        });
    },
    fetchMhsDetails() {
      const url = `http://127.0.0.1:8000/api/mahasiswa/${this.MahasiswaId}`;
      axios
        .get(url)
        .then(({ data }) => {
          this.MhsDetail.nim = data.nim;
          this.MhsDetail.nama = data.nama;
        })
        .catch((error) => {
          console.error('Error fetching Mhs details:', error);
        });
    },
    loadDetilKrs(){
      const url = `http://127.0.0.1:8000/api/detilkrs`
      axios.get(url).then(({ data }) => {
        this.DetilKrsList = data
        this.fetchMatakuliahFromDetilKrs()
      })
    },
    fetchMatakuliahFromDetilKrs(){
      const uniqueMatkul = new Set(); // Use a Set to track unique values
      this.DetilKrsList.forEach((detil) => {
          if (detil.mahasiswa_id == this.MahasiswaId && detil.krs_id == this.KrsId) {
              uniqueMatkul.add(detil.matakuliah_id) // Add value to the Set
              this.NilaiMatkul.push(detil.nilai)
          }
      });
      this.MatkulID = Array.from(uniqueMatkul); 
      this.loadMatakuliahList()
    },
    loadMatakuliahList(){
      this.MatkulID.forEach(id => {
          var url = `http://127.0.0.1:8000/api/matakuliah/${id}`
          axios.get(url).then(({ data }) => {
              this.MatakuliahDetails.push(data)
          })
      })
    },
    getPredikat(nilai){
      if(nilai > 0 && nilai < 45) return 'E'
      else if(nilai >= 45 && nilai < 50) return 'D'
      else if(nilai >= 50 && nilai < 55) return 'D+'
      else if(nilai >= 55 && nilai < 60) return 'C'
      else if(nilai >= 60 && nilai < 65) return 'C+'
      else if(nilai >= 65 && nilai < 75) return 'B'
      else if(nilai >= 75 && nilai < 80) return 'B+'
      else if(nilai >= 80 && nilai <= 100) return 'A'
    },
    logoutUser() {
      // Implement your logout logic here
      console.log('Logout clicked');
    },
  },
};
</script>
