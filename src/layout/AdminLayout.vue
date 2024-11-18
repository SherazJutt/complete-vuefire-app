<script setup>
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import SideBar from '../components/admin/SideBar.vue';
import { useStorage } from '@vueuse/core';
import { ref } from 'vue';
import Popover from 'primevue/popover';
import { Icon } from '@iconify/vue/dist/iconify.js';

const showSideBar = useStorage('persisted-sidebar', true);

const popoverRef = ref();
// Toggle a specific popover
const togglePopover = (event) => {
  popoverRef.value.toggle(event);
};

// Close a specific popover
const closePopover = () => {
  popoverRef.value.hide();
};
</script>

<template>
  <nav class="relative flex h-[70px] w-full items-center justify-between self-center border-b pl-4 pr-8">
    <div class="flex items-center gap-4">
      <Button icon="pi pi-align-justify" @click="showSideBar = !showSideBar" text class="bg-primary-50" iconClass="text-2xl" />
      <div class="text-2xl text-color-1 maxsm:hidden">Form Flow</div>
    </div>

    <div class="flex items-center gap-4">
      <Button @click="togglePopover($event)" icon="pi pi-user" iconPos="right" rounded />

      <Popover class="[&_.p-popover-content]:p-0" ref="popoverRef">
        <div class="">
          <h3 class="border-b px-4 py-2 text-sm font-semibold">User name</h3>
          <div @click="closePopover" class="jucen flex w-28 cursor-pointer items-center gap-2.5 px-3 py-2 duration-200 hover:bg-primary-50 hover:text-primary"><Icon icon="ion:person-outline" class="size-4" /> Profile</div>
          <div @click="closePopover" class="jucen flex w-28 cursor-pointer items-center gap-2.5 px-3 py-2 duration-200 hover:bg-primary-50 hover:text-primary"><Icon icon="streamline:store-1" class="size-4" /> Logout</div>
        </div>
      </Popover>
    </div>
  </nav>
  <main class="flex">
    <div class="h-[calc(100vh-71px)] shrink-0 border-r bg-white pr-0.5 duration-200 maxxl:fixed" :class="showSideBar ? 'w-[240px]' : 'w-0 overflow-hidden opacity-0'">
      <SideBar />
    </div>
    <div class="h-[calc(100vh-71px)] w-full overflow-auto p-4">
      <router-view />
    </div>
  </main>
  <Toast />
</template>
