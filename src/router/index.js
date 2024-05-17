import { createRouter, createWebHistory } from "vue-router";
import TheMainView from "@/views/TheMainView.vue";
import TheAttractionView from "@/views/TheAttractionView.vue";
import UserRouter from "@/router/userRouter.js";

import { storeToRefs } from "pinia";

import { useMemberStore } from "@/stores/member";

const onlyAuthUser = async (to, from, next) => {
  const memberStore = useMemberStore();
  const { userInfo, isValidToken } = storeToRefs(memberStore);
  const { getUserInfo } = memberStore;

  let token = sessionStorage.getItem("accessToken");

  if (userInfo.value != null && token) {
    await getUserInfo(token);
  }
  if (!isValidToken.value || userInfo.value === null) {
    next({ name: "user-login" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMainView,
    },
    {
      path: "/attraction",
      name: "attraction",
      component: TheAttractionView,
    },

    ...UserRouter,
  ],
});

export default router;
