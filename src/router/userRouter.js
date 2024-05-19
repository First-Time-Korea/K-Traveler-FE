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
    path: "/user",
    name: "user",
    component: () => import("@/views/TheUserView.vue"),
    children: [
      {
        path: "login",
        name: "user-login",
        component: () => import("@/components/user/UserLogin.vue"),
      },
      {
        path: "join",
        name: "user-join",
        component: () => import("@/components/user/UserRegister.vue"),
      },
      {
        path: "mypage",
        name: "user-mypage",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/user/UserMyPage.vue"),
      },
    ],
  },
];
