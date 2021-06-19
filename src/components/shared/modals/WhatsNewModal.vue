<template>
<Modal @close="$emit('close')">
  <div slot="body">
    <h2>Co nowego w wersji {{ appVersion }}?</h2>
    <ul v-if="whatsnew" class="whatsnew-ul">
      <li v-for="(paragraph, index) in whatsnew" :key="index">{{ paragraph }}</li>
    </ul>
    <div v-else>Przepraszamy, wystąpił problem</div>
  </div>
</Modal>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

import Modal from '@/components/shared/Modal.vue';

// import { versions } from '@/changelog';

// const appVersion = require('electron').remote.app.getVersion();

@Component({
  components: {
    Modal
  }
})
export default class WhatsNewModal extends Vue {
  protected appVersion: any;

  private whatsnew = false;// versions[appVersion];
}
</script>

<style lang="scss">
@import "@/styles/colors.scss";

h2 {
  margin-bottom: 16px;
}

.whatsnew-ul {
  padding-left: 24px;
  > li {
    font-size: 0.875em;
    margin: 6px 0;
  }
}
</style>
