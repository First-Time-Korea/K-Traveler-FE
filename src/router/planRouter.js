import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import ThePlanView from "@/views/ThePlanView.vue";
import ThePlanRegionChoiceView from "@/views/plan/ThePlanRegionChoiceView.vue";
import ThePlanScheduleChoiceView from "@/views/plan/ThePlanScheduleChoiceView.vue";
import ThePlanAttractionChoiceView from "@/views/plan/ThePlanAttractionChioceView.vue";

// import PlaceChoiceView from "@/views/plan/PlaceChoiceView.vue";

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
    // beforeEnter: onlyAuthUser,
    component: ThePlanView,
    redirect: "/plan/region",
    children: [
      {
        path: "region",
        name: "choice-region",
        component: () => ThePlanRegionChoiceView,
      },
      {
        path: "schedule",
        name: "choice-schedule",
        component: () => ThePlanScheduleChoiceView,
      },
      {
        path: "attraction",
        name: "choice-attraction",
        component: () => ThePlanAttractionChoiceView,
      },
    ],
  },
];
