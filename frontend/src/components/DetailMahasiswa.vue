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
              <li><router-link class="nav-link" to="/krs">KRS</router-link></li>
                  <li><router-link class="nav-link" to="/detilkrs">Detil KRS</router-link></li>
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
        </table>
      </div>

      <div>
        <h2 class="text-center text mb-3">Matakuliah yang di tempu</h2>
        <div v-for="(i, index) in getSemester()" :key="index">
          <div>
            <h5 class="text mb-2">Semester {{ i }}</h5>
          </div>

          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Kode Matakuliah</th>
                <th>Nama Matakuliah</th>
                <th>SKS</th>
                <th>Nilai</th>
                <th>Predikat</th>
                <th>Bobot Nilai</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(matakuliah, index) in getMatakuliah(MahasiswaId)" :key="index">
                <template v-if="matakuliah.semester == i">
                  <td>{{ matakuliah.kode }}</td>
                  <td>{{ matakuliah.namamatakuliah }}</td>
                  <td>{{ matakuliah.sks }}</td>
                  <td>{{ getNilai(MahasiswaId, matakuliah.id) }}</td>
                  <td>{{ getPredikat(getNilai(MahasiswaId, matakuliah.id)) }}</td>
                  <td>{{ getBobotNilai(MahasiswaId, matakuliah.id) }}</td>
                </template>
              </tr>
              <tr>
                <td colspan="2" style="text-align: center">Total</td>
                <td>{{ totalSks }}</td>
                <td></td>
                <td></td>
                <td>{{ totalBobotNilai }}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <p class="text mb-2">IPS: {{ IPS(i) }}</p>
          </div>
        </div>
      </div>

      <div>
        <h4 class="text mb-3">IPK: {{ getIPK() }}</h4>
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
      matakuliahList: [],
      Mahasiswa: {
        id: '',
        nim: '',
        nama: '',
        alamat: '',
        lahir: '',
        agama_id: '',
      },
      DetilKrs: [],
      Matkul: [],
      totalSks: 0,
      totalBobotNilai: 0,
    };
  },
  created() {
    this.fetchMahasiswaData();
    this.loadAgamaList();
    this.loadDetilKrs();
    this.loadMatakuliahList();
  },
  mounted() {
    // Pemanggilan fungsi setelah data matakuliah diisi
    this.Matkul = this.getMatakuliah(this.MahasiswaId);
    this.hitungTotalSks();
    this.hitungTotalBobotNilai();
  },
  computed: {
    isMahasiswaHasMatakuliah() {
      return this.getMatakuliah(this.MahasiswaId).length > 0;
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
        this.DetilKrs = data;
      });
    },
    loadMatakuliahList() {
      var matakuliahUrl = 'http://127.0.0.1:8000/api/matakuliah';
      axios.get(matakuliahUrl).then(({ data }) => {
        console.log(data);
        this.matakuliahList = data;
      });
    },
    getAgamaName(agamaId) {
      const agama = this.agamaList.find((agama) => agama.id === agamaId);
      return agama ? agama.agama : 'Unknown';
    },
    getMatakuliah(mahasiswaId) {
      const matakuliahDetils = this.DetilKrs.filter((detil) => detil.mahasiswa_id == mahasiswaId);
      return matakuliahDetils.map((detil) => {
        const matakuliah = this.matakuliahList.find((matakuliah) => matakuliah.id == detil.matakuliah_id);
        return matakuliah || {};
      });
    },
    getNilai(mahasiswaId, matakuliahId) {
      const detil = this.DetilKrs.find((detil) => detil.mahasiswa_id == mahasiswaId && detil.matakuliah_id == matakuliahId);
      return detil ? detil.nilai : 'Unknown';
    },
    getPredikat(nilai) {
      if (nilai > 0 && nilai < 45) return 'E';
      else if (nilai >= 45 && nilai < 50) return 'D';
      else if (nilai >= 50 && nilai < 55) return 'D+';
      else if (nilai >= 55 && nilai < 60) return 'C';
      else if (nilai >= 60 && nilai < 65) return 'C+';
      else if (nilai >= 65 && nilai < 75) return 'B';
      else if (nilai >= 75 && nilai < 80) return 'B+';
      else if (nilai >= 80 && nilai <= 100) return 'A';
    },
    getSemester() {
      return 4;
    },
    getAngka(nilai) {
      const nilaiMapping = {
        E: 0,
        D: 1,
        'D+': 1.5,
        C: 2,
        'C+': 2.5,
        B: 3,
        'B+': 3.5,
        A: 4,
      };
      return nilaiMapping[nilai];
    },
    IPS(semester) {
      this.Matkul = this.getMatakuliah(this.MahasiswaId);
      let totalAngka = 0;
      let totalSKS = 0;

      this.Matkul.forEach((e) => {
        let angka = this.getAngka(this.getPredikat(this.getNilai(this.MahasiswaId, e.id)));
        totalAngka += e.sks * angka;
        totalSKS += e.sks;
      });

      const IPS = totalSKS !== 0 ? totalAngka / totalSKS : 0;
      return IPS.toFixed(2);
    },

    getIPK() {
      let totalAngka = 0;
      let totalSKS = 0;

      this.Matkul.forEach((e) => {
        let angka = this.getAngka(this.getPredikat(this.getNilai(this.MahasiswaId, e.id)));
        totalAngka += e.sks * angka;
        totalSKS += e.sks;
      });

      const IPK = totalSKS !== 0 ? totalAngka / totalSKS : 0;
      return IPK.toFixed(2);
    },

    getBobotNilai(mahasiswaId, matakuliahId) {
      const angka = this.getAngka(this.getPredikat(this.getNilai(mahasiswaId, matakuliahId)));
      const sks = this.getMatakuliah(mahasiswaId).find((matakuliah) => matakuliah.id == matakuliahId).sks;
      const bobotNilai = (angka * sks).toFixed(2);
      return bobotNilai;
    },

    hitungTotalSks() {
      let totalSks = 0;
      this.Matkul.forEach((matakuliah) => {
        totalSks += matakuliah.sks;
      });
      this.totalSks = totalSks;
    },

    hitungTotalBobotNilai() {
      let totalBobotNilai = 0;
      this.Matkul.forEach((matakuliah) => {
        const angka = this.getAngka(this.getPredikat(this.getNilai(this.MahasiswaId, matakuliah.id)));
        totalBobotNilai += angka * matakuliah.sks;
      });
      this.totalBobotNilai = totalBobotNilai.toFixed(2);
    },
    totalSks() {
      return this.totalSks;
    },
    // Method untuk mendapatkan total Bobot Nilai
    totalBobotNilai() {
      return this.totalBobotNilai;
    },
    logoutUser() {
      localStorage.removeItem('user');
      window.alert('Anda telah logout');
      this.$router.push('/login');
    },
  },
};

</script>
