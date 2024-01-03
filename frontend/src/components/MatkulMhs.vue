<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">DETAIL SEMESTER</a>
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
            <td>{{ matkul.nilai }}</td>
            <td>{{ matkul.predikat }}</td>
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
      Nilai: [],
    };
  },

  created() {
    this.fetchMhsDetails();
  },
  methods: {
    fetchMhsDetails() {
      const url = `http://127.0.0.1:8000/api/mahasiswa/${this.MahasiswaId}`;
      axios
        .get(url)
        .then(({ data }) => {
          console.log('Data Mahasiswa:', data);
          this.MhsDetail.nim = data.nim;
          this.MhsDetail.nama = data.nama;
          // tambahkan ID mahasiswa ke objek MhsDetail
          this.MhsDetail.id = data.id;
          this.fetchMatakuliahForStudent();
        })
        .catch((error) => {
          console.error('Error fetching Mhs details:', error);
        });
    },

    fetchMatakuliahForStudent() {
      const detilKrsUrl = `http://127.0.0.1:8000/api/detilkrs`;
      axios
        .get(detilKrsUrl)
        .then(({ data }) => {
          console.log('DetilKrsList Created', data);
          this.DetilKrsList = data;
          var index = 0;
          this.DetilKrsList.forEach((element) => {
            var e = element;
            console.log(e);
            var matches = e.mahasiswa_id == this.MhsDetail.id;
            if (matches) {
              this.MatkulID[index] = element.matakuliah_id;
              this.DetilID[index] = element.id;
              index++;
              console.log('Get');
            } else {
              console.log('Not');
            }
          });

          // Fetch additional details for each student (nim, nama, etc.)
          this.fetchMatakuliahDetails();
        })
        .catch((error) => {
          console.error('Error fetching DetilKrsList:', error);
        });
    },

    fetchMatakuliahDetails() {
      var matkulIds = this.MatkulID;
      var detilIds = this.DetilID;

      // Use Promise.all to wait for all requests to complete
      Promise.all(
        matkulIds.map((matkulId, index) => {
          const matakuliahUrl = `http://127.0.0.1:8000/api/matakuliah/${matkulId}`;
          return axios
            .get(matakuliahUrl)
            .then((response) => {
              const matakuliahData = response.data;
              // Return an object with needed data
              return {
                id: matkulId,
                kode: matakuliahData.kode,
                namamatakuliah: matakuliahData.namamatakuliah,
              };
            })
            .catch((error) => {
              console.error('Error fetching Matakuliah details:', error);
              return null;
            });
        })
      ).then((matakuliahDetailsArray) => {
        console.log('Matakuliah Details Array:', matakuliahDetailsArray);

        // Iterasi dan pemrosesan berikutnya
        detilIds.forEach((detilId, index) => {
          const detilkrsUrl = `http://127.0.0.1:8000/api/detilkrs/${detilId}`;
          axios
            .get(detilkrsUrl)
            .then((response) => {
              const detilkrs = response.data;
              // Find the matching matakuliahDetails
              const matchingMatakuliah = matakuliahDetailsArray.find((item) => item.id === matkulIds[index]);
              if (matchingMatakuliah) {
                let predikat;
                let n = detilkrs.nilai;
                if (n > 0 && n < 45) predikat = 'E';
                else if (n >= 45 && n < 50) predikat = 'D';
                else if (n >= 50 && n < 55) predikat = 'D+';
                else if (n >= 55 && n < 60) predikat = 'C';
                else if (n >= 60 && n < 65) predikat = 'C+';
                else if (n >= 65 && n < 75) predikat = 'B';
                else if (n >= 75 && n < 80) predikat = 'B+';
                else if (n >= 80 && n <= 100) predikat = 'A';
                // Push to MatakuliahDetails
                this.MatakuliahDetails.push({
                  id: matchingMatakuliah.id,
                  kode: matchingMatakuliah.kode,
                  namamatakuliah: matchingMatakuliah.namamatakuliah,
                  nilai: detilkrs.nilai,
                  predikat: predikat,
                });
              }
            })
            .catch((error) => {
              console.error('Error fetching DetilKrsList:', error);
            });
        });
      });
    },
  },
};
</script>
