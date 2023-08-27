<template>
  <header class="flex place-content-center w-full bg-gray-200">
    <div>
      <div
        class="text-5xl font-bold text-slate-900 textslate-800 w-fit rounded px-10 py-2 m-3 bg-gray-200"
      >
        Simple Page Builder Demo
      </div>
    </div>
  </header>

  <main>
    <PageEditor />
  </main>
</template>

<script setup>
import PageEditor from '@/layout/PageEditor.vue'
</script>


