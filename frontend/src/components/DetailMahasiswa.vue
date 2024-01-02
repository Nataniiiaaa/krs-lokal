<template>
  <div class="container mt-5">
    <div class="card shadow p-4 mb-3 bg-white rounded">
      <div class="card-body">
        <h2 class="card-title">Detail Data Mahasiswa</h2>
        <ul class="list-group">
          <li class="list-group-item">
            <strong>NIM:</strong> {{ Mahasiswa.nim }}
          </li>
          <li class="list-group-item">
            <strong>Nama:</strong> {{ Mahasiswa.nama }}
          </li>
          <li class="list-group-item">
            <strong>Alamat:</strong> {{ Mahasiswa.alamat }}
          </li>
          <li class="list-group-item">
            <strong>Tanggal Lahir:</strong> {{ Mahasiswa.lahir }}
          </li>
          <li class="list-group-item">
            <strong>Agama:</strong> {{ getAgamaName(Mahasiswa.agama_id) }}
          </li>
        </ul>
        <div class="btn-group mt-3">
          <router-link class="btn btn-warning" to="/datamahasiswa">Kembali</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'redaxios';

export default {
  name: 'DetailMahasiswa',
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
    this.fetchMahasiswaData();
    this.loadAgamaList();
  },
  methods: {
    fetchMahasiswaData() {
      var url = `http://127.0.0.1:8000/api/mahasiswa/${this.mahasiswaId}`;
      axios.get(url).then(({ data }) => {
        this.Mahasiswa = data;
      });
    },
    loadAgamaList() {
      var agamaUrl = 'http://127.0.0.1:8000/api/agama';
      axios.get(agamaUrl).then(({ data }) => {
        this.agamaList = data;
      });
    },
    getAgamaName(agamaId) {
      const agama = this.agamaList.find(a => a.id === agamaId);
      return agama ? agama.agama : '';
    },
  },
};
</script>
