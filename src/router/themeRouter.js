export default [
  {
    path: "/theme",
    name: "theme",
    component: () => import("@/views/TheThemeView.vue"),
    children: [
      {
        path: "test",
        name: "theme-test",
        component: () => import("@/components/theme/ThemeTest.vue"),
      },
      {
        path: "result/:theme",
        name: "theme-result",
        component: () => import("@/components/theme/ThemeResult.vue"),
      },
    ],
  },
];
