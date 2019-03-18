
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/Index.vue')
    // children: [
    //   { path: '', name: 'Home', component: () => import('layouts/Index.vue') },
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
  { path: '/:lessonId/modify', name: 'modify', component: () => import('components/courseplan/Coursemodify.vue'), props: true },
  { path: '/account-setting', name: 'setting', component: () => import('components/dashboard/Setting.vue'), props: true },
  // { path: '/scope&sequnce', component: () => import('components/search/searchbox.vue') },
  { path: '/coursedetail', name: 'subject', component: () => import('components/courses/subject.vue'), props: true },
  { path: '/coursesummary', component: () => import('components/summary/CourseSummary.vue') },
  { path: '/scopeandsequnce', component: () => import('components/search/ScopeSequnce.vue') },
  { path: '/courseplaner', name: 'courseplaner', component: () => import('components/courseplan/CoursePlan.vue'), props: true },
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
