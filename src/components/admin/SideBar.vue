<template>
  <template v-for="(item, index) in sideItems" :key="index">
    <div @click="item.command()" class="relative flex w-full cursor-pointer items-center gap-4 border-b px-4 py-3 text-color-1 hover:bg-primary-50" :class="{ '!bg-primary-500 !text-primary-50': item.name === route.name }">
      <Icon :class="item.iconclass" :icon="item.icon" v-if="item.customIcon" />
      <span :class="item.icon" v-else />
      <span>{{ item.label }}</span>
    </div>
  </template>
</template>
<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const sideItems = ref([
  {
    label: 'Home',
    icon: 'ion:home-outline',
    iconclass: 'text-[18px] ',
    customIcon: true,
    role: 'admin',
    name: 'Admin',
    command() {
      router.push({ name: this.name });
    },
  },
  {
    label: 'Submissions',
    icon: 'ion:file-tray-full-outline',
    iconclass: 'text-[18px]',
    customIcon: true,
    role: 'admin',
    name: 'Submissions',
    command() {
      router.push({ name: this.name });
    },
  },
  {
    label: 'Stores',
    icon: 'streamline:store-1',
    customIcon: true,
    role: 'admin',
    name: 'Stores',
    command() {
      router.push({ name: this.name });
    },
  },
  {
    label: 'Attorneys',
    icon: 'octicon:law-24',
    customIcon: true,
    role: 'admin',
    name: 'Attorneys',
    command() {
      router.push({ name: this.name });
    },
  },
  {
    label: 'Customers',
    icon: 'bi:people',
    customIcon: true,
    role: 'admin',
    name: 'Customers',
    command() {
      router.push({ name: this.name });
    },
  },
]);
</script>
