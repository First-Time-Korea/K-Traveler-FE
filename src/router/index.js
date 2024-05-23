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
import { usePlanStore } from "@/stores/plan.js";
import { useAttracionStore } from "@/stores/attraction";

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

router.afterEach((to, from) => {
  const planStore = usePlanStore();
  const attractionStore = useAttracionStore();
  if (from.meta.discardPlanState) {
    //from==plan이고 얘는 상태 유지를 하고 싶지 않음
    planStore.clearPlans();
  }
  if (from.meta.discardAttractionState) {
    attractionStore.clearSearchData();
  }
});

export default router;
