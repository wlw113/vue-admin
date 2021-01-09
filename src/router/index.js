import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:"login"
  },
  {
    path:"/Login",
    name:"login",
    component:()=>import("../views/Login/index.vue")
  },
  {
    path:"/Layout",
    name:"Layout",
    redirect:"index",
    component:()=>import("../views/Layout/index.vue"),
    children:[
      {
        path:"/index",
        name:"index",
        component:()=>import("../views/Home/index.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
