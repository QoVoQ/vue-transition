/**
 ** ********************************************************
 ** @file router.js
 ** @author zhongxian_liang <zhongxian_liang@kingdee.com>
 ** @date 2018-06-29 09:33:23
 ** @last_modified_by zhongxian_liang <zhongxian_liang@kingdee.com>
 ** @last_modified_date 2018-06-29 14:26:07
 ** @copyright (c) 2018 @yfe/vue-transition
 ** ********************************************************
 */

import Vue from 'vue';
import Router from 'vue-router';
import VA from '@/views/VA/Index.vue';
import VB from '@/views/VB/Index.vue';
import VBSub from '@/views/VB/Sub.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'va',
      component: VA,
    },
    {
      path: '/vb',
      name: 'vb',
      component: VB,
    },
    {
      path: '/vb/sub',
      name: 'vbSub',
      component: VBSub,
    },
  ],
});
