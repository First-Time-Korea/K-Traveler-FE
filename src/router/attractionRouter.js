import TheAttractionView from "@/views/TheAttractionView.vue";
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
    path: "/attraction",
    name: "attraction",
    beforeEnter: onlyAuthUser,
    component: () => TheAttractionView,
    redirect: "/attraction/search",
    children: [
      {
        path: "search",
        name: "attraction-search",
        component: () => TheAttractionView,
      },
    ],
  },
];
