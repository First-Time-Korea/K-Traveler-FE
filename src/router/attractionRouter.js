import TheAttractionView from "@/views/TheAttractionView.vue";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";

const onlyAuthUser = async (to, from, next) => {
  const memberStore = useMemberStore();
  const { checkLoginStatus } = memberStore;
  if (checkLoginStatus()) {
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
    component: TheAttractionView,
    // redirect: "/n"
  },
];
