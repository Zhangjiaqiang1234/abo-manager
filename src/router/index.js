import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/UserManager',
    children: [{
      path: 'index',
      component: () => import('@/views/user/UserManager'),
      name: 'userManager',
      meta: { title: 'userManager', icon: 'user', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/management',
    component: Layout,
    redirect: '/management/Article/list',
    name: 'management',
    meta: {
      title: 'management',
      icon: 'example'
    },
    children: [
      { path: '/management/Article/list', component: () => import('@/views/management/Article/list'), name: 'article', meta: { title: 'article', icon: 'list' }},
      { path: '/management/Article/create', component: () => import('@/views/management/Article/create'), name: 'createArticle', meta: { title: 'createArticle', noCache: true }, hidden: true },
      { path: '/management/Article/edit/:id(\\d+)', component: () => import('@/views/management/Article/edit'), name: 'editArticle', meta: { title: 'editArticle', noCache: true }, hidden: true },
      { path: '/management/Banner/list', component: () => import('@/views/management/Banner/list'), name: 'banner', meta: { title: 'banner', icon: 'list' }},
      { path: '/management/Banner/create/:showFlagNum(\\d+)', component: () => import('@/views/management/Banner/create'), name: 'createBanner', meta: { title: 'createBanner', noCache: true }, hidden: true },
      { path: '/management/Banner/edit/:id(\\d+)/:showFlagNum(\\d+)', component: () => import('@/views/management/Banner/edit'), name: 'editBanner', meta: { title: 'editBanner', noCache: true }, hidden: true },
      { path: '/management/Message/list', component: () => import('@/views/management/Message/list'), name: 'message', meta: { title: 'message', icon: 'message' }},
      { path: '/management/Message/create', component: () => import('@/views/management/Message/create'), name: 'createMessage', meta: { title: 'createMessage', noCache: true }, hidden: true },
      { path: '/management/Message/edit/:id(\\d+)', component: () => import('@/views/management/Message/edit'), name: 'editMessage', meta: { title: 'editMessage', noCache: true }, hidden: true },
      { path: '/management/Feedback/list', component: () => import('@/views/management/Feedback/list'), name: 'Feedback', meta: { title: 'Feedback', icon: 'form' }},
      { path: '/management/Feedback/FeedbackDetail/:id(\\d+)', component: () => import('@/views/management/Feedback/FeedbackDetail'), name: 'FeedbackDetail', meta: { title: 'FeedbackDetail', noCache: true }, hidden: true },
      { path: '/management/Festival/list', component: () => import('@/views/management/Festival/list'), name: 'Festival', meta: { title: 'Festival', icon: 'list' }},
      { path: '/management/Festival/FestivalDetail/:id(\\d+)', component: () => import('@/views/management/Festival/FestivalDetail'), name: 'FestivalDetail', meta: { title: 'Festival', noCache: true }, hidden: true },
      { path: '/management/GeneticTesting/list', component: () => import('@/views/management/GeneticTesting/list'), name: 'GeneticTesting', meta: { title: 'GeneticTesting', icon: 'list' }}
    ]
  },
  {
    path: '/score',
    component: Layout,
    redirect: '/score/list',
    name: 'score',
    meta: {
      title: 'score',
      icon: 'example'
    },
    children: [
      { path: '/score/list', component: () => import('@/views/Score/list'), name: 'scoreList', meta: { title: 'scoreList', icon: 'list' }},
      { path: '/score/scoreWithdrawal', component: () => import('@/views/Score/scoreWithdrawal'), name: 'scoreWithdrawal', meta: { title: 'scoreWithdrawal', icon: 'list' }}

    ]
  },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1/menu1-1',
  //   name: 'nested',
  //   meta: {
  //     title: 'nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'menu1',
  //       meta: { title: 'menu1' },
  //       redirect: '/nested/menu1/menu1-1',
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'menu1-1',
  //           meta: { title: 'menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'menu1-2',
  //           redirect: '/nested/menu1/menu1-2/menu1-2-1',
  //           meta: { title: 'menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'menu1-2-1',
  //               meta: { title: 'menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'menu1-2-2',
  //               meta: { title: 'menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'menu1-3',
  //           meta: { title: 'menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       name: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'errorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     { path: '401', component: () => import('@/views/errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
  //     { path: '404', component: () => import('@/views/errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [{ path: 'log', component: () => import('@/views/errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     { path: 'export-excel', component: () => import('@/views/excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
  //     { path: 'export-selected-excel', component: () => import('@/views/excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
  //     { path: 'upload-excel', component: () => import('@/views/excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [{ path: 'download', component: () => import('@/views/zip/index'), name: 'exportZip', meta: { title: 'exportZip' }}]
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [{ path: 'index', component: () => import('@/views/theme/index'), name: 'theme', meta: { title: 'theme', icon: 'theme' }}]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [{ path: 'index', component: () => import('@/views/clipboard/index'), name: 'clipboardDemo', meta: { title: 'clipboardDemo', icon: 'clipboard' }}]
  // },

  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [{ path: 'index', component: () => import('@/views/i18n-demo/index'), name: 'i18n', meta: { title: 'i18n', icon: 'international' }}]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
