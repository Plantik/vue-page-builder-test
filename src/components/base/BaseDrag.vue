<template>
  <div
    draggable="true"
    @dragstart.self="onDragStart"
    @dragend="onDragEnd"
    :class="{ 'dragging': draggingBlock }"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
    <div
      v-if="draggingBlock"
      class="dragging-block"
      :style="`left: ${draggingBlockLeft}px; top: ${draggingBlockTop}px`"
    >
      {{ draggingBlock.text }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  transferData: {
    type: Object,
    required: true,
  },
});

const draggingBlock = ref(null);
const draggingBlockLeft = ref(0);
const draggingBlockTop = ref(0);

const onDragStart = (e) => {
  draggingBlock.value = props.transferData;
  draggingBlockLeft.value = e.clientX;
  draggingBlockTop.value = e.clientY;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.dropEffect = 'move';
  e.dataTransfer.setData('payload', JSON.stringify(props.transferData));

};

const onDragEnd = () => {
  draggingBlock.value = null;
  draggingBlockLeft.value = 0;
  draggingBlockTop.value = 0;
};
</script>

<style scoped>
.dragging {
  @apply opacity-50;
}

.dragging-block {
  @apply fixed w-7 h-7 rounded border border-dashed border-violet-700;
}
</style>

