import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index';
import vueLazy from 'vue-lazyload';

Vue.config.productionTip = false

Vue.use(vueLazy, {
  filter: {
    webp (listener, options) {
        if (options.supportWebp) return
        listener.src += '?hello=11'
    }
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
