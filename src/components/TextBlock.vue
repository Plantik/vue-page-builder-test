<template>
  <div>
    <div
      @click.prevent="handleAction"
      :class="[
        ' flex w-full bg-violet-100',
        isActionBoxVisible ? 'border border-dashed border-orange-700' : ''
      ]"
    >
      <textarea
        :class="[
          'hover:cursor-move p-2 text-base font-normal flex-grow outline-none resize-none',
          isActionBoxVisible ? 'hover:cursor-text' : ''
        ]"
        :value="props.textValue"
        @input="$emit('update:textValue', $event.target.value)"
        placeholder="Type you text here"
        onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
        oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
        @focusout="isActionBoxVisible = false"
      />
    </div>
    <div
      v-show="isActionBoxVisible"
      class="w-full flex place-content-center place-items-center space-x-3 my-2 text-sm"
    >
      <button @mousedown.prevent="handleAction('updateText')" class="button mb-2">Save</button>
      <button @mousedown.prevent="handleAction('duplicateText')" class="button mb-2">
        Duplicate
      </button>
      <button @mousedown.prevent="handleAction('deleteText')" class="button mb-2">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { ref } from 'vue'
const props = defineProps({
  textValue: {
    type: String,
    required: true
  }
})

const isActionBoxVisible = ref(false)


watch(
  () => props.textValue,
  () => {
    isActionBoxVisible.value = true
  }
)

const emit = defineEmits(['duplicateText', 'deleteText', 'update:textValue'])
const toggleActive = () => {
  isActionBoxVisible.value = !isActionBoxVisible.value
}
function handleAction(actionType) {
  switch (actionType) {
    case 'updateText':
      break
    case 'duplicateText':
      emit('duplicateText')
      break
    case 'deleteText':
      emit('deleteText')
      break
  }
  toggleActive()
}
</script>
