import { createGlobalState } from '@vueuse/core';
import { onMounted, reactive, watch } from 'vue';
import { getCurrentUser, useCurrentUser, useFirebaseAuth } from 'vuefire';
import { useGetDoc } from '@/composables/firebase';

export const useAuth = createGlobalState(() => {
  const auth = useFirebaseAuth();

  const user = reactive({ user: null });

  const authenticate = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) return;

    const userDoc = await useGetDoc('users', currentUser.uid);
    state.user = userDoc;
  };

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        state.user = null;
      })
      .catch((error) => {
        alert('Error signing out');
      });
  };
  return { state, authenticate, logOut };
});
