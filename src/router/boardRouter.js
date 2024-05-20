export default [
  {
    path: "/board",
    name: "board",
    component: () => import("@/views/TheBoardView.vue"),
    redirect: {name: "board-list"},
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
      {
        path: "modify/:articleid",
        name: "board-modify",
        component: () => import("@/components/board/BoardModify.vue"),
      },
    ],
  },
];
