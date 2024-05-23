import { useMemberStore } from "@/stores/member";
import ThePlanView from "@/views/ThePlanView.vue";
import ThePlanRegionChoiceView from "@/views/plan/ThePlanRegionChoiceView.vue";
import ThePlanScheduleChoiceView from "@/views/plan/ThePlanScheduleChoiceView.vue";
import ThePlanAttractionChoiceView from "@/views/plan/ThePlanAttractionChioceView.vue";
import ThePlanDetailView from "@/views/plan/ThePlanDetailView.vue";

const onlyAuthUser = async (to, from, next) => {
  const store = useMemberStore();
  if (store) {
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
        meta: { discardPlanState: true },
      },
      {
        path: "detail/:planId",
        name: "plan-detail",
        component: () => ThePlanDetailView,
      },
    ],
  },
];
