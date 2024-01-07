<template>
  <div class="container mt-4">
    <div class="card shadow p-3 mb-5 bg-white rounded">
      <div class="card-body">
        <h2 class="card-title">Edit Data Matakuliah</h2>
        <form @submit.prevent="simpan()">
          <div class="mb-3">
              <label for="kode" class="form-label">Kode</label>
              <input type="text" class="form-control" id="kode" v-model="matakuliah.kode">
            </div>
            <div class="mb-3">
              <label for="namamatakuliah" class="form-label">Nama Matakuliah</label>
              <input type="text" class="form-control" id="namamatakuliah" v-model="matakuliah.namamatakuliah">
            </div>
            <div class="mb-3">
              <label for="sks" class="form-label">SKS</label>
              <input type="text" class="form-control" id="sks" v-model="matakuliah.sks">
            </div>
            <div class="mb-3">
              <label for="semester" class="form-label">Semester</label>
              <input type="text" class="form-control" id="semester" v-model="matakuliah.semester">
            </div>
          <div class="btn-group">
            <button class="btn btn-primary" type="submit">Simpan</button>
            <router-link class="btn btn-warning" to="/datamahasiswa">Kembali</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>




<script>
import axios from 'redaxios'; // Pastikan bahwa Anda mengimport axios

export default {
name: 'EditMataKuliah',
data() {
  return {
    MatakuliahId: this.$route.params.id,
    agamaList: [],
    matakuliah: {
      'id': '',
      'kode': '',
      'namamatakuliah': '',
      'sks': '',
      'semester': ''
    }
  };
},
created() {
  // Ambil data mahasiswa yang akan diedit menggunakan ID dari URL atau properti lainnya
  this.fetchMahasiswaData();
},
methods: {
  fetchMahasiswaData() {
    var url = `http://127.0.0.1:8000/api/matakuliah/${this.MatakuliahId}`;
    axios.get(url).then(({ data }) => {
      console.log(data);
      this.matakuliah = data;
    });
  },
  simpan() {
    var url = `http://127.0.0.1:8000/api/matakuliah/${this.matakuliah.id}`;
    axios.put(url, this.matakuliah).then(() => {
      console.log('Data Berhasil Di edit');
      // Redirect kembali ke halaman utama atau lakukan tindakan lain yang diperlukan
      this.$router.push('/matakuliah'); // Contoh penggunaan Vue Router untuk kembali ke halaman data mahasiswa
    });
  },
}
};
</script>
