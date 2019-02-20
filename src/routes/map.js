import Home from '../views/Home';
import Login from '../views/Login';
import Signin from '../views/Signin';
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
        path: '/signin',
        component: Signin,
    },
    {
        path: '/404',
        component: Error,
    }
];