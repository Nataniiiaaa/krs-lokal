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
        <h2 class="text-center text mb-3">Informasi Mahasiswa</h2>
        <table class="table table-bordered">
          <tr>
            <th style="width: 150px">NIM</th>
            <td>{{ Mahasiswa.nim }}</td>
          </tr>
          <tr>
            <th>Nama</th>
            <td>{{ Mahasiswa.nama }}</td>
          </tr>
          <tr>
            <th>Alamat</th>
            <td>{{ Mahasiswa.alamat }}</td>
          </tr>
          <tr>
            <th>Tanggal Lahir</th>
            <td>{{ Mahasiswa.lahir }}</td>
          </tr>
          <tr>
            <th>Agama</th>
            <td>{{ getAgamaName(Mahasiswa.agama_id) }}</td>
          </tr>
          <tr>
            <th>Jumlah SKS</th>
            <td>{{ this.SKS }}</td>
          </tr>
          <tr>
            <th>IP Kumulatif</th>
            <td>{{ hitungIPK() }}</td>
          </tr>
        </table>
      </div>
      <div class="container rounded">
        <div class="mb-4">
          <h2 class="text-center text mb-4">Kartu Hasil Studi Mahasiswa</h2>
          <table class="table table-bordered table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tahun</th>
                <th scope="col">Semester</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(krs, index) in KrsData" :key="krs.id">
                <td scope="col">{{ index + 1 }}</td>
                <td scope="col">{{ krs.tahun }}</td>
                <td scope="col">{{ krs.semester }}</td>
                <div class="btn-group">
                  <router-link :to="{ name: 'ShowKhs', params: { id: krs.id,  mhsid: MahasiswaId} }" class="btn btn-info">Show Mahasiswa KHS</router-link>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mt-4">
        <router-link to="/datamahasiswa" class="btn btn-danger">Kembali</router-link>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'redaxios';

export default {
  name: 'ShowMahasiswaView',
  data() {
    return {
      MahasiswaId: this.$route.params.id,
      agamaList: [],
      Mahasiswa: {
        id: '',
        nim: '',
        nama: '',
        alamat: '',
        lahir: '',
        agama_id: '',
      },
      MatkulData: [],
      DetilKrs: [],
      KrsList: [],
      KrsData: [],
      MatkulID: [],
      NilaiMatkul: [],
      SKS: 0,
      MatkulSKS: [],
      TotalNilai: 0,
      IPK: 0,
    };
  },
  created() {
    this.fetchMahasiswaData();
    this.loadAgamaList();
    this.loadDetilKrs();

  },
  mounted() {

  },
  computed: {
    isMahasiswaHasMatakuliah() {
      return this.getMatakuliah(this.MahasiswaId).length > 0;
    },
    // totalSKS() {
    //   let sks = this.MatkulData.reduce((sum, matkul) => sum + parseFloat(matkul.sks), 0)
    //   return sks
    // },

  },
  methods: {
    fetchMahasiswaData() {
      var url = `http://127.0.0.1:8000/api/mahasiswa/${this.MahasiswaId}`;
      axios.get(url).then(({ data }) => {
        console.log(data);
        this.Mahasiswa = data;
      });
    },
    loadAgamaList() {
      var agamaUrl = 'http://127.0.0.1:8000/api/agama';
      axios.get(agamaUrl).then(({ data }) => {
        console.log(data);
        this.agamaList = data;
      });
    },
    loadDetilKrs() {
      var detilKrsUrl = 'http://127.0.0.1:8000/api/detilkrs';
      axios.get(detilKrsUrl).then(({ data }) => {
        console.log(data);
        this.DetilKrs = data
        this.fetchKrsFromDetilKrs()

      });
    },
    fetchKrsFromDetilKrs() {
      const uniqueKrsSet = new Set(); // Use a Set to track unique values
      const uniqueMatakuliahSet = new Set()
      this.DetilKrs.forEach((detil) => {
        if (detil.mahasiswa_id == this.MahasiswaId) {
          uniqueKrsSet.add(detil.krs_id) // Add value to the Set
          uniqueMatakuliahSet.add(detil.matakuliah_id)
          this.NilaiMatkul.push(detil.nilai)
        }
      });
      this.KrsList = Array.from(uniqueKrsSet); // Convert the Set back to an array
      this.MatkulID = Array.from(uniqueMatakuliahSet)
      this.loadKrsList();
      this.loadMatakuliahList()
    },
    loadKrsList(){
      this.KrsList.forEach(krsid => {
        var krsUrl = `http://127.0.0.1:8000/api/krs/${krsid}`
        axios.get(krsUrl).then(({ data }) => {
          this.KrsData.push(data)
        })
      })
    },
    loadMatakuliahList(){
      var url = `http://127.0.0.1:8000/api/matakuliah`
      axios.get(url).then(({ data }) => {
        this.MatkulData = data
        let index = 0
        this.MatkulData.forEach(item => {
          this.MatkulID.forEach(matkul => {
            if(item.id == matkul){
              this.MatkulSKS.push(item.sks)
              this.SKS += parseFloat(item.sks)
            }
          })
        });
      })
    },
    getAgamaName(agamaId) {
      const agama = this.agamaList.find((agama) => agama.id === agamaId);
      return agama ? agama.agama : 'Unknown';
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

    hitungIPK() {
      if (this.SKS > 0) {
        let sum = 0
        for (let index = 0; index < this.NilaiMatkul.length; index++) {
          sum += this.getAngka(this.NilaiMatkul[index]) * this.MatkulSKS[index]
        }

        let ipk = sum / this.SKS;
        ipk = ipk.toFixed(2);
        return ipk;
      } else {
        return 'Load';
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
