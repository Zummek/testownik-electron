<template lang="pug">
  #app(:theme="$store.state.theme")
    Titlebar(
      :theme="$store.state.theme"
      :controlsTheme="$store.state.controlsTheme"
      :reverseControlsLocation="$store.state.reverseControlsLocation"
    )
    SettingsModal(v-if="showSettingsModal" @close="showSettingsModal = false")
    InfoModal(v-if="showInfoModal" @close="showInfoModal = false")
    WhatsNewModal(v-if="showWhatsNewModal" @close="showWhatsNewModal = false")
    transition(name="page-component-fade" mode="out-in")
      router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import InfoModal from '@/components/shared/modals/InfoModal.vue';
import SettingsModal from '@/components/shared/modals/SettingsModal.vue';
import WhatsNewModal from '@/components/shared/modals/WhatsNewModal.vue';
import Titlebar from '@/components/titlebar/Titlebar.vue';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'semantic-ui-css/semantic.min.css';

// const appVersion = require('electron').remote.app.getVersion();

const Store = window.require('electron-store');

const store = new Store();

@Component({
  components: {
    Titlebar,
    SettingsModal,
    InfoModal,
    WhatsNewModal
  }
})
export default class App extends Vue {
  private showSettingsModal = false;

  private appVersion = 'lastVersion';

  private showInfoModal = false;

  private showWhatsNewModal = false;

  private mounted() {
    if (store.get('lastVersion') !== this.appVersion) {
      this.showWhatsNewModal = true;
      store.set('lastVersion', this.appVersion);
    }
  }
}
</script>

<style lang="scss" src="@/styles/app.scss"></style>
