<!-- resources/views/mahasiswa/create.blade.php -->

@extends('layouts.app')

@section('content')
<div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card" style="margin-top:60px;">
                    <div class="card-header w3-teal text-white">
                        <h2 class="mb-0">Tambah Data KRS</h2>
                    </div>
                    <div class="card-body">
                    <form method="get" action="{{ url('api/krs/store') }}"  >
                            @csrf
                            <div class="form-group">
                                <label for="tahun">Tahun:</label>
                                <input type="text" name="tahun" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="semester">Semester:</label>
                                <input type="text" name="semester" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="w3-btn w3-round-xlarge w3-teal">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
