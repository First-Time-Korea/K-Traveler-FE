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
    ],
  },
];
