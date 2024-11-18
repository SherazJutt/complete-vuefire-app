<template>
  <div class="fixed inset-0 z-[99999999] bg-white">
    <table class="table--main mx-auto max-w-[1000px]" cellspacing="0">
      <tbody>
        <TR :heading="true" :cols="4" :td="['Name', 'Email', 'Tier', 'Face Value']" />
        <TR :cols="4" :td="[props.application.user.firstName, props.application.user.email, formattedTier(props.application.finalPlanSelection.tier), props.application.finalPlanSelection.faceValue.label]" />

        <TR :heading="true" :cols="4" :td="['Plan Type', 'Term', 'Monthly Amount', 'Date Of Birth']" />
        <!-- prettier-ignore -->
        <TR :cols="4" :td="[
              props.application.finalPlanSelection.selectedPlan.planType,
              props.application.finalPlanSelection.selectedPlan.term, 
              `$ ${props.application.finalPlanSelection.tier === 'standard_nt' ? 
                  props.application.finalPlanSelection.selectedPlan.standard_nt :
                  props.application.finalPlanSelection.selectedPlan.standard_st_t}`,
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
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import TR from '../table/TR.vue';

const props = defineProps(['application']);

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

onMounted(() => {
  window.print();
});
</script>
<style></style>
