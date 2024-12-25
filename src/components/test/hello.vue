<template>
  <div id="hello">
    <van-button plain type="primary">朴素按钮</van-button>
    <van-button plain type="info">朴素按钮</van-button>
    <h1>{{ message }}</h1>
    store数据：{{ $store.state.example }}

    <button @click="res1">请求一</button>
    <button @click="res2">请求二</button>
    <hr />
    <img src="../../assets/images/logo.png" />
    <div class="modal-static fade" id="myModal">
      <div
        class="modal-dialog"
        style="
          width: 200px;
          height: 40px;
          z-index: 20000;
          position: absolute;
          text-align: center;
          left: 50%;
          top: 50%;
          margin-left: -100px;
          margin-top: -10px;
          color: #fff;
        "
      >
        <h5>正在加载...</h5>
      </div>
    </div>
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup v-model="show">内容</van-popup>
  </div>
</template>

<script>
import { Button, Popup,Cell } from "vant";
export default {
  name: "HelloWorld",
  data() {
    return {
      message: "hello world!",
      show: false,
    };
  },
  components: {
    "van-button": Button,
    "van-popup": Popup,
    "van-cell": Cell
  },
  methods: {
     showPopup() {
      this.show = true;
    },
    res1() {
      this.$http
        .get("posts")
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    res2() {
      let myModal = new this.$bootstrap.Modal(
        document.getElementById("myModal")
      );
      myModal.show();
    },
  },
};
</script>

<style>
</style>