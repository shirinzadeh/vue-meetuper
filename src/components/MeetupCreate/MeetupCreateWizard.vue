<template>
  <div class="meetup-create-form">
    <div class="current-step is-pulled-right">
      {{ currentStep }} of {{ allStepsCount }}
    </div>
    <!-- Form Steps -->
    <!-- meselen meetuplocation inputda nese yazib next edib, sora back edende input bos gosterir.
     cunki her defe vue yeni instance yaradir. keep-alive ile evvelki instance da oldugu kimi qalir -->

    <!-- ref ile child componente, onun function ve propertylrine accessimiz olur,
          bunun sayesinde componentlerin valid olub olmadigini yoxlayacagiq-->
    <keep-alive>
      <!-- <MeetupLocation
        v-if="currentStep === 1"
        @stepUpdated="mergeStepData"
        ref="currentComponent"
      />
      <MeetupDetail
        v-if="currentStep === 2"
        @stepUpdated="mergeStepData"
        ref="currentComponent"
      />
      <MeetupDescription
        v-if="currentStep === 3"
        @stepUpdated="mergeStepData"
        ref="currentComponent"
      />
      <MeetupConfirmation v-if="currentStep === 4" :meetupToCreate="form" /> -->

      <!-- https://vuejs.org/v2/guide/components.html#Dynamic-Components -->
      <!-- <MeetupLocation /> ile <component is="MeetupLocation"/> eyni seydir. 
      *** :is="" -i html taglarinde de istifade ederek component kimi davrandira bilirik-->
      <!-- :is-deki currentComponent-le ref-deki currentComponent casdirmasin. cunki :is-deki variabledi.
      ref-deki ise stringdir. cunki hec neye bind etmemisik. : isletmemisik -->
      <component
        :is="currentComponent"
        @stepUpdated="mergeStepData"
        ref="currentComponent"
        :meetupToCreate="form"
      />
    </keep-alive>

    <progress class="progress" :value="currentProgress" max="100">
      {{ currentProgress }}%
    </progress>
    <div class="controll-btns m-b-md">
      <button
        v-if="currentStep !== 1"
        @click="moveToPreviousStep"
        class="button is-primary m-r-sm"
      >
        Back
      </button>
      <button
        v-if="currentStep !== allStepsCount"
        @click="moveToNextStep"
        :disabled="!canProceed"
        class="button is-primary"
      >
        Next
      </button>
      <!-- Confirm Data -->
      <button @click="emitMeetupConfirm" v-else class="button is-primary">
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
import MeetupLocation from "./MeetupLocation";
import MeetupDetail from "./MeetupDetail";
import MeetupDescription from "./MeetupDescription";
import MeetupConfirmation from "./MeetupConfirmation";
export default {
  components: {
    MeetupLocation,
    MeetupDetail,
    MeetupDescription,
    MeetupConfirmation,
  },
  data() {
    return {
      currentStep: 1,
      /**silinir, cunki formsteps.length vererek computed property yaradirilir */
      // allStepsCount: 4,
      canProceed: false,
      formSteps: [
        "MeetupLocation",
        "MeetupDetail",
        "MeetupDescription",
        "MeetupConfirmation",
      ],

      form: {
        location: null,
        title: null,
        startDate: null,
        category: null,
        image: null,
        shortInfo: null,
        description: null,
        timeTo: null,
        timeFrom: null,
      },
    };
  },
  computed: {
    allStepsCount() {
      return this.formSteps.length;
    },
    currentProgress() {
      return (100 / this.allStepsCount) * this.currentStep;
    },
    currentComponent() {
      /** formsteps arrayinde componentlerin indexi 0 1 2 3dur. ama currentstep 1dir deye,
              0dan baslamasi ucun 1 cixiriq*/
      return this.formSteps[this.currentStep - 1];
    },
  },
  methods: {
    mergeStepData(step) {
      this.form = { ...this.form, ...step.data };
      this.canProceed = step.isValid;
    },
    moveToNextStep() {
      this.currentStep++;

      // https://vuejs.org/v2/api/#Vue-nextTick
      // Defer the callback to be executed after the next DOM update cycle.
      /**$nextTick callback function icerisindeki kod Vue update olandan sonra calisir
          yeni, movetonextstepe klikleyen kimi islemir. nexte klikleyib, sonraki sehife acilanda bu kod isleyir
          BELELIKLE NOVBETI SEHIFELERDEKI NEXT BUTTON DA INPUT DOLMAYIBSA DISABLE OLUR
       */
      this.$nextTick(() => {
        this.canProceed = !this.$refs["currentComponent"].$v.$invalid;
      });
    },
    moveToPreviousStep() {
      this.currentStep--;
      this.canProceed = true;
    },
    emitMeetupConfirm() {
      this.$emit("meetupConfirmed", this.form);
    },
  },
};
</script>

<style scoped>
.meetup-create-form {
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 840px;
  padding: 24px 16px 8px;
  width: 100%;
}
</style>