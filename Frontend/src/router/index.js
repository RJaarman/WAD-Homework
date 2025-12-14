import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import APost from "../views/APost.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import auth from "../auth";
import AddPost from "../views/AddPost.vue";


const requireAuth = async (to, from, next) => {
    const authResult = await auth.authenticated();
    if (!authResult) {
        next("/login");
    } else {
        next();
    }
}

const routes = [{
        path: "/",
        name: "home",
        component: HomeView,
        beforeEnter: requireAuth,
    },
    {
        path: "/apost/:id",
        name: "APost",
        component: APost,
        beforeEnter: requireAuth,
    },
    {
        path: "/addpost",
        name: "AddPost",
        component: AddPost,
        beforeEnter: requireAuth,
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
    },
    {
        path: "/login",
        name: "LogIn",
        component: LogIn,
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;