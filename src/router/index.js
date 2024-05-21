import { createRouter, createWebHistory } from "vue-router";
import TheMainView from "@/views/TheMainView.vue";
import UserRouter from "@/router/userRouter.js";
import AttractionRouter from "@/router/attractionRouter";
import ThemeRouter from "@/router/themeRouter.js";
import PlanRouter from "@/router/planRouter";
import BoardRouter from "@/router/boardRouter.js";
import MyPageRouter from "@/router/myPageRouter";

import { storeToRefs } from "pinia";

import { useMemberStore } from "@/stores/member";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMainView,
    },
    ...UserRouter,
    ...AttractionRouter,
    ...ThemeRouter,
    ...PlanRouter,
    ...BoardRouter,
    ...MyPageRouter,
  ],
});

export default router;
