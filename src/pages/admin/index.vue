<script setup>
import { Icon } from '@iconify/vue';
</script>
<template>
  <div>
    <div class="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
      <!-- submissions -->
      <div class="flex items-center gap-4 rounded-md border bg-gray-100/45 p-4 pl-3 shadow-sm">
        <Icon icon="simple-icons:googleforms" class="size-14 text-primary" />
        <div class="">
          <h4 class="text-2xl font-semibold text-color-1">10</h4>
          <div class="text-gray-500">Submissions</div>
        </div>
      </div>
      <!-- stores -->
      <div class="flex items-center gap-4 rounded-md border bg-gray-100/45 p-4 pl-3 shadow-sm">
        <Icon icon="streamline:store-1" class="size-14 text-primary" />
        <div class="">
          <h4 class="text-2xl font-semibold text-color-1">37</h4>
          <div class="text-gray-500">Stores</div>
        </div>
      </div>

      <!-- Attorneys -->
      <div class="flex items-center gap-4 rounded-md border bg-gray-100/45 p-4 pl-3 shadow-sm">
        <Icon icon="octicon:law-24" class="size-14 text-primary" />
        <div class="">
          <h4 class="text-2xl font-semibold text-color-1">3</h4>
          <div class="text-gray-500">Attorneys</div>
        </div>
      </div>

      <!-- customers -->
      <div class="flex items-center gap-4 rounded-md border bg-gray-100/45 p-4 pl-3 shadow-sm">
        <Icon icon="bi:people" class="size-14 text-primary" />
        <div class="">
          <h4 class="text-2xl font-semibold text-color-1">25</h4>
          <div class="text-gray-500">Customers</div>
        </div>
      </div>
    </div>
  </div>
</template>
