import Vue from 'vue';
import Vuex from 'vuex';

const Store = window.require('electron-store');

const electronStore = new Store();

Vue.use(Vuex);

export interface State {
  recentFolders: string[];
  theme: string,
  controlsTheme: string,
  reverseControlsLocation: boolean,
  reoccurrencesIfBad: number,
  reoccurrencesOnStart: number,
  maxReoccurrences: number,
}

export default new Vuex.Store<State>({
  state: {
    recentFolders: electronStore.get('recentFolders', []) as string[],

    theme: electronStore.get('theme', 'light') as string,
    controlsTheme: electronStore.get('controlsTheme', 'win') as string,
    reverseControlsLocation: electronStore.get('reverseControlsLocation') as boolean,

    reoccurrencesIfBad: electronStore.get('reoccurrencesIfBad', 0) as number,
    reoccurrencesOnStart: electronStore.get('reoccurrencesOnStart', 2) as number,
    maxReoccurrences: electronStore.get('maxReoccurrences', 10) as number
  },
  mutations: {
    addNewRecentFolder(state, folderPath) {
      state.recentFolders.splice(0, 0, folderPath);
    },
    deleteRecentFolder(state, folderPath) {
      const index = state.recentFolders.indexOf(folderPath);
      if (index !== -1) {
        state.recentFolders.splice(index, 1);
      }
    },
    setTheme(state, theme) {
      state.theme = theme;
    },
    setControlsTheme(state, controlsTheme) {
      state.controlsTheme = controlsTheme;
    },
    setReverseControlsLocation(state, reverseControlsLocation) {
      state.reverseControlsLocation = reverseControlsLocation;
    },
    setReoccurrencesIfBad(state, value) {
      state.reoccurrencesIfBad = value;
    },
    setReoccurrencesOnStart(state, value) {
      state.reoccurrencesOnStart = value;
    },
    setMaxReoccurrences(state, value) {
      state.maxReoccurrences = value;
    }
  },
  actions: {
    addNewRecentFolder({ commit }, folderPath) {
      const folders = electronStore.get('recentFolders') as State['recentFolders'];
      const index = folders.indexOf(folderPath);
      if (index > -1) {
        return;
      }
      folders.splice(0, 0, folderPath);
      electronStore.set('recentFolders', folders);
      commit('addNewRecentFolder', folderPath);
    },
    deleteRecentFolder({ commit }, folderPath) {
      const folders = electronStore.get('recentFolders') as State['recentFolders'];
      const index = folders.indexOf(folderPath);
      if (index === -1) {
        return;
      }
      folders.splice(index, 1);
      electronStore.set('recentFolders', folders);
      commit('deleteRecentFolder', folderPath);
    },
    setTheme({ commit }, theme) {
      electronStore.set('theme', theme);
      commit('setTheme', theme);
    },
    setControlsTheme({ commit }, controlsTheme) {
      electronStore.set('controlsTheme', controlsTheme);
      commit('setControlsTheme', controlsTheme);
    },
    setReverseControlsLocation({ commit }, reverseControlsLocation) {
      electronStore.set('reverseControlsLocation', reverseControlsLocation);
      commit('setReverseControlsLocation', reverseControlsLocation);
    },
    setReoccurrencesIfBad({ commit }, value) {
      electronStore.set('reoccurrencesIfBad', value);
      commit('setReoccurrencesIfBad', value);
    },
    setReoccurrencesOnStart({ commit }, value) {
      electronStore.set('reoccurrencesOnStart', value);
      commit('setReoccurrencesOnStart', value);
    },
    setMaxReoccurrences({ commit }, value) {
      electronStore.set('maxReoccurrences', value);
      commit('setMaxReoccurrences', value);
    }
  }

});
