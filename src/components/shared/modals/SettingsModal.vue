<template>
<Modal @close="$emit('close')" :theme="theme">
  <div slot="header">
    <h3>Ustawienia</h3>
  </div>
  <div slot="body">
    <div class="section">
      <div class="section-title">
        <span>Motyw</span>
      </div>
      <label class="custom-radio-button section-option" :theme="theme">
        <input class="custom-radio-button" type="radio" v-model="theme" value="dark">
        <span class="helping-el"></span>
        <span class="label-text">Ciemny</span>
      </label>
      <label class="custom-radio-button section-option" :theme="theme">
        <input class="custom-radio-button" type="radio" v-model="theme" value="light">
        <span class="helping-el"></span>
        <span class="label-text">Jasny</span>
      </label>
      <label class="custom-radio-button section-option" :theme="theme">
        <input class="custom-radio-button" type="radio" v-model="theme" value="legacy">
        <span class="helping-el"></span>
        <span class="label-text">Klasyczny</span>
      </label>
    </div>
    <div class="section">
      <div class="section-title">
        <span>Pasek tytułu</span>
      </div>
      <v-select
        class="v-select"
        :theme="theme"
        :options="controlThemes"
        :selectedOption.sync="controlsTheme"
      />
      <label class="custom-checkbox section-option" :theme="theme">
        <input class="custom-radio-button" type="checkbox" v-model="reverseControlsLocation">
        <span class="helping-el"></span>
        <span class="label-text">Przyciski po lewej stronie</span>
      </label>
    </div>
    <div class="section">
      <div class="section-title">
        <span>Quiz</span>
      </div>
      <div class="section-option">
        <label for="reoccurrences-if-bad-input">Liczba dodatkowych powtórzeń przy błędnej odpowiedzi</label>
        <input
          :theme="theme"
          class="custom-input line"
          id="reoccurrences-if-bad-input"
          type="number"
          min="0"
          max="10"
          step="1"
          v-model.number="reoccurrencesIfBad"
          @blur="reoccurrencesIfBadBlurred">
      </div>
      <div class="section-option">
        <label for="reoccurrences-on-start-input">Wstępna liczba powtórzeń</label>
        <input
          :theme="theme"
          class="custom-input line"
          id="reoccurrences-on-start-input"
          type="number"
          min="1"
          max="10"
          step="1"
          v-model.number="reoccurrencesOnStart"
          @blur="reoccurrencesOnStartBlurred">
      </div>
      <div class="section-option">
        <label for="max-reoccurrences-input">Maksymalna liczba powtórzeń</label>
        <input
          :theme="theme"
          class="custom-input line"
          id="max-reoccurrences-input"
          type="number"
          min="1"
          max="10"
          step="1"
          v-model.number="maxReoccurrences"
          @blur="maxReoccurrencesBlurred">
      </div>
    </div>
  </div>
</Modal>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';

import Modal from '@/components/shared/Modal.vue';
import VSelect from '@/components/shared/v-select.vue';

import controlThemes from '@/config/controlThemes';

@Component({
  components: {
    Modal,
    VSelect
  }
})
export default class SettingsModal extends Vue {
  private controlThemes: any;

  private theme = this.$store.state.theme;

  private controlsTheme = controlThemes.find((i:any) => i.value === this.$store.state.controlsTheme);

  private reverseControlsLocation = this.$store.state.reverseControlsLocation;

  private reoccurrencesIfBad = this.$store.state.reoccurrencesIfBad;

  private reoccurrencesIfBadFocused = false;

  private reoccurrencesOnStart = this.$store.state.reoccurrencesOnStart;

  private reoccurrencesOnStartFocused = false;

  private maxReoccurrences = this.$store.state.maxReoccurrences;

  private maxReoccurrencesFocused = false;

  @Watch('theme') onThemeChange(value: string): void {
    this.$store.dispatch('setTheme', value);
  }

  @Watch('controlsTheme') onControlsThemeChange(value: typeof controlThemes[0]): void {
    this.$store.dispatch('setControlsTheme', value.value);
  }

  @Watch('reverseControlsLocation') onReverseControlsLocationChange(value: boolean): void {
    this.$store.dispatch('setReverseControlsLocation', value);
  }

  @Watch('reoccurrencesIfBad') onReoccurrencesIfBadChange(value: number): void {
    if (value >= 0 && value <= 10) this.$store.dispatch('setReoccurrencesIfBad', value);
  }

  @Watch('reoccurrencesOnStart') onReoccurrencesOnStartChange(value: number): void {
    if (value >= 1 && value <= 10) this.$store.dispatch('setReoccurrencesOnStart', value);
  }

  @Watch('maxReoccurrences') onMaxReoccurrencesChange(value: number): void {
    if (value >= 1 && value <= 10) this.$store.dispatch('setMaxReoccurrences', value);
  }

  private reoccurrencesIfBadBlurred(): void {
    if (!this.reoccurrencesIfBad || this.reoccurrencesIfBad <= 0) this.reoccurrencesIfBad = 0;
    else if (this.reoccurrencesIfBad > 10) this.reoccurrencesIfBad = 10;
  }

  private reoccurrencesOnStartBlurred(): void {
    if (this.reoccurrencesOnStart < 1) this.reoccurrencesOnStart = 1;
    else if (this.reoccurrencesOnStart > 10) this.reoccurrencesOnStart = 10;
  }

  private maxReoccurrencesBlurred(): void {
    if (this.maxReoccurrences < 1) this.maxReoccurrences = 1;
    else if (this.maxReoccurrences > 10) this.maxReoccurrences = 10;
  }
}
</script>

<style lang="scss">
@import "@/styles/colors.scss";

.section {
  margin: 24px 0;

  .section-title {
    margin-bottom: 8px;
    font-size: 1.1em;
    font-weight: 400;
  }
  .section-option {
    display: block;
    margin: 4px 0;

    select,
    input[type=text],
    input[type=number] {
      display: block;
      width: 100%;
    }

    label {
      margin-top: 8px;
      display: block;
      color: var(--secondary-text);
      text-transform: uppercase;
      font-size: .75em;
      font-weight: 700;
    }
  }
  .v-select {
    margin: 0 0 16px 0;
  }
}
</style>
