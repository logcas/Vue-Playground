import Vue from 'vue';
import Router from 'vue-router';
import Waterfall from '@/views/WaterFall';
import LazyLoad from '@/views/Lazyload';

Vue.use(Router);

const routes = [
  {
    path: '/waterfall',
    component: Waterfall
  },
  {
    path: '/lazy',
    component: LazyLoad
  }
];

export default new Router({
  routes
});