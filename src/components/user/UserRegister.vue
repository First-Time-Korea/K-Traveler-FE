<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMenuStore } from "@/stores/menu";
import { signup, idCheck } from "@/api/user";

const router = useRouter();
const user = ref({
  name: "",
  id: "",
  password: "",
  passwordCheck: "",
  emailId: "",
  emailDomain: "",
});

const idCheckMessage = ref("");
const isIdValid = ref(null);
const isPwdValid = ref(null);

async function goSignUp() {
  console.log("회원가입!!", user.value);
  if (user.value.password !== user.value.passwordCheck) {
    alert("The password does not match.");
    return;
  }
  await signup(
    user.value,
    (response) => {
      console.log(response.data);
      if (response.data.status === "success") {
        alert("Membership has been completed.");
        router.push({ name: "main" });
      }
    },
    (error) => {
      console.log(error);
      alert("Membership failed.");
      router.push({ name: "user-join" });
    }
  );
}

async function goIdCheck() {
  const response = await idCheck(
    { id: user.value.id },
    (response) => {
      idCheckMessage.value = "This is an available ID.";
      isIdValid.value = true;
      console.log(response.data);
      if (response.data.status === "success") {
        idCheckMessage.value = "This is an available ID.";
        isIdValid.value = true;
      } else if (response.data.status === "fail") {
        idCheckMessage.value = "This ID is already in use.";
        isIdValid.value = false;
      }
    },
    (error) => {
      console.log(error);
      idCheckMessage.value = "An error occurred while checking duplicate IDs.";
      isIdValid.value = false;
    }
  );
}

async function goPwdCheck() {
  if (user.value.password === user.value.passwordCheck) {
    isPwdValid.value = true;
  } else {
    isPwdValid.value = false;
  }
}

const signupButtonBasicStyle =
  "mt-6 block w-full select-none font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-md shadow-gray-900/10 hover:bg-first-400 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none";

const signupButtonDisabledStyle = "pointer-events-none bg-second-500 text-second-700/100";

const signupButtonAbledStyle = "bg-first-300 text-white";

const signupButtonStyle = computed(() => {
  return canSignup.value && isIdValid.value && isPwdValid.value
    ? `${signupButtonBasicStyle} ${signupButtonAbledStyle}`
    : `${signupButtonBasicStyle} ${signupButtonDisabledStyle}`;
});

const canSignup = computed(() => {
  return (
    user.value.name !== "" &&
    user.value.id !== "" &&
    user.value.password !== "" &&
    user.value.passwordCheck !== "" &&
    user.value.emailId !== "" &&
    user.value.emailDomain !== ""
  );
});
</script>

<template>
  <div class="flex justify-center mt-20">
    <div class="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl p-10">
      <h4 class="block text-2xl antialiased font-semibold leading-snug tracking-normal text-gray-900 text-center mb-6">
        SIGNUP
      </h4>
      <form class="max-w-screen-lg w-80 sm:w-96" @submit.prevent="goSignUp">
        <div class="flex flex-col gap-6 mb-1">
          <!-- 이름 -->
          <div class="relative h-11 w-full min-w-[200px]">
            <input placeholder="NAME" v-model="user.name"
              class="peer h-full w-full rounded-md border border-gray-300 bg-transparent px-3 py-3 text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-300 placeholder-shown:leading-[4.1] focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-gray-50" />
          </div>

          <!-- 아이디 -->
          <div class="relative h-11 w-full min-w-[200px]">
            <input placeholder="ID" v-model="user.id" @blur="goIdCheck" :class="{
              'border-red-500': isIdValid === false,
              'border-green-500': isIdValid === true,
              'border-gray-300': isIdValid === null,
            }"
              class="peer h-full w-full rounded-md border bg-transparent px-3 py-3 text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-300 placeholder-shown:leading-[4.1] focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-gray-50" />
            <p v-if="idCheckMessage"
              :class="{ 'text-red-500': isIdValid === false, 'text-green-500': isIdValid === true }"
              class="text-sm mt-1">
              <!-- {{ idCheckMessage }} -->
            </p>
          </div>

          <!-- 비밀번호 -->
          <div class="relative h-11 w-full min-w-[200px]">
            <input type="password" placeholder="PW" v-model="user.password" :class="{
              'border-red-500': isPwdValid === false,
              'border-green-500': isPwdValid === true,
              'border-gray-300': isPwdValid === null,
            }"
              class="peer h-full w-full rounded-md border border-gray-300 bg-transparent px-3 py-3 text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-300 placeholder-shown:leading-[4.1] focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-gray-50" />
          </div>

          <!-- 비밀번호 확인 -->
          <div class="relative h-11 w-full min-w-[200px]">
            <input type="password" placeholder="CHECK PW" v-model="user.passwordCheck" @blur="goPwdCheck" :class="{
              'border-red-500': isPwdValid === false,
              'border-green-500': isPwdValid === true,
              'border-gray-300': isPwdValid === null,
            }"
              class="peer h-full w-full rounded-md border border-gray-300 bg-transparent px-3 py-3 text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-300 placeholder-shown:leading-[4.1] focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-gray-50" />
          </div>

          <!-- 이메일 -->
          <div class="flex gap-1">
            <input type="text" v-model="user.emailId"
              class="peer h-full w-1/2 rounded-md border border-gray-300 bg-transparent px-3 py-3 text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-300 placeholder-shown:leading-[4.1] focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-gray-50"
              placeholder="Email ID" />
            <span class="input-group-text">@</span>
            <select
              class="form-select w-1/2 rounded-md border border-gray-300 bg-transparent px-3 py-3 text-sm font-normal text-gray-700 outline outline-0 transition-all focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-gray-50"
              aria-label="이메일 도메인 선택" v-model="user.emailDomain">
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
              <option value="kakao.com">kakao.com</option>
            </select>
          </div>
        </div>

        <button :class="signupButtonStyle" type="submit">DONE</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.bg-gray-500 {
  background-color: #9eadbd;
}

.bg-blue-500 {
  background-color: #5fbdff;
}

.hover\:bg-blue-700:hover {
  background-color: #3a8fcc;
}
</style>
