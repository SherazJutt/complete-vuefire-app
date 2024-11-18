// note: make sure to update new added state values in reset function and also reset from website to sync the values with local storage

import { createGlobalState, useStorage } from '@vueuse/core';
import { computed, reactive, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useCurrentUser } from 'vuefire';

export const useApp = createGlobalState(() => {
  const toast = useToast();

  const state = reactive({});

  return { state };
});
