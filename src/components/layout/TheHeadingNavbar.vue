<script setup>
import { useMenuStore } from "@/stores/menu.js";
import { useMemberStore } from "@/stores/member.js";
import { storeToRefs } from "pinia";

const menuStore = useMenuStore();
const memberStore = useMemberStore();

const { menuList } = storeToRefs(menuStore);
const { changeMenuState } = menuStore;
const { userLogout } = memberStore;

const logout = () => {
  userLogout();
  changeMenuState();
};

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
    <router-link :to="{ name: 'main' }" class="navbar-brand">
      <img src="@/assets/img/logo.jpg" class="rounded mx-auto d-block" style="height: 100px; width:100px" alt=" ..." />
    </router-link>
    <h1>hello</h1>
    <template v-for="menu in menuList" :key="menu.routeName">
      <template v-if="menu.show">
        <template v-if="menu.routeName === 'user-logout'">
          <li class="nav-item">
            <router-link to="/" @click.prevent="logout" class="nav-link">{{
              menu.name
            }}</router-link>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link :to="{ name: menu.routeName }" class="nav-link">{{
              menu.name
            }}</router-link>
          </li>
        </template>
      </template>
    </template>
  </nav>
</template>

<style scoped></style>