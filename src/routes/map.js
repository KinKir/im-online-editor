import Home from '../views/Home';
import Login from '../views/Login';
import Error from '../views/Error';

export default [
    {
        path: '/home',
        component: Home,
        isAuth: true,
        hasChild:true,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/404',
        component: Error,
    }
];