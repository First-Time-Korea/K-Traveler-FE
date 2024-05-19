export default [
  {
    path: "/board",
    name: "board",
    component: () => import("@/views/TheBoardView.vue"),
    children: [
      {
        path: "list",
        name: "board-list",
        component: () => import("@/components/board/BoardList.vue"),
      },
      {
        path: "write",
        name: "board-write",
        component: () => import("@/components/board/BoardWrite.vue"),
      },
    ],
  },
];
