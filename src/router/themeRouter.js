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
    ],
  },
];
