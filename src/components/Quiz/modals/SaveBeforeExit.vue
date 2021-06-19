<template>
<Modal @close="$emit('close')">
  <div slot="body" class="body-content">
    <h3>Zapisać aktualny stan?</h3>
    <button @click="$emit('saveState')">
      <i><FontAwesomeIcon :icon="faSave"/></i>Zapisz
    </button><button @click="$emit('quitQuiz')">
      <i><FontAwesomeIcon :icon="faPowerOff"/></i>Wyjdź
    </button>
  </div>
  <template slot="modal-footer-button">Anuluj</template>
</Modal>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

import Modal from '@/components/shared/Modal.vue';

import moment from 'moment';

@Component({
  components: {
    Modal
  }
})
export default class Quiz extends Vue {
  @Prop() time!: number;

  private moment(date: any) {
    const duration = moment.duration(date, 'ms');
    return `${duration.hours().toFixed().padStart(2, '0')}:${duration.minutes().toFixed().padStart(2, '0')}:${duration.seconds().toFixed().padStart(2, '0')}`;
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.body-content {
  display: block;
  text-align: center;
  padding: 0;
  margin: 0 -8px;

  h3 {
    margin-bottom: 16px;
  }

  button {
    margin: 0 8px;
    width: calc(50% - 16px);
    height: 128px;
    display: inline-block;
    border: none;
    border-radius: 4px;
    font-family: 'Open Sans';
    cursor: pointer;
    background: rgba(var(--contrast-color), .03);
    color: rgba(var(--contrast-color), .6);
    transition: all .2s ease;
    i {
      display: block;
      margin-bottom: 8px;
      font-size: 2em;
      color: rgba(var(--contrast-color), .25);
    }
    &:hover {
      background: rgba(var(--contrast-color), .06);
    }
  }
}
</style>
