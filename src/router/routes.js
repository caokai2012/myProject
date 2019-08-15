export default [
    {
      path: '/',
      name: 'home',
      component:() => import('view/home/index')
    },
    {
      path: '/home',
      redirect: { name: 'home' },
    },
    // 关于我们
    {
      path:'/about',
      name:'about',
      component:() => import('view/about/index'),
      redirect: { name: 'abstract' },
      children:[
        {
          path:'/about/abstract',
          name:'abstract',
          component:() => import('components/about/introduction')
        },
        {
          path:'/about/honor',
          name:'honor',
          component:() => import('components/about/honor')
        }
      ]
    },
    // 产品中心
    {
      path:'/product/:id',
      props:true,
      name:'product',
      component:() => import('view/product/index'),
    },
    // 联系我们
    {
      path:'/contact',
      name:'contact',
      component:() => import('view/contact/index')
    },
    // 新闻
    {
      path:'/news',
      name:'news',
      component: () => import('view/news/index')
    },
    // 新闻详情
    {
      path:'/news/detail',
      name:'newsDetail',
      component: () => import('view/news/detail'),
    },
    // 工程业绩
    {
      path:'/project/:id',
      props:true,    
      name:'project',
      component: () => import('view/project/index')
    },
     // 工程业绩详情
    {
      path:'/project/detail',
      name:'projectDetail',
      component: () => import('view/project/detail')
    },
    // 知识园地
    {
      path:'/knowledge/:id',
      props:true,
      name:'knowledge',
      component: () => import('view/knowledge/index')
    },
     // 知识园地详情
    {
      path:'/knowledge/detail',
      name:'knowledgeDetail',
      component: () => import('view/knowledge/detail')
    },
    // 专卖店
    {
      path:'/shop',
      name:'shop',
      component: () => import('view/shop/index')
    },
    // 专卖店详情
    {
      path:'/shop/detail',
      name:'shopDetail',
      component: () => import('view/shop/detail')
    },
    // 招商加盟
    {
      path:'/join',
      name:'join',
      component: () => import('view/join/index')
    },
    // 招商加盟
    {
      path:'/scroll',
      name:'scroll',
      component: () => import('base/scrollList')
    }
  ]