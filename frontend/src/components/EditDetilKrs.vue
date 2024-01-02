<!-- EditDetilKrs.vue -->
<template>
    <div class="container mt-4">
      <div class="card shadow p-3 mb-5 bg-white rounded">
        <div class="card-body">
            <h2 class="card-title">Edit Data Detil KRS</h2>
            <form @submit.prevent="simpan">
                <div class="mb-3">
                    <label for="krs_id" class="form-label">Tahun - Semester</label>
                    <select class="form-select" v-model="detilKrs.krs_id" required>
                        <option v-for="krs in KRSList" :key="krs.id" :value="krs.id">
                            {{ krs.tahun }} - {{ krs.semester }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="kodeMatkul" class="form-label">Kode Matakuliah</label>
                    <select class="form-select" v-model="detilKrs.matakuliah_id" required>
                    <option v-for="matakuliah in MatakuliahList" :key="matakuliah.id" :value="matakuliah.id">
                        {{ matakuliah.kode }} - {{ matakuliah.namamatakuliah }}
                    </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="nim" class="form-label">NIM Mahasiswa</label>
                    <select class="form-select" v-model="detilKrs.mahasiswa_id" required>
                        <option v-for="mahasiswa in MahasiswaList" :key="mahasiswa.id" :value="mahasiswa.id">
                            {{ mahasiswa.nim }} - {{ mahasiswa.nama }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="nilai" class="form-label">Nilai</label>
                    <input type="text" class="form-control" v-model="detilKrs.nilai" required>
                </div>
                <div class="btn-group">
                    <button type="submit" class="btn btn-primary">Tambah Data</button>
                    <router-link class="btn btn-danger" to="/detilkrs">Kembali</router-link>
                </div>
            </form>
        </div>
      </div>
    </div>
</template>
  
    
    <script>
    import axios from 'redaxios';
    
    export default {
        name: 'EditDetilKrs',
        data() {
            return {
            DetilKrsId: this.$route.params.id,
            detilKrs: {
                'krs_id': '',
                'matakuliah_id': '',
                'mahasiswa_id': '',
                'nilai': '',
            },
            MahasiswaList: [],
            MatakuliahList: [],
            KRSList: []
            };
        },
        created() {
            // Ambil data mahasiswa yang akan diedit menggunakan ID dari URL atau properti lainnya
            this.fetchDetilKrsData();
            this.loadMatakuliahList();
            this.loadMahasiswaList();
            this.loadKrsList();
        },
      methods: {
        fetchDetilKrsData() {
          var url = `http://127.0.0.1:8000/api/detilkrs/${this.DetilKrsId}`;
          axios.get(url).then(({ data }) => {
            console.log(data);
            this.detilKrs = data;
          });
        },
        loadMatakuliahList() {
            var matkulurl = 'http://127.0.0.1:8000/api/matakuliah';
            axios.get(matkulurl).then(({ data }) => {
            this.MatakuliahList = data;
            });
        },
        loadMahasiswaList() {
            var mhsurl = 'http://127.0.0.1:8000/api/mahasiswa';
            axios.get(mhsurl).then(({ data }) => {
            this.MahasiswaList = data;
            });
        },
        loadKrsList() {
            var krsurl = 'http://127.0.0.1:8000/api/krs';
            axios.get(krsurl).then(({ data }) => {
            this.KRSList = data;
            });
        },
        simpan() {
          var url = `http://127.0.0.1:8000/api/detilkrs/${this.detilKrs.id}`;
          axios.put(url, this.detilKrs).then(() => {
            console.log('Data Berhasil Di edit');
            // Redirect kembali ke halaman utama atau lakukan tindakan lain yang diperlukan
            this.$router.push('/detilkrs'); // Contoh penggunaan Vue Router untuk kembali ke halaman data mahasiswa
          });
        }
      }
    };
    </script>
    