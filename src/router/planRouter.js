import ThePlanView from "@/views/ThePlanView.vue";
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

export default [
  {
    path: "/plan",
    name: "plan",
    beforeEnter: onlyAuthUser,
    component: ThePlanView,
    children: [
      {
        path: "region",
        name: "choice-region",
        component: () => import("@/views/plan/ThePlanRegionChoiceView.vue"),
      },
    ],
  },
];
