<script setup>
import { useMenuStore } from "@/stores/menu.js";
import { useMemberStore } from "@/stores/member.js";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const menuStore = useMenuStore();
const memberStore = useMemberStore();

const { menuList } = storeToRefs(menuStore);
const { changeMenuState } = menuStore;
const { userLogout } = memberStore;

const logout = () => {
  userLogout();
  changeMenuState();
};

const route = useRoute();

</script>

<template>
  <nav
    class="flex items-center justify-between sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-white bg-white border rounded-none shadow-md h-20 border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
    <div class="m-5 flex items-center justify-between text-blue-gray-900 h-full w-full">
      <router-link :to="{ name: 'main' }" class="navbar-brand text-lg">
        <h1 style="color: #5FBDFF;" class="font-bold">K-TRAVELER</h1>
      </router-link>
      <div class="flex items-center gap-4" style="color:black;  list-style-type: none;">
        <div class="flex items-center gap-x-5">
          <template v-for="menu in menuList" :key="menu.routeName">
            <template v-if="menu.show">
              <template v-if="menu.routeName === 'user-logout'">
                <li class="nav-item">
                  <router-link to="/" @click.prevent="logout" class="nav-link flex items-center"
                    :class="{ 'text-first-300': route.name === 'user-logout', 'text-black': route.name !== 'user-logout' }">
                    {{ menu.name }}
                  </router-link>
                </li>
              </template>
              <template v-else>
                <li class="nav-item">
                  <!-- , 'text-black': route.name !== menu.routeName -->
                  <router-link :to="{ name: menu.routeName }" class="nav-link flex items-center"
                    :class="{ 'text-first-300': route.path.includes(menu.routeName) }">
                    {{ menu.name }}
                  </router-link>
                </li>
              </template>
            </template>
          </template>
        </div>
      </div>
    </div>
  </nav>


</template>

<style scoped></style>