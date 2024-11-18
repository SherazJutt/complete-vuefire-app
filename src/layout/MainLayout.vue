<script setup>
import Toast from 'primevue/toast';
</script>

<template>
  <nav class="relative w-full border-b border-gray-200">
    <div class="container mx-auto flex w-full items-center justify-between self-center py-4">
      <div class="text-2xl text-color-1">
        <span class="font-semibold text-primary">Logo</span>
      </div>
      <div class="space-x-2 xs:space-x-4">
        <router-link to="/" class="text-sm text-color-1 duration-200 hover:text-primary xs:text-base">About us</router-link>
        <router-link to="/" class="text-sm text-color-1 duration-200 hover:text-primary xs:text-base">Terms</router-link>
        <router-link to="/" class="text-sm text-color-1 duration-200 hover:text-primary xs:text-base">Privacy Policy</router-link>
      </div>
    </div>
  </nav>
  <main class="container">
    <router-view />
  </main>
  <Toast />
</template>
