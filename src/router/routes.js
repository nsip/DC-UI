
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
  { path: '/dashboard/:username', name: 'dashboard', component: () => import('components/dashboard/Dashboard.vue'), meta: { auth: true }, props: true },
  { path: ':username/:lessonId/modify', name: 'modify', component: () => import('components/courseplan/Coursemodify.vue'), meta: { auth: true }, props: true },
  { path: '/account-setting', name: 'setting', component: () => import('components/dashboard/Setting.vue'), meta: { auth: true }, props: true },
  { path: '/coursedetail', name: 'subject', component: () => import('components/courses/subject.vue'), meta: { auth: true }, props: true },
  { path: '/coursesummary', name: 'coursesummary', component: () => import('components/summary/CourseSummary.vue'), meta: { auth: true }, props: true },
  { path: '/scopeandsequnce', name: 'scopeandsequnce', component: () => import('components/search/ScopeSequnce.vue'), meta: { auth: true }, props: true },
  { path: '/courseplaner/:username', name: 'courseplaner', component: () => import('components/courseplan/CoursePlan.vue'), meta: { auth: true }, props: true },
  { path: ':username/:lessonId/schedule', name: 'schedule', component: () => import('components/schedule/Schedule.vue'), meta: { auth: true }, props: true },
  { path: ':username/:scheduleId/modifyschedule', name: 'modifyschedule', component: () => import('components/schedule/ModifySchedule.vue'), meta: { auth: true }, props: true },
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
