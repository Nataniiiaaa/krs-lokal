<template>
    <div class="container mt-4">
      <div class="card shadow p-3 mb-5 bg-white rounded">
        <div class="card-body">
          <h2 class="card-title">Tambah KRS</h2>
          <form @submit.prevent="tambahKrs">
            <div class="mb-3">
              <label for="tahun" class="form-label">Tahun</label>
              <input type="text" class="form-control" id="tahun" v-model="krs.tahun">
            </div>
            <div class="mb-3">
                <label class="form-label">Semester</label>

                <!-- Pilihan radio button -->
                <div class="form-check">
                    <input
                    class="form-check-input"
                    type="radio"
                    id="semester"
                    value="Ganjil"
                    v-model="krs.semester"
                    />
                    <label class="form-check-label" for="matakuliah1">Ganjil</label>
                </div>

                <div class="form-check">
                    <input
                    class="form-check-input"
                    type="radio"
                    id="semester"
                    value="Genap"
                    v-model="krs.semester"
                    />
                    <label class="form-check-label" for="matakuliah2">Genap</label>
                </div>

                <!-- Tambahkan pilihan radio button sesuai kebutuhan -->
            </div>
            <div class="btn-group">
              <button class="btn btn-primary" type="submit">Tambah</button>
              <router-link class="btn btn-danger" to="/krs">Kembali</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>
  
  
  
  <script>
  import axios from 'redaxios';
  
  export default {
    name: 'TambahKrs',
    data() {
      return {
        krs: {
            'id': '',
            'tahun': '',
            'semester': '',
        },
      };
    },
    created() {
      //
    },
    methods: {
        tambahKrs() {
        var url = 'http://127.0.0.1:8000/api/krs';
        axios.post(url, this.krs).then(() => {
          console.log('Data Berhasil Ditambahkan');
          // Redirect ke halaman lain atau lakukan tindakan lain yang diperlukan
          this.$router.push('/krs');
        }).catch((error) => {
          console.error('Error adding data:', error);
        });
      }
    }
  };
  </script>
  