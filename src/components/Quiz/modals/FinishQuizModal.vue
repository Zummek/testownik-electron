<template>
<Modal @close="$emit('close')">
  <div slot="body">
    <div class="body-content">
      <img class="beer-image" src="@/assets/piwo.png">
      <div class="info">
        <h3>Koniec quizu!</h3>
        <p>Twój czas: {{ time | moment }}</p>
      </div>
    </div>
  </div>
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

  moment(date: any) {
    const duration = moment.duration(date, 'ms');
    return `${duration.hours().toFixed().padStart(2, '0')}:${duration.minutes().toFixed().padStart(2, '0')}:${duration.seconds().toFixed().padStart(2, '0')}`;
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.body-content {
  display: flex;
  align-items: center;
  padding: 0 32px;
  .beer-image {
    height: 256px;
  }
  .info {
    margin-left: 32px;
  }
}
</style>
