<template>
  <div>
    <BaseDrag
      id="newImage"
      class="draggableThumbnail"
      :transferData="{
        type: 2,
        newItem: true,
        title: 'Image Block',
        alt: '',
        class: 'w-40 h-40',
        imgLink: '../pics/goa.jpg'
      }"
    >
      <div class="flex flex-col place-items-center place-content-center">
        <p class="text-base mb-2">Image</p>
        <DragIcon class="h-8 w-8 text-violet-600" />
      </div>
    </BaseDrag>
  </div>
</template>

<script setup>
import BaseDrag from './base/BaseDrag.vue'
import DragIcon from './icons/DragIcon.vue'
</script>

