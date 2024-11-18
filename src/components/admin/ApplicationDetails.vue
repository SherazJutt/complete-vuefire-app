<template>
  <Dialog v-model:visible="props.visible" contentClass="p-4" :showHeader="false" headerClass="text-primary" header="Login" modal class="w-full max-w-[1000px]">
    <Icon icon="line-md:close" class="absolute right-2 top-2 size-6 cursor-pointer text-gray-300 duration-200 hover:text-red-500" @click="emit('close')" />
    <div class="space-y-4">
      <div class="w-full overflow-x-auto">
        <h4 class="text-center text-2xl font-semibold text-primary">Lead Details</h4>

        <table ref="printContent" id="print-section" class="table--main" cellspacing="0">
          <tbody>
            <TR :heading="true" :cols="4" :td="['Name', 'Email', 'Tier', 'Face Value']" />
            <TR :cols="4" :td="[props.application.user.firstName, props.application.user.email, formattedTier(props.application.finalPlanSelection.tier), props.application.finalPlanSelection.faceValue.label]" />

            <TR :heading="true" :cols="4" :td="['Plan Type', 'Term', 'Monthly Amount', 'Date Of Birth']" />
            <!-- prettier-ignore -->
            <TR :cols="4" :td="[
              props.application.finalPlanSelection.selectedPlan.planType,
              `$ ${props.application.finalPlanSelection.selectedPlan.term}`, 
              `$ ${props.application.finalPlanSelection.selectedPlan.tierPrice}`,
                props.application.form.dateOfBirth
               ]" class="capitalize" />

            <!-- home -->
            <TR :heading="true" :cols="4" :td="['Owns Home', 'Address', 'Interest Rate (%)', 'Date (mm/dd/yyyy)']" />
            <TR :cols="4" :td="[props.application.form.ownsHome ? 'Yes' : 'No', props.application.form.ownsHome ? props.application.form.homeData.yes.address : props.application.form.homeData.no.address, props.application.form.ownsHome ? props.application.form.homeData.yes.interestRate : '', props.application.form.ownsHome ? props.application.form.homeData.yes.date : '']" />

            <TR :heading="true" :cols="4" :td="['Gender', 'Date of birth', 'Height', 'Weight']" />
            <TR :cols="4" :td="[props.application.form.gender.label, props.application.form.dateOfBirth, `${props.application.form.height.feet} ft ${props.application.form.height.inches} in`, props.application.form.weight.value + ' lbs']" />

            <TR :heading="true" :cols="4" :td="['Military Affiliation', 'Branch Of Service', 'Grade At Separation', 'Years Served']" />
            <TR :cols="4" :td="[props.application.form.militaryAffiliation, props.application.form.branchOfService, props.application.form.gradeAtSeparation, `${props.application.form.yearsServed.start} - ${props.application.form.yearsServed.end}`]" />

            <TR :heading="true" :cols="4" :td="['Using Nicotine Products', 'Product Types', 'How Often', 'Date Last Used']" />
            <TR class="capitalize" :cols="4" v-if="props.application.form.usingNicotineProducts" :td="[props.application.form.usingNicotineProducts ? 'Yes' : 'No', props.application.form.usingNicotineProducts ? formattedArray(props.application.form.productType) : '', props.application.form.howOften, props.application.form.lastUsed]" />
            <TR class="capitalize" :cols="4" v-else :td="[props.application.form.usingNicotineProducts ? 'Yes' : 'No', props.application.form.usingNicotineProducts ? formattedArray(props.application.form.productType) : '', props.application.form.howOften, props.application.form.lastUsed]" />

            <TR :heading="true" :cols="4" :td="['Treated For Heart HIV or Liver Disease', 'Organ Transplant', 'Diagnosed Diseases', 'Veteranisms']" />
            <TR :cols="4" :td="[props.application.form.treatedForHeartHIVorLiverDisease ? 'Yes' : 'No', props.application.form.organTransplant ? 'Yes' : 'No', formattedArray(props.application.form.diagnosedDiseases), formattedArray(props.application.form.veteranisms)]" class="capitalize" />

            <TR :heading="true" :cols="4" :td="['Participate In', `Any Apply's`]" />
            <TR :cols="4" :td="[formattedArray(props.application.form.participate), formattedArray(props.application.form.anyApplys)]" class="capitalize" />
          </tbody>
        </table>
        <div class="text-right"><Button class="mt-4" @click="downloadPDF" label="Download PDF" /></div>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import { Icon } from '@iconify/vue/dist/iconify.js';
