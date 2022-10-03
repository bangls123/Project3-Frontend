import LoadableComponent from '../Loadable/index';

const userRouter: any = [
    {
        key: 'user-layout',
        path: '/user',
        name: 'user',
        title: 'User',
        component: LoadableComponent(() => import('../Layout/UserLayout')),
        isLayout: true,
        showInMenu: false,
    },
    {
        key: 'user-login',
        path: '/user/login',
        name: 'login',
        title: 'LogIn',
        component: LoadableComponent(() => import('../../scenes/Login')),
        showInMenu: false,
    },
];

export default userRouter;
