// import './utils/ald-stat'
import Vue from 'vue'
import App from './App'
import Mixin from '@/utils/mixin.js'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$UploadPictures = Mixin.UploadPictures;
import uView from "uview-ui";
Vue.use(uView);

import api from '@/api/api.js';
Vue.prototype.$api = api


import filter from './filters/index.js'
for (let key in filter) {
	Vue.filter(key, filter[key])
}

import Header from '@/components/header.vue'
Vue.component('Header', Header)

import store from './store'

const app = new Vue({
	store,
    ...App
})
app.$mount()
