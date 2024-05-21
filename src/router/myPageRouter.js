export default [
  {
    path: "/mypage",
    name: "mypage",
    component: () => import("@/views/TheMyPageView.vue"),
    redirect: { name: "mypage-plan-list" },
    children: [
      {
        path: "plan",
        name: "mypage-plan-list",
        component: () => import("@/components/myPage/PlanList.vue"),
      },
      {
        path: "attraction",
        name: "mypage-attraction-list",
        component: () => import("@/components/myPage/AttractionList.vue"),
      },
    ],
  },
];
