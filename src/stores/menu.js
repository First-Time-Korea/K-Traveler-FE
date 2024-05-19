import { ref } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menuStore", () => {
  const menuList = ref([
    { name: "ThemeTest", show: false, routeName: "theme-test" },
    { name: "Travel", show: false, routeName: "attraction" },
    { name: "Plan", show: false, routeName: "plan" },
    { name: "SignUp", show: true, routeName: "user-join" },
    { name: "SignIn", show: true, routeName: "user-login" },
    { name: "Profile", show: false, routeName: "user-mypage" },
    { name: "SignOut", show: false, routeName: "user-logout" },
  ]);

  const changeMenuState = () => {
    menuList.value = menuList.value.map((item) => ({
      ...item,
      show: !item.show,
    }));
  };
  return {
    menuList,
    changeMenuState,
  };
});
