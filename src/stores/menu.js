import { ref } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menuStore", () => {
  const menuList = ref([
    { name: "Travel", show: false, routeName: "attraction" },
    { name: "Sign Up", show: true, routeName: "user-join" },
    { name: "Sign In", show: true, routeName: "user-login" },
    { name: "Profile", show: false, routeName: "user-mypage" },
    { name: "Sign Out", show: false, routeName: "user-logout" },
  ]);

  const changeMenuState = () => {
    menuList.value = menuList.value.map((item) => ({ ...item, show: !item.show }));
  };
  return {
    menuList,
    changeMenuState,
  };
});
