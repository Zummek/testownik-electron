import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from '@/components/LandingPage.vue';
import Quiz from '@/components/Quiz.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/quiz',
      name: 'quiz',
      props: true,
      component: Quiz
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
