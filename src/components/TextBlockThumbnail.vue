<template>
  <div>
    <BaseDrag id="newImage" class="draggableThumbnail" :transferData="{
          type: 1,
          newItem: true,
          title: 'Text Block',
          text: '',
          class: 'font-thin text-2xl',
         
        }">
      <div class="flex flex-col place-items-center place-content-center">
        <p class="text-base mb-2">Text</p>
        <DragIcon class="h-8 w-8 text-violet-600" />
      </div>
    </BaseDrag>
  </div>
</template>

<script setup>
import BaseDrag from './base/BaseDrag.vue'
import DragIcon from './icons/DragIcon.vue'


</script>
