import VueRouter from "vue-router";
import HelloWorld from '@components/test/hello.vue'

export default new VueRouter({
    routes: [
        {
            name: 'tes',
            path: '/test',
            component: HelloWorld
        }
    ]
})