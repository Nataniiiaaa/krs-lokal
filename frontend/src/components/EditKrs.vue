<!-- EditMahasiswa.vue -->
<template>
  <div class="container mt-4">
    <div class="card shadow p-3 mb-5 bg-white rounded">
      <div class="card-body">
        <h2 class="card-title">Edit Data KRS</h2>
        <form @submit.prevent="simpan()">
          <div class="mb-3">
            <label for="tahun" class="form-label">Tahun</label>
            <input type="text" class="form-control" id="tahun" v-model="krs.tahun" />
          </div>
          <div class="mb-3">
            <label class="form-label">Semester</label>

            <!-- Pilihan radio button -->
            <div class="form-check">
              <input class="form-check-input" type="radio" id="semester" value="Ganjil" v-model="krs.semester" />
              <label class="form-check-label" for="matakuliah1">Ganjil</label>
            </div>

            <div class="form-check">
              <input class="form-check-input" type="radio" id="semester" value="Genap" v-model="krs.semester" />
              <label class="form-check-label" for="matakuliah2">Genap</label>
            </div>

            <!-- Tambahkan pilihan radio button sesuai kebutuhan -->
          </div>
          <div class="btn-group">
            <button class="btn btn-primary" type="submit">Simpan</button>
            <router-link class="btn btn-warning" to="/krs">Kembali</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'redaxios';

export default {
  name: 'EditKrs',
  data() {
    return {
      KrsId: this.$route.params.id,
      krs: {
        id: '',
        tahun: '',
        semester: '',
      },
    };
  },
  created() {
    // Ambil data mahasiswa yang akan diedit menggunakan ID dari URL atau properti lainnya
    this.fetchMahasiswaData();
  },
  methods: {
    fetchMahasiswaData() {
      var url = `http://127.0.0.1:8000/api/krs/${this.KrsId}`;
      axios.get(url).then(({ data }) => {
        console.log(data);
        this.krs = data;
      });
    },
    simpan() {
      var url = `http://127.0.0.1:8000/api/krs/${this.krs.id}`;
      axios.put(url, this.krs).then(() => {
        console.log('Data Berhasil Di edit');
        // Redirect kembali ke halaman utama atau lakukan tindakan lain yang diperlukan
        this.$router.push('/krs'); // Contoh penggunaan Vue Router untuk kembali ke halaman data mahasiswa
      });
    },
  },
};
</script>
