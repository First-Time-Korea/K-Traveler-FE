import { onMounted, ref } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menuStore", () => {
  const isLogged = ref(false); //로그인 상태 저장

  const checkLoginStatus = () => {
    const token = sessionStorage.getItem("accessToken");
    isLogged.value = !!token; // 토큰 유무에 따라 Boolean 값 설정
  };

  // 최초 로딩 시 로그인 상태 확인
  checkLoginStatus();

  const menuList = ref([
    { name: "ThemeTest", show: !isLogged.value, routeName: "theme-test" },
    { name: "ThemeTest", show: isLogged.value, routeName: "theme-test" },
    { name: "Travel", show: !isLogged.value, routeName: "attraction" },
    { name: "Travel", show: isLogged.value, routeName: "attraction" },
    { name: "Plan", show: isLogged.value, routeName: "plan" },
    {name: "Review", show: !isLogged.value, routeName: "board"},
    {name: "Review", show: isLogged.value, routeName: "board"},
    { name: "SignUp", show: !isLogged.value, routeName: "user-join" },
    { name: "SignIn", show: !isLogged.value, routeName: "user-login" },
    { name: "Profile", show: isLogged.value, routeName: "user-mypage" },
    { name: "SignOut", show: isLogged.value, routeName: "user-logout" },
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
