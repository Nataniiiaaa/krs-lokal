// router/index.js

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard.vue'),
  },
  {
    path: '/matakuliah',
    name: 'Matakuliah',
    component: () => import('../components/MataKuliah.vue'),
  },
  {
    path: '/detailmatakuliah/:id',
    name: 'DetailMatakuliah',
    component: () => import('../components/DetailMatakuliah.vue'),
  },
  {
    path: '/datamahasiswa',
    name: 'Mahasiswa',
    component: () => import('../components/Mahasiswa.vue'),
  },
  {
    path: '/krs',
    name: 'Krs',
    component: () => import('../components/Krs.vue'),
  },
  {
    path: '/detilkrs',
    name: 'DetilKrs',
    component: () => import('../components/DetilKrs.vue'),
  },
  {
    path: '/editmahasiswa/:id',
    name: 'EditMahasiswa',
    component: () => import('../components/EditMahasiswa.vue'),
  },
  {
    path: '/editkrs/:id',
    name: 'EditKrs',
    component: () => import('../components/EditKrs.vue'),
  },
  {
    path: '/editdetilkrs/:id',
    name: 'EditDetilKrs',
    component: () => import('../components/EditDetilKrs.vue'),
  },
  {
    path: '/editmatakuliah/:id',
    name: 'EditMataKuliah',
    component: () => import('../components/EditMataKuliah.vue'),
  },
  {
    path: '/tambahmahasiswa',
    name: 'TambahMahasiswa',
    component: () => import('../components/TambahMahasiswa.vue'),
  },
  {
    path: '/tambahmatakuliah',
    name: 'TambahMataKuliah',
    component: () => import('../components/TambahMataKuliah.vue'),
  },
  {
    path: '/tambahkrs',
    name: 'TambahKrs',
    component: () => import('../components/TambahKrs.vue'),
  },
  {
    path: '/tambahdetilkrs',
    name: 'TambahDetilKrs',
    component: () => import('../components/TambahDetilKrs.vue'),
  },
  {
    path: '/detailmahasiswa/:id',
    name: 'DetailMahasiswa',
    component: () => import('../components/DetailMahasiswa.vue'),
  },
  {
    path: '/detailsemester/:id',
    name: 'DetKrs',
    component: () => import('../components/Semester.vue'),
  },
  {
    path: '/detailmatakuliah-mahasiswa/:id',
    name: 'MatkulMhs',
    component: () => import('../components/MatkulMhs.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  
  if (to.path === '/' && loggedIn) {
    return next('/login');
  }

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router;