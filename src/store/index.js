import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

const example = {
    namespaced: true,
    // 数据源
    state: {
        count: 1
    },
    // 响应组件中的动作(过滤操作)
    actions: {
        display(context, value) {
            console.log(context, value);
            value += 1
            context.commit('DISPLAY', value);
        }
    },
    // 用于操作数据
    mutations: {
        DISPLAY(state, value) {
            state.count += value;
        }
    },
    // 用于将state中的数据进行加工
    getters: {
        bigCount(state) {
            return state.count * 10
        }
    }   
}

export default new Vuex.Store({
    modules: {
        'example':example
    }
})