<template>

  <div
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot/>
  </div>
</template>

<script>
// Using Options API as this is based on a component which I developed earlier for another project creating a Kanban board

export default {
  data() {
    return {
      beenDragged: false
    }

  },
  methods: {
    onDrop (e) {
      this.beenDragged = true
      const transferData = JSON.parse(e.dataTransfer.getData('payload'))
      this.$emit('drop', transferData)
      console.log('dropped', transferData)
    }
  }
}
</script>

