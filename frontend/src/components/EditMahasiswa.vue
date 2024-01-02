<template>
  <div class="container mt-4">
    <div class="card shadow p-3 mb-5 bg-white rounded">
      <div class="card-body">
        <h2 class="card-title">Edit Data Mahasiswa</h2>
        <form @submit.prevent="simpan()">
          <div class="mb-3">
            <label for="nim" class="form-label">NIM</label>
            <input type="text" class="form-control" id="nim" v-model="Mahasiswa.nim" />
          </div>
          <div class="mb-3">
            <label for="nama" class="form-label">Nama</label>
            <input type="text" class="form-control" id="nama" v-model="Mahasiswa.nama" />
          </div>
          <div class="mb-3">
            <label for="alamat" class="form-label">Alamat</label>
            <input type="text" class="form-control" id="alamat" v-model="Mahasiswa.alamat" />
          </div>
          <div class="mb-3">
            <label for="tanggal_lahir" class="form-label">Tanggal Lahir</label>
            <input type="date" class="form-control" id="tanggal_lahir" v-model="Mahasiswa.lahir" />
          </div>
          <div class="mb-3">
            <label for="agama" class="form-label">Agama</label>
            <select class="form-select" id="agama" v-model="Mahasiswa.agama_id">
              <option v-for="agama in agamaList" :key="agama.id" :value="agama.id">{{ agama.agama }}</option>
            </select>
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
  name: 'EditMahasiswa',
  data() {
    return {
      mahasiswaId: this.$route.params.id,
      agamaList: [],
      Mahasiswa: {
        id: '',
        nim: '',
        nama: '',
        alamat: '',
        lahir: '',
        agama_id: '',
      },
    };
  },
  created() {
    // Ambil data mahasiswa yang akan dilihat menggunakan ID dari URL atau properti lainnya
    this.fetchMahasiswaData();
    this.loadAgamaList();
  },
  methods: {
    fetchMahasiswaData() {
      var url = `http://127.0.0.1:8000/api/mahasiswa/${this.mahasiswaId}`;
      axios.get(url).then(({ data }) => {
        console.log(data);
        this.Mahasiswa = data;
      });
    },
    simpan() {
      var url = `http://127.0.0.1:8000/api/mahasiswa/${this.Mahasiswa.id}`;
      axios.put(url, this.Mahasiswa).then(() => {
        console.log('Data Berhasil Di edit');
        // Redirect kembali ke halaman utama atau lakukan tindakan lain yang diperlukan
        this.$router.push('/datamahasiswa'); // Contoh penggunaan Vue Router untuk kembali ke halaman data mahasiswa
      });
    },
    loadAgamaList() {
      // Permintaan untuk mendapatkan daftar agama
      var agamaUrl = 'http://127.0.0.1:8000/api/agama';
      axios.get(agamaUrl).then(({ data }) => {
        console.log(data);
        this.agamaList = data;
      });
    },
  },
};
</script>
