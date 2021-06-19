<template>
  <div :class="['titlebar draggable',
    {'fullscreen': isMaximized},
    {'titlebar-dark': theme === 'dark'},
    {'titlebar-reverse-controls-location': reverseControlsLocation}]"
  >
    <div class="titlebar-controls">
      <OSXControls
        v-if="controlsTheme === 'osx'"
        :theme="theme"
        :isMaximized="isMaximized"
        @minimize="minimize"
        @resize="resize"
        @close="close"
      />
      <ArcControls
        v-else-if="controlsTheme === 'linux'"
        :theme="theme"
        :isMaximized="isMaximized"
        @minimize="minimize"
        @resize="resize"
        @close="close"
      />
      <WindowsControls
        v-else
        :theme="theme"
        :isMaximized="isMaximized"
        @minimize="minimize"
        @resize="resize"
        @close="close"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

import ArcControls from './controls/ArcControls.vue';
import OSXControls from './controls/OSXControls.vue';
import WindowsControls from './controls/WindowsControls.vue';

const { remote } = window.require('electron');

@Component({
  components: {
    WindowsControls,
    ArcControls,
    OSXControls
  }
})
export default class Titlebar extends Vue {
  @Prop({ default: 'light' }) theme!: string;

  @Prop({ default: true }) reverseControlsLocation!: boolean;

  @Prop({ default: 'win' }) controlsTheme!: string;

  private win = remote.getCurrentWindow();

  private isMaximized = this.win.isMaximized();

  mounted() {
    this.win.on('maximize', () => {
      this.isMaximized = true;
    });
    this.win.on('unmaximize', () => {
      this.isMaximized = false;
    });
  }

  minimize() {
    this.win.minimize();
  }

  resize() {
    if (this.win.isMaximized()) {
      this.win.unmaximize();
    } else {
      this.win.maximize();
    }
  }

  close() {
    this.win.close();
  }
}
</script>

<style lang="scss" scoped>
$color: rgba(0,0,0,.75);
$color-dark: rgba(255,255,255,.5);
.titlebar-app-title {
  display: inline-block;
  vertical-align: top;
  span {
    color: $color;
    display: inline-block;
    font-size: 12px;
    line-height: 1em;
    margin: 10px 14px;
    transition: color .2s ease;
  }
}

.titlebar-dark .titlebar-app-title span {
  color: $color-dark;
}

.titlebar {
  display: flex;
  position: fixed;
  width: 100%;
  z-index: 9999;
  height: 32px;
  padding: 0;

  > * {
    order: 1;
  }
}

.titlebar-reverse-controls-location {
  .titlebar-controls {
    order: 0;
    margin-left: initial;
  }
}

.titlebar.draggable {
  -webkit-app-region: drag;
}

.titlebar-controls {
  margin-left: auto;
}

.titlebar:after,
.titlebar-controls:after {
  content: " ";
  display: table;
  clear: both;
}

.titlebar.draggable .titlebar-controls {
  -webkit-app-region: no-drag;
}
</style>
