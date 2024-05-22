import { useMemberStore } from "@/stores/member";

const onlyAuthUser = async (to, from, next) => {
  const store = useMemberStore();
  if (store.isLogin) {
    next();
  } else {
    next({ name: "user-login" });
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
