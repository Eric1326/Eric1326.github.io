export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },

  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      { path: '/', redirect: '/articles' },
      // 首页，即文章列表页
      {
        path: '/articles',
        name: 'articles',
        icon: 'home',
        component: '../pages/HomePage/ArticleList',
      },
      // 文章详情页
      {
        path: '/article/:id',
        name: 'article',
        hideInMenu: true,
        component: '../pages/HomePage/ArticleDetail',
      },
      // 标签页
      {
        path: '/tags',
        name: 'tags',
        icon: 'tag',
        component: '../pages/HomePage/Tags',
      },
      // 标签下文章列表
      {
        path: '/tagArticle/:tags',
        name: 'tagArticle',
        hideInMenu: true,
        component: '../pages/HomePage/TagArticle',
      },
      {
        component: '404',
      },
    ],
  },

  
];
