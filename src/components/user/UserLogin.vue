<script setup>
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"
import { useMemberStore } from "@/stores/member"
import { useMenuStore } from "@/stores/menu"

const router = useRouter()

const memberStore = useMemberStore()

const { isLogin, isLoginError } = storeToRefs(memberStore) //ref
const { userLogin, getUserInfo } = memberStore //method
const { changeMenuState } = useMenuStore()

const loginUser = ref({
  id: "",
  password: "",
})

const login = async () => {
  await userLogin(loginUser.value)
  let token = sessionStorage.getItem("accessToken")
  console.log(token)
  console.log("isLogin: " + isLogin.value)
  if (isLogin.value) {
    getUserInfo(token)
    changeMenuState()
    router.push({ name: "main" })
  }
}
</script>

<template>

  <div class="flex justify-center mt-20">
    <div class="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl p-10">
      <h4 class="block text-2xl antialiased -semibold leading-snug tracking-normal text-gray-900 text-center mb-6">
        SIGNIN
      </h4>
      <form class="max-w-screen-lg w-80 sm:w-96">
        <div class="flex flex-col gap-6 mb-1">
          <!-- 아이디 입력 -->
          <div class="relative h-11 w-full min-w-[200px]">
            <input placeholder="ID" v-model="loginUser.id"
              class="peer h-full w-full rounded-md border border-gray-300 bg-transparent px-3 py-3 text-sm -normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-300 placeholder-shown:leading-[4.1] focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-gray-50" />
          </div>

          <!-- 비밀번호 입력 -->
          <div class="relative h-11 w-full min-w-[200px]">
            <input type="password" placeholder="PW" v-model="loginUser.password" @keyup.enter="login"
              class="peer h-full w-full rounded-md border border-gray-300 bg-transparent px-3 py-3 text-sm -normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-300 placeholder-shown:leading-[4.1] focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-gray-50" />
          </div>

          <!-- 로그인 에러 메세지 -->
          <div class="mb-3 text-start" v-if="isLoginError.value === true">
            <div class="alert alert-danger" role="alert">아이디 또는 비밀번호 확인해 주세요</div>
          </div>
        </div>

        <!-- 로그인 버튼 -->
        <button
          class="mt-6 block w-full select-none rounded-lg py-3 px-6 text-center align-middle text-xs -bold uppercase text-white shadow-md transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none"
          :class="{ 'bg-gray-500': !loginUser.id || !loginUser.password, 'bg-blue-500 hover:bg-blue-700': loginUser.id && loginUser.password }"
          type="button" @click="login">
          DONE
        </button>

        <!-- 회원가입 버튼 -->
        <button
          class="mt-6 block w-full select-none rounded-lg bg-white-500 py-3 px-6 text-center align-middle text-xs -bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button" @click="router.push({ name: 'user-join' })">
          SIGNUP
        </button>

      </form>
    </div>
  </div>
</template>

<style scoped>
.fc-black {
  color: black;
}

.bg-white-500 {
  background-color: white;
  color: black;
}

.bg-gray-500 {
  background-color: #9EADBD;
}

.bg-blue-500 {
  background-color: #5FBDFF;
}

.hover\:bg-blue-700:hover {
  background-color: #3A8FCC;
}
</style>
