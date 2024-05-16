<script setup>
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"
import { useMemberStore } from "@/stores/member"
import { useMenuStore } from "@/stores/menu"

const router = useRouter()
const memberStore = useMemberStore()

const { userSignUp } = memberStore //method

const siginUpUser = ref({
    id: "",
    password: "",
    emailId: "",
    emailDomain: ""
})

const signup = async () => {

}

</script>

<template>
    <div class="flex justify-center mt-20 ">
        <div class="relative flex flex-col text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
            <h4
                class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Sign Up
            </h4>
            <p class="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                Nice to meet you! Enter your details to register.
            </p>
            <form class="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
                <div class="flex flex-col gap-6 mb-1">
                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                        Your Name
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px]">
                        <input placeholder="name@mail.com"
                            class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                        <label
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                    </div>
                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                        Your Email
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px]">
                        <input placeholder="name@mail.com"
                            class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                        <label
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                    </div>
                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                        Password
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px]">
                        <input type="password" placeholder="********"
                            class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                        <label
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                    </div>
                </div>
                <div class="inline-flex items-center">
                    <label class="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="remember">
                        <input type="checkbox"
                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                            id="remember" />
                        <span
                            class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20"
                                fill="currentColor" stroke="currentColor" stroke-width="1">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </span>
                    </label>
                    <label class="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="remember">
                        <p
                            class="flex items-center font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                            I agree the
                            <a href="#" class="font-medium transition-colors hover:text-gray-900">
                                &nbsp;Terms and Conditions
                            </a>
                        </p>
                    </label>
                </div>
                <button
                    class="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
                    sign up
                </button>
                <p
                    class="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
                    Already have an account?
                    <a href="#" class="font-medium text-gray-900">
                        Sign In
                    </a>
                </p>
            </form>
        </div>
    </div>



    <!-- 기존 거 -->
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <h2 class="my-3 py-3 shadow-sm bg-light text-center">
                    <mark class="orange">회원가입</mark>
                </h2>
            </div>
            <div class="col-lg-10 text-start">
                <form>
                    <div class="mb-3">
                        <label for="username" class="form-label">이름 : </label>
                        <input type="text" class="form-control" placeholder="이름..." />
                    </div>
                    <div class="mb-3">
                        <label for="userid" class="form-label">아이디 : </label>
                        <input type="text" class="form-control" placeholder="아이디..." />
                    </div>
                    <div class="mb-3">
                        <label for="userpwd" class="form-label">비밀번호 : </label>
                        <input type="text" class="form-control" placeholder="비밀번호..." />
                    </div>
                    <div class="mb-3">
                        <label for="pwdcheck" class="form-label">비밀번호확인 : </label>
                        <input type="text" class="form-control" id="pwdcheck" placeholder="비밀번호확인..." />
                    </div>
                    <div class="mb-3">
                        <label for="emailid" class="form-label">이메일 : </label>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="이메일아이디" />
                            <span class="input-group-text">@</span>
                            <select class="form-select" aria-label="이메일 도메인 선택">
                                <option selected>선택</option>
                                <option value="ssafy.com">싸피</option>
                                <option value="google.com">구글</option>
                                <option value="naver.com">네이버</option>
                                <option value="kakao.com">카카오</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-auto text-center">
                        <button type="button" class="btn btn-outline-primary mb-3">회원가입</button>
                        <button type="button" class="btn btn-outline-success ms-1 mb-3">초기화</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped></style>