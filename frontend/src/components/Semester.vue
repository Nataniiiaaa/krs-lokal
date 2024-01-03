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
      <h2>Detail Semester</h2>
    </div>
    <div class="d-flex justify-content-between my-3">
      <h5>Tahun : {{ krsDetails.tahun }}</h5>
    </div>
    <div class="d-flex justify-content-between my-3">
      <h5>Semester : {{ krsDetails.semester }}</h5>
    </div>
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
      students: [], // Initialize as an empty array
      DetilKrsList: [],
      MhsID: [],
      mahasiswaDetails: [],
    };
  },

  created() {
    this.fetchKrsDetails();
  },
  methods: {
    fetchKrsDetails() {
      const krsUrl = `http://127.0.0.1:8000/api/krs/${this.KrsId}`;
      axios
        .get(krsUrl)
        .then(({ data }) => {
          this.krsDetails.tahun = data.tahun;
          this.krsDetails.semester = data.semester;
          // Fetch DetilKrsList and Mahasiswa details
          this.fetchStudentForKrs();
        })
        .catch((error) => {
          console.error('Error fetching KRS details:', error);
        });
    },
    // In the fetchStudentForKrs method
    fetchStudentForKrs() {
      const detilKrsUrl = `http://127.0.0.1:8000/api/detilkrs`;
      axios
        .get(detilKrsUrl)
        .then(({ data }) => {
          console.log('DetilKrsList Created', data);
          this.DetilKrsList = data;
          var index = 0;
          this.DetilKrsList.forEach((element) => {
            var e = element;
            var matches = e.krs_id == this.KrsId;
            if (matches) {
              this.MhsID[index] = element.mahasiswa_id;
              index++;
            } else {
              console.log('Not');
            }
          });

          // Fetch additional details for each student (nim, nama, etc.)
          this.fetchStudentDetails();
        })
        .catch((error) => {
          console.error('Error fetching DetilKrsList:', error);
        });
    },
    fetchStudentDetails() {
      // Assuming you have the array of mahasiswa_id values in this.MhsID
      var mahasiswaIds = this.MhsID;
      // Iterate through each mahasiswa_id
      mahasiswaIds.forEach((mahasiswaId) => {
        // Assuming you have an API endpoint to fetch mahasiswa details
        const mahasiswaUrl = `http://127.0.0.1:8000/api/mahasiswa/${mahasiswaId}`;

        // Make an API request to get mahasiswa details
        axios
          .get(mahasiswaUrl)
          .then((response) => {
            const mahasiswaData = response.data;

            // Push an object with nim and nama to the mahasiswaDetails array
            this.mahasiswaDetails.push({
              id: mahasiswaId,
              nim: mahasiswaData.nim,
              nama: mahasiswaData.nama,
            });
          })
          .catch((error) => {
            console.error('Error fetching Mahasiswa details:', error);
          });
      });
    },
  },
};
</script>