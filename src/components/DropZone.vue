<template>
  <div>
    <BaseModalOverlay
      v-show="isModalOverlayVisible"
      @performAction="setNewImage"
      @close="closeModalOverlay"
    >
      <template v-slot:modal-header>Select image</template>
      <template v-slot:modal-content>
        <!-- Below <div> should be abstracted into a separate ImageSelector component that would be populated 
          with images from the server and have it's own drop functionality to add user-generated images
        -->
        <div class="w-full h-full">
          <div class="flex space-x-2">
            <img
              @click="handleImageClick('goa.jpg')"
              :class="[
                ' h-40 cursor-default',
                selectedImage === 'goa.jpg' ? 'transform -translate-y-3 duration-300' : ''
              ]"
              src="../assets/pics/goa.jpg"
              alt=""
            />
            <img
              @click="handleImageClick('bike.jpg')"
              :class="[
                ' h-40',
                selectedImage === 'bike.jpg' ? 'transform -translate-y-3 duration-300' : ''
              ]"
              src="../assets/pics/bike.jpg"
              alt=""
            />
            <img
              @click="handleImageClick('carlson.jpg')"
              :class="[
                ' h-40',
                selectedImage === 'carlson.jpg' ? 'transform -translate-y-3 duration-300' : ''
              ]"
              src="../assets/pics/carlson.jpg"
              alt=""
            />
          </div>
        </div>
      </template>
    </BaseModalOverlay>
    <BaseDrop
      class="min-h-[700px] border border-dotted border-slate-400 bg-violet-100 p-2 my-5"
      @drop="handleDrop"
    >
      <p class="font-bold text-violet-300 tracking-[10px] text-center">Drop zone</p>
      <BaseDrag
        v-for="item in blocks"
        :key="item.id"
        class="bg-violet-100 my-5 hover:cursor-move"
        :transferData="{
          type: item.type,
          itemId: item.id
        }"
        @dragenter="setTargetItem(item.id)"
      >
        <ImageBlock
          v-if="item.type === 2"
          :title="item.title"
          :alt="item.alt"
          :imgLink="item.imgLink"
          @deleteImage="deleteImage(item.id)"
          @duplicateImage="duplicateImage(item.id)"
          @changeImage="prepareImage(item.id)"
        />
        <TextBlock
          v-if="item.type === 1"
          :title="item.title"
          :class="item.class"
          v-model:textValue="item.text"
          @deleteText="deleteText(item.id)"
          @duplicateText="duplicateText(item.id)"
          @updateText="updateText(item.id, item.text)"
        />
      </BaseDrag>
    </BaseDrop>
  </div>
</template>

<script setup>
import BaseDrop from './base/BaseDrop.vue'
import BaseDrag from './base/BaseDrag.vue'
import BaseModalOverlay from './base/BaseModalOverlay.vue'

import ImageBlock from './ImageBlock.vue'
import TextBlock from './TextBlock.vue'

import { ref, watch, computed } from 'vue'

const blocks = ref([])
const targetItemId = ref(null)
const selectedImage = ref(null)
const imageCardId = ref(null)

const handleImageClick = (imageName) => {
  selectedImage.value = imageName
}

const isModalOverlayVisible = ref(false)

const closeModalOverlay = () => {
  isModalOverlayVisible.value = false
}

// Should be abstracted into a separate service or helper function

function generateUniqueId() {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
  const uniqueId = `${timestamp}${random}`
  return uniqueId
}

// Loading blocks from local storage on mount, would use Pinia in real life project and get blocks from server

if (localStorage.getItem('blocksData')) {
  blocks.value = JSON.parse(localStorage.getItem('blocksData'))
}

const handleDrop = (transferData) => {
  if (transferData.newItem) {
    const newBlock = {
      id: generateUniqueId(),
      ...transferData
    }

    const targetIndex = blocks.value.findIndex((item) => item.id === targetItemId.value)

    if (targetIndex !== -1) {
      blocks.value.splice(targetIndex, 0, newBlock)
    } else {
      blocks.value.push(newBlock)
    }
  }


  // A more complicated logic should include the coordinates of the dragged 
  // item and the target item as well as the size of the dragged item to place it anywhere in the drop zone

  const draggedItemId = transferData.itemId
  if (!draggedItemId) return

  const draggedItemIndex = blocks.value.findIndex((item) => item.id === draggedItemId)
  const targetIndex = blocks.value.findIndex((item) => item.id === targetItemId.value)

  if (draggedItemIndex !== -1 && targetIndex !== -1 && draggedItemIndex !== targetIndex) {
    const [draggedItem] = blocks.value.splice(draggedItemIndex, 1)
    blocks.value.splice(targetIndex, 0, draggedItem)
  }

  targetItemId.value = null
}

const setTargetItem = (itemId) => {
  targetItemId.value = itemId
}

const blocksJSON = computed(() => JSON.stringify(blocks.value))

watch(blocksJSON, (newBlocksJSON) => {
  console.log('blocksJSON', newBlocksJSON)
  localStorage.setItem('blocksData', newBlocksJSON)
})

//Actions with blocks. As there will be more blocks, actions will be moved to a separate file

const handleBlockAction = (id, actionType) => {
  const index = blocks.value.findIndex((item) => item.id === id)

  if (index !== -1) {
    if (actionType === 'delete') {
      blocks.value.splice(index, 1)
    } else if (actionType === 'duplicate') {
      const item = blocks.value[index]
      blocks.value.splice(index, 0, {
        ...item,
        id: generateUniqueId()
      })
    }
  }
}

function deleteImage(id) {
  handleBlockAction(id, 'delete')
}

function duplicateImage(id) {
  handleBlockAction(id, 'duplicate')
}

function deleteText(id) {
  handleBlockAction(id, 'delete')
}

function duplicateText(id) {
  handleBlockAction(id, 'duplicate')
}

// updateText should be unit tested tested

function updateText(id, text) {
  const index = blocks.value.findIndex((item) => item.id === id)
  const item = blocks.value[index]
  blocks.value.splice(index, 1, {
    ...item,
    text: text
  })
}

function prepareImage(id) {
  isModalOverlayVisible.value = true
  imageCardId.value = id
}

// setNewImage should be unit tested

function setNewImage() {
  const index = blocks.value.findIndex((item) => item.id === imageCardId.value)
  const item = blocks.value[index]
  isModalOverlayVisible.value = false

//SetTimout emulates network delay. TODO: replace with real network call, add loading state and spinner
  setTimeout(() => {
    blocks.value.splice(index, 1, {
      ...item,
      imgLink: `../pics/${selectedImage.value}`
    })
    selectedImage.value = null
  }, 800)
}
</script>
