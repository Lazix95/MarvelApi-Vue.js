import Vue from 'vue';
import App from './App.vue';
import VueLocalStorage from 'vue-localstorage';
import Vue2TouchEvents from 'vue2-touch-events';

export const EventBus = new Vue();

Vue.use(VueLocalStorage);
Vue.use(Vue2TouchEvents)

new Vue({
  el: '#app',
  render: h => h(App)
});
