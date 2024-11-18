<template>
  <div class="container flex h-screen w-screen items-center justify-center">
    <div class="w-full max-w-[440px] space-y-4 rounded-md border p-4 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
      <div class="space-y-4">
        <h4 class="text-center text-2xl font-semibold text-primary">Signup</h4>
        <FloatLabel variant="on" class="w-full">
          <InputText id="fname_lbl" class="w-full" v-model="user.fname" />
          <label for="name_lbl">First Name</label>
        </FloatLabel>

        <FloatLabel variant="on" class="w-full">
          <InputText id="lname_lbl" class="w-full" v-model="user.lname" />
          <label for="name_lbl">Last Name</label>
        </FloatLabel>

        <FloatLabel variant="on" class="w-full">
          <InputText id="phone_lbl" class="w-full" v-model="user.phone" />
          <label for="phone_lbl">Phone</label>
        </FloatLabel>

        <FloatLabel variant="on" class="w-full">
          <InputText id="phone_lbsl89" class="w-full" v-model="user.calendly" />
          <label for="phone_lbsl89">Calendly Link</label>
        </FloatLabel>

        <FloatLabel variant="on" class="w-full">
          <InputText id="email_lbl" class="w-full" v-model="user.email" />
          <label for="email_lbl">Email</label>
        </FloatLabel>

        <FloatLabel variant="on" class="w-full">
          <Password v-model="user.password" :feedback="false" toggleMask class="w-full" inputClass="w-full" inputId="password_lbl" />
          <label for="password_lbl">Password</label>
        </FloatLabel>
        <Button type="button" class="w-full" :disabled="isSigningUp || !user.email || !user.password || !user.fname || !user.lname || !user.phone || !user.calendly" label="Signup" @click="SignUp"></Button>
      </div>
    </div>
  </div>
  <Toast />
</template>

<script setup>
import { ref } from 'vue';
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import FloatLabel from 'primevue/floatlabel';
import { useToast } from 'primevue/usetoast';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire';
import { useSetDoc, useGetDoc } from '@/composables/firebase';

import { useAuth } from '@stores/Auth';
const { state: authState } = useAuth();

import { useApp } from '@stores/App';
const { state } = useApp();

const toast = useToast();
const auth = useFirebaseAuth();

const isSigningUp = ref(false);
const user = ref({ fname: '', lname: '', phone: '', calendly: '', email: '', password: '', role: 'admin' });

const SignUp = () => {
  if (!user.value.fname || !user.value.lname || !user.value.email || !user.value.password) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Please enter email and password', life: 3000 });
    return;
  }

  isSigningUp.value = true;

  createUserWithEmailAndPassword(auth, user.value.email, user.value.password)
    .then(async (data) => {
      updateProfile(auth.currentUser, {
        displayName: user.value.fname + ' ' + user.value.lname,
      });

      const res = await useSetDoc('users', data.user.uid, {
        role: user.value.role,
        firstName: user.value.fname,
        lastName: user.value.lname,
        email: user.value.email,
        userId: data.user.uid,
        isDisabled: false,
        createdAt: new Date(),
      });

      const userData = await useGetDoc('users', data.user.uid);

      authState.user = userData;
      toast.add({ severity: 'success', summary: 'Success', detail: 'Sign up successful', life: 3000 });
      state.showSignupForm = false;
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.add({ severity: 'error', summary: 'Error', detail: 'The email address is already in use by another account.', life: 3000 });
          break;
        case 'auth/weak-password':
          toast.add({ severity: 'error', summary: 'Error', detail: 'The password must be at least 6 characters long.', life: 3000 });
          break;
        default:
          console.log(error);
          toast.add({ severity: 'error', summary: 'Error', detail: 'Somhting went wrong.', life: 3000 });
          break;
      }
    });
};
</script>
