import Vue from 'Vue';

import colors from '../src/config/colors';

declare module 'vue/types/vue' {
  interface Vue {
    $color: typeof colors;
  }
}
