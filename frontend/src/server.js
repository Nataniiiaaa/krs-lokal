// File: server.js (atau nama file server backend Anda)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const mahasiswaList = []; // Menyimpan daftar mahasiswa

// Endpoint untuk menambahkan mahasiswa
app.post('http://127.0.0.1:8000/api/mahasiswa', (req, res) => {
  const newMahasiswa = req.body;

  // Validasi NIM
  if (isNIMExist(newMahasiswa.nim)) {
    return res.status(400).json({ message: 'NIM sudah ada. Gunakan NIM yang berbeda.' });
  }

  mahasiswaList.push(newMahasiswa);
  res.status(201).json({ message: 'Mahasiswa berhasil ditambahkan.' });
});

// Fungsi untuk memeriksa apakah NIM sudah ada
function isNIMExist(nim) {
  return mahasiswaList.some(mahasiswa => mahasiswa.nim === nim);
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
