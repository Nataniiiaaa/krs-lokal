<template>
    <div class="container mt-5">
      <div class="card shadow p-4 mb-3 bg-white rounded">
        <div class="card-body">
          <h2 class="card-title">Detail Data Matakuliah</h2>
          <ul class="list-group">
            <li class="list-group-item">
              <strong>Kode Matakuliah:</strong> {{ Matakuliah.kode }}
            </li>
            <li class="list-group-item">
              <strong>Nama Matakuliah:</strong> {{ Matakuliah.namamatakuliah }}
            </li>
            <li class="list-group-item">
              <strong>SKS:</strong> {{ Matakuliah.sks }}
            </li>
            <li class="list-group-item">
              <strong>Semester:</strong> {{ Matakuliah.semester }}
            </li>
            <!-- Add more details if needed -->
          </ul>
          <div class="btn-group mt-3">
            <router-link class="btn btn-warning" to="/matakuliah">Kembali</router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'redaxios';
  
  export default {
    name: 'DetailMatakuliah',
    data() {
      return {
        matakuliahId: this.$route.params.id,
        Matakuliah: {
          id: '',
          kode: '',
          namamatakuliah: '',
          sks: '',
          semester: '',
          // Add more properties if needed
        },
      };
    },
    created() {
      this.fetchMatakuliahData();
    },
    methods: {
      fetchMatakuliahData() {
        var url = `http://127.0.0.1:8000/api/matakuliah/${this.matakuliahId}`;
        axios.get(url).then(({ data }) => {
          this.Matakuliah = data;
        });
      },
    },
  };
  </script>
  