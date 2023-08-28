<template>
  <transition name="slide-right">
    <div class="overlay" @click="$emit('close')">
      <div
        class="bg-white flex flex-col shadow-2xl rounded border-4 border-violet-300"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        @click.stop
      >
        <div class="flex place-content-center pb-5 px-20 bg-accentExtraLight"></div>

        <div class="flex place-content-center pb-5 px-20 bg-accentExtraLight">
          <div
            class="mx-9 text-lg md:text-2xl font-bold text-gray-600"
            id="modalHeader"
          >
            <slot name="modal-header"></slot>
          </div>
        </div>

        <div class="flex flex-col py-2">
          <div
          class="text-lg px-5" 
          id="modalContent">
            <slot name="modal-content"></slot>
          </div>
        </div>

       

        <footer class="pb-5 flex place-content-center space-x-5">
          <button
            type="button"
            class="button"
            @click="performAction"
            aria-label="completeAction"
          >
            Set Image
          </button>

          <button type="button" class="secondaryButton" @click="close" aria-label="closeModal">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>

// Using Options API as this is based on a component which I developed earlier for another project


export default {
  name: 'CreateNewModal',
  methods: {
    close() {
      this.$emit('close')
    },

    performAction() {
      this.$emit('performAction')
    }
  }
}
</script>

<style scoped>




@keyframes slide-right {
  0% {
    opacity: 0;
    transform: translateX(-3%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-right-enter-active {
  animation: slide-right 0.25s;
}

.slide-right-leave-active {
  animation: slide-right 0.15s reverse;
}
</style>
