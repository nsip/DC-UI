
const routes = [
  {
    path: '/',
    component: () => import('layouts/Index.vue')
    // children: [
    //   { path: '', name: 'Home', component: () => import('layouts/Index.vue') },
    //   { path: '/register', component: () => import('components/auth/Register.vue') },
    //   { path: '/login', name: 'login', component: () => import('components/auth/Login.vue') },
    //   { path: '/dashboard', component: () => import('components/Dashboard.vue') },
    //   { path: '/scope&sequnce',
    //     component: () => import('components/search/SearchLayout.vue')
    //     // children: [
    //     //   { path: '/:course', component: () => import('components/search/Subject.vue') }
    //     // ]
    //   },
    //   { path: '/coursedetail', name: 'subject', component: () => import('components/courses/subject.vue'), props: true },
    //   { path: '/coursesummary', component: () => import('components/summary/CourseSummary.vue') },
    //   { path: '/courseplaner', name: 'courseplaner', component: () => import('components/courseplan/CourseLayout.vue'), props: true }
    // ]
  },
  {
    path: '/auth/register',
    component: () => import('components/auth/Register.vue')
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('components/auth/Login.vue')
  },
  { path: '/dashboard', name: 'dashboard', component: () => import('components/dashboard/Dashboard.vue'), props: true },
  { path: '/account-setting', name: 'setting', component: () => import('components/dashboard/Setting.vue'), props: true },
  { path: '/scope&sequnce', component: () => import('components/search/SearchLayout.vue') },
  { path: '/coursedetail', name: 'subject', component: () => import('components/courses/subject.vue'), props: true },
  { path: '/coursesummary', component: () => import('components/summary/CourseSummary.vue') },
  { path: '/courseplaner', name: 'courseplaner', component: () => import('components/courseplan/CourseLayout.vue'), props: true },
  // Undefine router
  {
    path: '*',
    redirect: '/'
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
