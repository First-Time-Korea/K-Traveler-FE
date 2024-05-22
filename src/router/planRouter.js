import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import ThePlanView from "@/views/ThePlanView.vue";
import ThePlanRegionChoiceView from "@/views/plan/ThePlanRegionChoiceView.vue";
import ThePlanScheduleChoiceView from "@/views/plan/ThePlanScheduleChoiceView.vue";
import ThePlanAttractionChoiceView from "@/views/plan/ThePlanAttractionChioceView.vue";
import ThePlanDetailView from "@/views/plan/ThePlanDetailView.vue";

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
    path: "/plan",
    name: "plan",
    beforeEnter: onlyAuthUser,
    component: ThePlanView,
    redirect: "/plan/region",
    meta: { keepPlanState: true },
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
        path: "spot",
        name: "choice-attraction",
        component: () => ThePlanAttractionChoiceView,
      },
      {
        path: "detail/:planId",
        name: "paln-detail",
        component: () => ThePlanDetailView,
      },
    ],
  },
];
