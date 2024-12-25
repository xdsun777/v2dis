import axios from "axios";

const config = {
    baseURL: 'http://127.0.0.1:8888',
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    timeout: 3000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false, // default
}

let pendingRequest = new Map();

// 生成请求的key
function getRequestKey(config) {
    let {
        method,
        url,
        params,
        data
    } = config;
    // axios中取消请求及阻止重复请求的方法
    // 参数相同时阻止重复请求：
    // return [method, url, JSON.stringify(params), JSON.stringify(data)].join("&");
    // 请求方法相同，参数不同时阻止重复请求
    if (config.method == 'get') {
        return [method, url, params].join("&");
    }
    if (config.method == 'post' || config.method == 'put' || config.method == 'patch') {
        return [method, url, data].join("&");
    }

    return [method, url].join('&')
}

function addPendingRequest(config) {
    // console.log(config.url)
    let requestKey = getRequestKey(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pendingRequest.has(requestKey)) {
            pendingRequest.set(requestKey, cancel);
        }
    });
}

function removePendingRequest(config) {
    let requestKey = getRequestKey(config);
    if (pendingRequest.has(requestKey)) {
        // 如果是重复的请求，则执行对应的cancel函数
        let cancel = pendingRequest.get(requestKey);
        cancel(requestKey);
        // 将前一次重复的请求移除
        pendingRequest.delete(requestKey);
    }
}

// axios实例rs
const rs = axios.create(config)

// 请求拦截器
rs.interceptors.request.use(function (config) {
    // 检查是否存在重复请求，若存在则取消已发的请求
    removePendingRequest(config);
    // 把当前请求信息添加到pendingRequest对象中
    addPendingRequest(config);
    return config
}, function (error) {
    return Promise.reject(error)
})

// 响应拦截器
rs.interceptors.response.use(function (response) {
    console.log('拿到了数据', response.data);
    removePendingRequest(response.config);
    return response.data;
}, function (error) {
    // 从pendingRequest对象中移除请求
    removePendingRequest(error.config || {});
    if (axios.isCancel(error)) {
        console.log("求求你不要再点了");
    }
    return Promise.reject(error);
})

export default rs;