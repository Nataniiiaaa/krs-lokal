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
                  <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link active" to="/datamahasiswa">Data Mahasiswa</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/matakuliah">Data Matakuliah</router-link>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Data KRS </a>
                  <ul class="dropdown-menu dropdown-menu-dark">
                    <li><router-link class="dropdown-item" to="/krs">KRS</router-link></li>
                    <li><router-link class="dropdown-item" to="/detilkrs">Detail KRS</router-link></li>
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
  
      <main class="container mt-4 card shadow p-3 mb-5 bg-light rounded">
        <div class="mb-4">
          <h2 class="text-center text mb-3">Kartu Hasil Studi Mahasiswa</h2>
          <table class="table table-bordered">
              <tr>
                <th>Tahun</th>
                <td>{{ KRS.tahun }}</td>
              </tr>
              <tr>
                <th>Semester</th>
                <td>{{ KRS.semester }}</td>
              </tr>
            <tr>
              <th style="width: 150px">NIM</th>
              <td>{{ Mahasiswa.nim }}</td>
            </tr>
            <tr>
              <th>Nama</th>
              <td>{{ Mahasiswa.nama }}</td>
            </tr>
            <tr>
              <th>Jumlah SKS</th>
              <td>
                {{ totalSKS }}
              </td>
            </tr>
            <tr>
              <th>IP Semester</th>
              <td>{{ hitungIps() }}</td>
            </tr>

          </table>
        </div>
        <div class="table-responsive shadow p-3 mb-5 bg-white rounded">
            <table class="table table-bordered table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Kode Matakuliah</th>
                        <th scope="col">Nama Matakuliah</th>
                        <th scope="col">SKS</th>
                        <th scope="col">Predikat</th>
                        <th scope="col">Nilai Akhir</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(matkul, index) in MatakuliahData" :key="matkul.id">
                        <td scope="col">{{index + 1}}</td>
                        <td scope="col">{{ matkul.kode }}</td>
                        <td scope="col">{{ matkul.namamatakuliah }}</td>
                        <td scope="col">{{ matkul.sks }}</td>
                        <td scope="col">{{ getPredikat(NilaiMatkul[index]) }}</td>
                        <td scope="col">{{ NilaiMatkul[index] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-4">
          <router-link :to="{ name: 'DetailMahasiswa', params: {id: MahasiswaId}}"  class="btn btn-danger">Back</router-link>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import axios from 'redaxios';
  
  export default {
    name: 'ShowKhs',
    data() {
      return {
        MahasiswaId: this.$route.params.mhsid,
        KrsId: this.$route.params.id,
        Mahasiswa: {
          id: '',
          nim: '',
          nama: '',
          alamat: '',
          lahir: '',
          agama_id: '',
        },
        KRS:{
            id: '',
            tahun: '',
            semester: '',
        },
        MatakuliahId: [],
        MatakuliahData: [],
        MatakuliahSKS: [],
        DetilKrs: [],
        NilaiMatkul: [],
        SKS: 0,
      };
    },
    created() {
        this.fetchMahasiswaData();
        this.fetchKrsData()
        this.loadDetilKrs()
    },
    mounted() {
  
    },
    computed: {
        totalSKS() {
            return this.MatakuliahSKS.reduce((sum, sks) => sum + parseFloat(sks), 0);
        },
    },
    methods: {
        fetchMahasiswaData() {
            var url = `http://127.0.0.1:8000/api/mahasiswa/${this.MahasiswaId}`;
            axios.get(url).then(({ data }) => {
            console.log(data);
            this.Mahasiswa = data;
            });
        },
        fetchKrsData(){
            var url = `http://127.0.0.1:8000/api/krs/${this.KrsId}`
            axios.get(url).then(({data}) => {
                this.KRS = data
            })
        },
        loadDetilKrs() {
            var detilKrsUrl = 'http://127.0.0.1:8000/api/detilkrs';
            axios.get(detilKrsUrl).then(({ data }) => {
                console.log(data);
                this.DetilKrs = data
                this.fetchMatakuliahFromDetilKrs()
            });
        },
        fetchMatakuliahFromDetilKrs() {
            const uniqueMatkul = new Set(); // Use a Set to track unique values
            this.DetilKrs.forEach((detil) => {
                if (detil.mahasiswa_id == this.MahasiswaId && detil.krs_id == this.KrsId) {
                    uniqueMatkul.add(detil.matakuliah_id) // Add value to the Set
                    this.NilaiMatkul.push(detil.nilai)
                }
            });
            this.MatakuliahId = Array.from(uniqueMatkul); // Convert the Set back to an array
            this.loadMatakuliahList();
        },
        loadMatakuliahList() {
          var url = `http://127.0.0.1:8000/api/matakuliah`;
          axios.get(url).then(({ data }) => {
            this.MatakuliahData = data;
            this.MatakuliahData = this.MatakuliahData.filter(item => {
              if (this.MatakuliahId.includes(item.id)) {
                this.MatakuliahSKS.push(item.sks);
                this.SKS += parseFloat(item.sks);
                return true;
              } else {
                return false;
              }
            });
          });
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
        getAngka(nilai){
            if(nilai > 0 && nilai < 45) return 0
            else if(nilai >= 45 && nilai < 50) return 1
            else if(nilai >= 50 && nilai < 55) return 1.5
            else if(nilai >= 55 && nilai < 60) return 2
            else if(nilai >= 60 && nilai < 65) return 2.5
            else if(nilai >= 65 && nilai < 75) return 3
            else if(nilai >= 75 && nilai < 80) return 3.5
            else if(nilai >= 80 && nilai <= 100) return 4
        },
        hitungIps() {
          this.MatakuliahSKS.forEach((sks, index) => {
            console.log(index, sks);
          })
          if(this.SKS > 0){
            let sum = 0;
            for (let index = 0; index < this.NilaiMatkul.length; index++) {
              sum += this.getAngka(this.NilaiMatkul[index]) * this.MatakuliahSKS[index];
            }
            let ips = sum / this.totalSKS;
            ips = ips.toFixed(2);
            return ips;
          }else{
            return 'Load'
          }
        },
        logoutUser() {
            localStorage.removeItem('user');
            window.alert('Anda telah logout');
            this.$router.push('/login');
        },
    },
  };
  
  </script>
  