import TR from '../table/TR.vue';
import Button from 'primevue/button';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps(['application']);
const emit = defineEmits(['close']);

const formattedTier = (tier) => {
  const words = tier.split('_');
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const formattedArray = (items) => {
  const itemsArr = items.map((item) => {
    return item.replace(/-/g, ' ');
  });

  return itemsArr.join(', ');
};

const downloadPDF = () => {
  const doc = new jsPDF();

  autoTable(doc, {
    body: [
      // data
      ['Name', 'Email', 'Tier', 'Face Value'],
      [props.application.user.firstName, props.application.user.email, formattedTier(props.application.finalPlanSelection.tier), props.application.finalPlanSelection.faceValue.label],
      ['Plan Type', 'Term', 'Monthly Amount', 'Date Of Birth'],
      [props.application.finalPlanSelection.selectedPlan.planType, `$ ${props.application.finalPlanSelection.selectedPlan.term}`, `$ ${props.application.finalPlanSelection.selectedPlan.tierPrice}`, props.application.form.dateOfBirth],
      ['Owns Home', 'Address', 'Interest Rate (%)', 'Date (mm/dd/yyyy)'],
      [props.application.form.ownsHome ? 'Yes' : 'No', props.application.form.ownsHome ? props.application.form.homeData.yes.address : props.application.form.homeData.no.address, props.application.form.ownsHome ? props.application.form.homeData.yes.interestRate : '', props.application.form.ownsHome ? props.application.form.homeData.yes.date : ''],
      ['Gender', 'Date of birth', 'Height', 'Weight'],
      [props.application.form.gender.label, props.application.form.dateOfBirth, `${props.application.form.height.feet} ft ${props.application.form.height.inches} in`, props.application.form.weight.value + ' lbs'],
      ['Military Affiliation', 'Branch Of Service', 'Grade At Separation', 'Years Served'],
      [props.application.form.militaryAffiliation, props.application.form.branchOfService, props.application.form.gradeAtSeparation, `${props.application.form.yearsServed.start} - ${props.application.form.yearsServed.end}`],
      ['Using Nicotine Products', 'Product Types', 'How Often', 'Date Last Used'],
      [props.application.form.usingNicotineProducts ? 'Yes' : 'No', props.application.form.usingNicotineProducts ? formattedArray(props.application.form.productType) : '', props.application.form.howOften, props.application.form.lastUsed],
      ['Treated For Heart HIV or Liver Disease', 'Organ Transplant', 'Diagnosed Diseases', 'Veteranisms'],
      [props.application.form.treatedForHeartHIVorLiverDisease ? 'Yes' : 'No', props.application.form.organTransplant ? 'Yes' : 'No', formattedArray(props.application.form.diagnosedDiseases), formattedArray(props.application.form.veteranisms)],
      ['Participate In', `Any Apply's`],
      [formattedArray(props.application.form.participate), formattedArray(props.application.form.anyApplys)],
    ],
    // styles
    margin: { top: 10, bottom: 10, left: 10, right: 10 },
    bodyStyles: {
      cellPadding: 2.6,
    },
    didParseCell: (data) => {
      if (data.section === 'body') {
        data.cell.styles.lineWidth = 0.02;
        data.cell.styles.lineColor = '#e5e7eb';
      }
      if (data.row.index % 2 !== 0) {
        data.cell.styles.textColor = [51, 65, 85];
      }
      if (data.row.index % 2 === 0) {
        data.cell.styles.fillColor = [241, 245, 249];
        // data.cell.styles.fontStyle = 'bold';
      }
    },
  });

  doc.save('lead.pdf');
};
</script>
