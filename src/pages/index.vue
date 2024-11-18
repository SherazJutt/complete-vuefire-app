<script setup>
import { computed, ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import { useToast } from 'primevue/usetoast';
import FileUpload from 'primevue/fileupload';
import InputNumber from 'primevue/inputnumber';
import { useAddDoc } from '../composables/firebase';

const toast = useToast();

const form = ref({ fname: '', lname: '', email: '', phone: null, claimNumber: null, documents: [] });
const isSubmitting = ref(false);

const submit = async () => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(form.value.email)) {
    toast.add({ severity: 'error', summary: 'Invalid Email', detail: 'Please provide a valid email address.', life: 3000 });
    return;
  }

  isSubmitting.value = true;

  try {
    await useAddDoc('submissions', { ...form.value, timestamp: Date.now() });
    toast.add({ severity: 'success', summary: 'Your application has been submitted successfully', detail: '', life: 3000 });

    form.value = { fname: '', lname: '', email: '', phone: null, claimNumber: null, documents: [] };
  } catch (error) {
    toast.add({ severity: 'error', summary: 'An error occured while submitting your application', detail: '', life: 3000 });
  }

  isSubmitting.value = false;
};

const onAdvancedUpload = () => {
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

const canSubmit = computed(() => {
  if (form.value.fname && form.value.lname && form.value.phone && form.value.email && form.value.claimNumber) {
    return true;
  }
  return false;
});
</script>

<template>
  <h4 class="my-4 text-center text-2xl font-semibold text-primary md:my-8">User Details</h4>

  <div class="mx-auto grid w-full max-w-[1000px] grid-cols-1 gap-4 rounded-md border-gray-200 comd:grid-cols-2 comd:border comd:p-4 xl:p-8">
    <FloatLabel variant="on">
      <InputText id="lbl_fname" fluid v-model="form.fname" />
      <label for="lbl_fname">First name</label>
    </FloatLabel>

    <FloatLabel variant="on">
      <InputText id="lbl_lname" fluid v-model="form.lname" />
      <label for="lbl_lname">Last name</label>
    </FloatLabel>

    <FloatLabel variant="on" class="comd:col-span-2">
      <InputText id="lbl_email" fluid v-model="form.email" />
      <label for="lbl_email">Email</label>
    </FloatLabel>

    <FloatLabel variant="on">
      <InputNumber id="phone_lbl" v-model="form.phone" fluid />
      <label for="phone_lbl">Phone</label>
    </FloatLabel>

    <FloatLabel variant="on">
      <InputNumber id="claim_number_lbl" fluid v-model="form.claimNumber" />
      <label for="claim_number_lbl">Claim Number</label>
    </FloatLabel>

    <div class="comd:col-span-2">
      <FileUpload name="demo[]" url="/api/upload" :fileLimit="5" @upload="onAdvancedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
        <template #empty>
          <span>Drag and drop files to here to upload.</span>
        </template>
      </FileUpload>
    </div>

    <!-- submit -->
    <div class="text-center comd:col-span-2">
      <Button type="button" :loading="isSubmitting" :disabled="!canSubmit" class="w-full xs:max-w-[200px]" label="Submit" @click="submit"></Button>
    </div>
  </div>
</template>
