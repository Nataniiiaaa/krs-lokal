<!-- resources/views/mahasiswa/create.blade.php -->



<?php $__env->startSection('content'); ?>
<div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card" style="margin-top:60px;">
                    <div class="card-header w3-teal text-white">
                        <h2 class="mb-0">Tambah Data KRS</h2>
                    </div>
                    <div class="card-body">
                    <form method="get" action="<?php echo e(url('api/krs/store')); ?>"  >
                            <?php echo csrf_field(); ?>
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
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /Users/user/Downloads/Prognet-KRS-main/resources/views/admin/tambahkrs.blade.php ENDPATH**/ ?>