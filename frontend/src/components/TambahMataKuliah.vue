<template>
    <div class="container mt-4">
      <div class="card shadow p-3 mb-5 bg-white rounded">
        <div class="card-body">
          <h2 class="card-title">Tambah Matakuliah</h2>
          <form @submit.prevent="tambahMatakuliah">
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
              <button class="btn btn-primary" type="submit">Tambah</button>
              <router-link class="btn btn-danger" to="/matakuliah">Kembali</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>
  
  
  
<script>
import axios from 'redaxios';

export default {
  name: 'TambahMataKuliah',
  data() {
    return {
      matakuliah: {
        'kode': '',
        'namamatakuliah': '',
        'sks': '',
        'semester': ''
      },
    };
  },
  methods: {
    async tambahMatakuliah() {
      // Validasi Kode Matakuliah tidak boleh kosong
      if (!this.matakuliah.kode) {
        window.alert('Kode Matakuliah tidak boleh kosong.');
        return;
      }

      // Validasi Kode Matakuliah tidak boleh sama dengan yang sudah ada
      if (await this.isKodeMatakuliahExist(this.matakuliah.kode)) {
        window.alert('Kode Matakuliah sudah ada. Gunakan Kode Matakuliah yang berbeda.');
        return;
      }

      // Kirim permintaan ke backend hanya jika validasi Kode Matakuliah sukses
      var url = 'http://127.0.0.1:8000/api/matakuliah';
      axios.post(url, this.matakuliah).then(() => {
        console.log('Data Berhasil Ditambahkan');
        // Redirect ke halaman lain atau lakukan tindakan lain yang diperlukan
        this.$router.push('/matakuliah');
      }).catch((error) => {
        console.error('Error adding data:', error);
      });
    },
    async isKodeMatakuliahExist(kode) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/matakuliah');
        const existingKodeMatakuliah = response.data.map((matakuliah) => matakuliah.kode);
        return existingKodeMatakuliah.includes(kode);
      } catch (error) {
        console.error('Error fetching existing Kode Matakuliah:', error);
        return false;
      }
    },
  },
};
</script>
  