<template>
  <div class="container mt-4">
    <div class="card shadow p-3 mb-5 bg-white rounded">
      <div class="card-body">
        <h2 class="card-title">Tambah Mahasiswa</h2>
        <form @submit.prevent="tambahMahasiswa">
          <div class="mb-3">
            <label for="nim" class="form-label">NIM</label>
            <input type="text" class="form-control" id="nim" v-model="mahasiswa.nim">
          </div>
          <div class="mb-3">
            <label for="nama" class="form-label">Nama</label>
            <input type="text" class="form-control" id="nama" v-model="mahasiswa.nama">
          </div>
          <div class="mb-3">
            <label for="alamat" class="form-label">Alamat</label>
            <input type="text" class="form-control" id="alamat" v-model="mahasiswa.alamat">
          </div>
          <div class="mb-3">
            <label for="tanggal_lahir" class="form-label">Tanggal Lahir</label>
            <input type="date" class="form-control" id="tanggal_lahir" v-model="mahasiswa.lahir">
          </div>
          <div class="mb-3">
            <label for="agama" class="form-label">Agama</label>
            <select class="form-select" id="agama" v-model="mahasiswa.agama_id">
              <option v-for="agama in agamaList" :key="agama.id" :value="agama.id">{{ agama.agama }}</option>
            </select>
          </div>
          <div class="btn-group">
            <button class="btn btn-primary" type="submit">Tambah</button>
            <router-link class="btn btn-danger" to="/datamahasiswa">Kembali</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'redaxios';

export default {
  name: 'TambahMahasiswa',
  data() {
    return {
      mahasiswa: {
        'nim': '',
        'nama': '',
        'alamat': '',
        'lahir': '',
        'agama_id': ''
      },
      agamaList: [],
    };
  },
  created() {
    this.loadAgamaList();
  },
  methods: {
    loadAgamaList() {
      var agamaUrl = 'http://127.0.0.1:8000/api/agama';
      axios.get(agamaUrl).then(({ data }) => {
        this.agamaList = data;
      });
    },
    async tambahMahasiswa() {
      // Validasi NIM tidak boleh kosong
      if (!this.mahasiswa.nim) {
        window.alert('NIM tidak boleh kosong.');
        return;
      }

      // Validasi NIM tidak boleh sama dengan yang sudah ada
      if (await this.isNIMExist(this.mahasiswa.nim)) {
        window.alert('NIM sudah ada. Gunakan NIM yang berbeda.');
        return;
      }

      // Kirim permintaan ke backend hanya jika validasi NIM sukses
      var url = 'http://127.0.0.1:8000/api/mahasiswa';
      axios.post(url, this.mahasiswa).then(() => {
        console.log('Data Berhasil Ditambahkan');
        // Redirect ke halaman lain atau lakukan tindakan lain yang diperlukan
        this.$router.push('/datamahasiswa');
      }).catch((error) => {
        console.error('Error adding data:', error);
      });
    },
    async isNIMExist(nim) {
      try {
        const response = await axios.get('https://api-group7-prognet.manpits.xyz/api/mahasiswa');
        const existingNIMs = response.data.map((mahasiswa) => mahasiswa.nim);
        return existingNIMs.includes(nim);
      } catch (error) {
        console.error('Error fetching existing NIMs:', error);
        return false;
      }
    },
  },
};
</script>
