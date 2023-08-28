<template>
  <div>
    <div
    id="imageBlock"
    tabindex="1"
    @click.prevent="handleAction"
    @blur="isActionBoxVisible = false"
    :class="[
      'relative flex w-full place-content-center place-items-center bg-violet-100',
      isActionBoxVisible
        ? 'border border-dashed border-orange-700'
        : ''
    ]"
  >
      <div
        v-show="isActionBoxVisible"
        class="w-fit absolute space-x-3 text-sm transition-opacity duration-300"
      >
        <button id="changeImageBtn" @mousedown.prevent="handleAction('changeImage')" class="secondaryButton">Change image</button>
        <button id="duplicateImageBtn" @mousedown.prevent="handleAction('duplicate')" class="secondaryButton">Duplicate</button>
        <button id="deleteImageBtn" @mousedown.prevent="handleAction('delete')" class="secondaryButton">Delete</button>
      </div>
      <img class="h-96 pointer-events-none" :src="imgLink" :alt="props.alt" />
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  imgLink: {
    type: String,
    required: true
  },
  
})

const isActionBoxVisible = ref(false)
const emit = defineEmits(['showActionBox', 'changeImage', 'duplicateImage', 'deleteImage'])



const toggleActive = () => {isActionBoxVisible.value = !isActionBoxVisible.value}


function handleAction(actionType) {
  switch (actionType) {
    case 'changeImage':
      emit('changeImage')
      break
    case 'duplicate':
      emit('duplicateImage')
      break
    case 'delete':
      emit('deleteImage')
      break
  }
  toggleActive()
}
</script>

