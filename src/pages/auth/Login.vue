<template>
  <div class="container flex h-screen w-screen items-center justify-center">
    <div class="w-full max-w-[440px] space-y-4 rounded-md border p-4 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
      <h4 class="text-center text-2xl font-semibold text-primary">Login</h4>
      <FloatLabel variant="on" class="w-full">
        <InputText id="email_lbl" class="w-full" v-model="user.email" />
        <label for="email_lbl">Email</label>
      </FloatLabel>

      <FloatLabel variant="on" class="w-full">
        <Password v-model="user.password" :feedback="false" toggleMask class="w-full" inputClass="w-full" inputId="password_lbl" />
        <label for="password_lbl">Password</label>
      </FloatLabel>
      <Button type="button" :loading="isLogginIn" class="w-full" :disabled="isLogginIn" label="Login" @click="login"></Button>
    </div>
  </div>
  <Toast />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import FloatLabel from 'primevue/floatlabel';
import { useToast } from 'primevue/usetoast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire';
import Toast from 'primevue/toast';
import { useGetDoc } from '@/composables/firebase';

import { useRouter } from 'vue-router';
const router = useRouter();

const toast = useToast();
const auth = useFirebaseAuth();

const isLogginIn = ref(false);
const user = ref({ email: 'user@admin.com', password: '12345678' });

const login = async () => {
  if (!user.value.email || !user.value.password) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Please enter email and password', life: 3000 });
    return;
  }

  isLogginIn.value = true;

  signInWithEmailAndPassword(auth, user.value.email, user.value.password)
    .then(async (userCredentials) => {
      const userData = await useGetDoc('users', userCredentials.user.uid);
      authState.user = userData;

      if (userData.role === 'admin') {
        router.push({ name: 'admin' });
      } else if (userData.role === 'employee') {
        router.push({ name: 'employee' });
      } else {
        router.push('/invalid-url');
      }
    })
    .catch((error) => {
      isLogginIn.value = false;
      switch (error.code) {
        case 'auth/user-not-found':
          toast.add({ severity: 'error', summary: 'Error', detail: 'User not found', life: 3000 });
          break;
        case 'auth/wrong-password':
          toast.add({ severity: 'error', summary: 'Error', detail: 'Wrong password', life: 3000 });
          break;
        case 'auth/invalid-credential':
          toast.add({ severity: 'error', summary: 'Error', detail: 'Invalid credentials', life: 3000 });
          break;
        default:
          toast.add({ severity: 'error', summary: 'Error', detail: 'An unknown error occurred', life: 3000 });
          break;
      }
    });
};
</script>
