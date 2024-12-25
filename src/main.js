import Vue from 'vue'
// import Vant from 'vant'
import VueRouter from "vue-router";
import * as bootstrap from 'bootstrap'


// import Button from 'vant/lib/button';
// import 'vant/lib/button/style';
import('vant/lib/index.css')
import(/* webpackPrefetch: true */ 'bootstrap/dist/css/bootstrap.min.css');

import App from './app.vue'
import router from './router/index'
import store from './store/index'
import rs from './apis/index'

Vue.use(VueRouter)
// Vue.use(Vant)

Vue.prototype.$http = rs
Vue.prototype.$bootstrap = bootstrap

Vue.config.productionTip = false

const vm = new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#root')