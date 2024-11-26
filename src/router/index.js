import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import MovieDetail from '../views/MovieDetail.vue'
import ActorDetail from "../views/ActorDetail.vue";

const routes = [
    {path:'/',name:'Home',component:Home},
    {path:'/movie/:id',name:'MovieDetail',component:MovieDetail},
    {path: "/actor/:name",name: "ActorDetail", component: ActorDetail},
]

// Router yapılandırması
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;