export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {path: '/user', redirect: '/user/login'},
      {path: '/user/login', component: './User/Login'},
      {path: '/user/register', component: './User/Register'},
      {path: '/user/register-result', component: './User/RegisterResult'},
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [

      {path: '/', redirect: '/usermanagement/userchart'},
      //用户管理
      {
        path: '/usermanagement',
        icon: 'dashboard',
        name: 'usermanagement',
        routes: [
          {
            path: '/usermanagement/userchart',
            name: 'userchart',
            component: './UserManagement/Userchart',
          },
        ],
      },
      //日志模块
      {
        path: '/dailylog',
        icon: 'form',
        name: 'dailylog',
        routes: [
          {
            path: '/dailylog/dailylogsubmit',
            name: 'dailylogsubmit',
            component: './DailyLog/DailyLog',
          },
          {
            path: '/dailylog/emergencysubmit',
            name: 'emergencysubmit',
            component: './DailyLog/EmergencyDailyLog',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/dailylog/emergencysubmit',
                name: 'emergencysubmit',
                redirect: '/dailylog/emergencysubmit/info',
              },
              {
                path: '/dailylog/emergencysubmit/info',
                name: 'info',
                component: './DailyLog/EmergencyDailyLog/Step1',
              },
              {
                path: '/dailylog/emergencysubmit/confirm',
                name: 'confirm',
                component: './DailyLog/EmergencyDailyLog/Step2',
              },
              {
                path: '/dailylog/emergencysubmit/result',
                name: 'result',
                component: './DailyLog/EmergencyDailyLog/Step3',
              },
            ],
          },
        ],
      },
      //用户管理

      //个人中心
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/notification',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      //权限管理
      {
        path: '/permission',
        icon: 'check-circle-o',
        name: 'permission',
        routes: [
          {
            path: '/permission/management',
            name: 'tablelist',
            component: './Permission/TableList',
          },
        ],
      },
      //数据管理
      {
        path: '/data',
        icon: 'profile',
        name: 'data',
        routes: [
          {
            path: '/data/management',
            name: 'tablelist',
            component: './DataManagement/TableList',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
