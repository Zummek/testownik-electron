<template>
  <div class="progress-bar-container" :style="{ background: backgroundColor }">
    <div class="progress-bar-progress" :style="{ width: percentageProgressValue + '%', background: color }"></div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Quiz extends Vue {
  @Prop({ default: 8 }) height!: number;

  @Prop({ default: 0 }) progress!: number;

  @Prop({ default: '#39b54a' }) color!: string;

  @Prop({ default: 'rgba(255,255,255,.1)' }) backgroundColor!: string;

  percentageProgressValue() {
    return this.progress * 100;
  }
}
</script>

<style lang="scss" scoped>
.progress-bar-container {
  display: inline-block;
  width: 150px;
  height: 6px;
  border-radius: 4px;
  transition: background .2s ease;
}
.progress-bar-progress {
  height: 100%;
  border-radius: 4px;
  transition: width .2s ease, background .2s ease;
}
</style>
