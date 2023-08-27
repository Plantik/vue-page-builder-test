<template>
  <div>
    <div id="newText" class="draggableThumbnail">
      <div class="flex flex-col place-items-center place-content-center">
        <p class="text-base mb-2">Text</p>
        <DragIcon class="h-8 w-8 text-violet-600" />
      </div>
    </div>
  </div>
</template>

<script setup>
import DragIcon from './icons/DragIcon.vue'


</script>

<style scoped></style>
