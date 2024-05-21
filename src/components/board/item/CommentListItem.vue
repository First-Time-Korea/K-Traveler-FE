<script setup>
import { ref, onMounted, computed } from "vue";
import { useMemberStore } from "@/stores/member";

const store = useMemberStore();

const props = defineProps({
  comment: Object,
  isExistedMember: Boolean,
});

onMounted(() => {
  canDeleteComment.value =
    props.isExistedMember &&
    store.userInfo !== null &&
    store.userInfo.id === comment.value.memberId;
});

const emit = defineEmits(["changeParentCommentIdEvent", "deleteCommentEvent"]);

const changeParentCommentId = () => {
  emit("changeParentCommentIdEvent", comment.value);
};

const comment = ref(props.comment);

const marginLeft = ref(`${comment.value.depth * 24}px`);

const deleteCommentEvent = () => {
  emit("deleteCommentEvent", comment.value.id);
};

const canDeleteComment = ref(false);

const isShowedModifyButtons = computed(() => {
  return props.isExistedMember && props.comment.existedOfMember && props.comment.existed;
});
</script>

<template>
  <div>
    <div class="flex mt-5" :style="{ marginLeft: marginLeft }">
      <img
        src="https://docs.material-tailwind.com/img/face-2.jpg"
        alt="avatar"
        class="mr-2 relative inline-block h-6 w-6 !rounded-full object-cover object-center"
      />
      <div class="flex flex-col">
        <h6
          class="mr-2 flex-none block w-3/10 font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-inherit"
        >
          {{ comment.memberId }}
        </h6>
        <p
          class="flex-auto w-7/10 block font-sans text-sm antialiased font-normal leading-relaxed text-inherit"
        >
          {{ comment.content }}
        </p>
        <div class="flex flex-row items-center text-left mt-2">
          <p class="block font-sans text-xs antialiased font-light leading-normal text-inherit">
            {{ comment.createdTime }}
          </p>
          <div class="flex flex-row" v-if="isShowedModifyButtons">
            <button
              class="ml-2 flex items-center px-1 py-1 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
              type="button"
              @click="changeParentCommentId"
            >
              REPLY
            </button>
            <button
              class="ml-2 flex items-center px-1 py-1 font-sans text-xs font-bold text-center text-red-500 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-red-700/10 active:bg-red-700/20"
              type="button"
              @click="deleteCommentEvent"
              v-if="canDeleteComment"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
