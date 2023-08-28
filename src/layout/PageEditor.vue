<template>
  <div :class="$style.defaultLayout">
    <main :class="$style.contentContainer">
      <section :class="$style.mainContent">
        <div :class="$style.editorArea">
          <p class="mb-10 text-2xl font-bold">Editor Area</p>
          <DropZone />
        </div>
      </section>
      <section :class="$style.sideMenuComponent">
        <p class="mb-6 ml-3 text-2xl font-bold border-b-4">Building Blocks</p>
        <div class="flex text-xl flex-col gap-4 p-3">
          <TextBlockThumbnail />
          <ImageBlockThumbnail />
          <button @click="prepareJSONtoSendToServer" class="button">Save Page</button>
          <p class="text-xs">{{ JSONtoSendToServer }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import DropZone from '@/components/DropZone.vue'
import TextBlockThumbnail from '@/components/TextBlockThumbnail.vue'
import ImageBlockThumbnail from '@/components/ImageBlockThumbnail.vue'
import { ref } from 'vue'
const JSONtoSendToServer = ref()

//Should be stored in Pinia

const prepareJSONtoSendToServer = () => {
  JSONtoSendToServer.value = JSON.parse(localStorage.getItem('blocksData')).length ? JSON.parse(localStorage.getItem('blocksData')) : 'No saved data'
}
</script>

<style module>
.defaultLayout {
  @apply min-h-screen mx-auto w-full  bg-gray-200;
}

.contentContainer {
  @apply w-full mx-auto grid grid-cols-8;
}

.sideMenuComponent {
  @apply col-span-2 border-4 border-l-2 border-violet-300 p-10;
}

.mainContent {
  @apply col-span-6;
}

.editorArea {
  @apply w-full h-full min-h-screen border-4 border-r-2 border-violet-300 p-10;
}
</style>
