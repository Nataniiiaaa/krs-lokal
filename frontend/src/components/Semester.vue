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
                <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/datamahasiswa">Data Mahasiswa</router-link>
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
  </div>
  <div class="container">
    <div class="d-flex justify-content-between my-3">
      <h2>Detail Semester</h2>
    </div>
    <div class="d-flex justify-content-between my-3">
      <h5>Tahun : {{ krsDetails.tahun }}</h5>
    </div>
    <div class="d-flex justify-content-between my-3">
      <h5>Semester : {{ krsDetails.semester }}</h5>
    </div>
    <button class="btn btn-danger" @click="goBack">Kembali</button>
    <div class="table-responsive shadow p-3 mb-5 bg-white rounded">
      <table class="table table-bordered table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">NIM</th>
            <th scope="col">Nama Mahasiswa</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(Mahasiswa, index) in mahasiswaDetails" :key="index">
            <td>{{ Mahasiswa.nim }}</td>
            <td>{{ Mahasiswa.nama }}</td>
            <td>
              <router-link :to="{ name: 'MatkulMhs', params: { id: Mahasiswa.id } }" class="btn btn-info">Detail Matkuliah Mahasiswa</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import axios from 'redaxios';

export default {
  name: 'DetKrs',
  data() {
    return {
      KrsId: this.$route.params.id,
      krsDetails: {
        tahun: '',
        semester: '',
      },
      students: [],
      DetilKrsList: [],
      MhsID: [],
      mahasiswaDetails: [],
      uniqueNIMs: {}, // Objek untuk menyimpan NIM yang sudah ada
    };
  },

  created() {
    this.fetchKrsDetails();
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
          this.fetchStudentForKrs();
        })
        .catch((error) => {
          console.error('Error fetching KRS details:', error);
        });
    },

    fetchStudentForKrs() {
      const detilKrsUrl = `http://127.0.0.1:8000/api/detilkrs`;
      axios
        .get(detilKrsUrl)
        .then(({ data }) => {
          this.DetilKrsList = data;
          var index = 0;
          this.DetilKrsList.forEach((element) => {
            var matches = element.krs_id == this.KrsId;
            if (matches) {
              this.MhsID[index] = element.mahasiswa_id;
              index++;
            } else {
              console.log('Not');
            }
          });

          this.fetchStudentDetails();
        })
        .catch((error) => {
          console.error('Error fetching DetilKrsList:', error);
        });
    },

    fetchStudentDetails() {
      var mahasiswaIds = this.MhsID;

      // Menggunakan Promise.all untuk menunggu seluruh data mahasiswa diambil
      Promise.all(
        mahasiswaIds.map((mahasiswaId) => {
          const mahasiswaUrl = `http://127.0.0.1:8000/api/mahasiswa/${mahasiswaId}`;
          return axios
            .get(mahasiswaUrl)
            .then((response) => {
              const mahasiswaData = response.data;

              // Validasi NIM
              if (!this.uniqueNIMs[mahasiswaData.nim]) {
                this.uniqueNIMs[mahasiswaData.nim] = true;
                return {
                  id: mahasiswaId,
                  nim: mahasiswaData.nim,
                  nama: mahasiswaData.nama,
                };
              } else {
                console.log(`Duplicate NIM found: ${mahasiswaData.nim}`);
                return null;
              }
            })
            .catch((error) => {
              console.error('Error fetching Mahasiswa details:', error);
              return null;
            });
        })
      ).then((mahasiswaDetails) => {
        // Menghilangkan nilai null dari Promise.all (untuk NIM duplikat)
        this.mahasiswaDetails = mahasiswaDetails.filter((detail) => detail !== null);

        // Sorting mahasiswaDetails berdasarkan NIM terkecil ke NIM terbesar
        this.mahasiswaDetails.sort((a, b) => a.nim.localeCompare(b.nim));
      });
    },
  },
};
</script>
