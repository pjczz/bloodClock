<template>
  <!-- 组件容器 -->
  <div class="chat-wrapper">
    <!-- 聊天框 -->
    <div class="chat-container" v-show="isChatting">
      <!-- 玩家列表 -->
      <div class="playerList">
        <div class="player" v-for="player in playerList" :key="player.id"></div>
      </div>
      <!-- 聊天框 -->
      <div class="chat">
        <!-- 历史记录 -->
        <div class="chat-history"></div>
        <!-- 输入框 -->
        <div class="chat-input">
          <div class="chat-btn">
            <!-- 取消按钮 -->
            <a-button style="margin-right: 5px" @click="chatShowHandler"
              >取消</a-button
            >
            <!-- 发送按钮 -->
            <a-button type="primary" icon="check">发送</a-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 未展示聊天框时的按钮 -->
    <a-button
      icon="wechat"
      size="large"
      v-show="!isChatting"
      @click="chatShowHandler"
      >WeChat</a-button
    >
  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "ant-design-vue";

Vue.use(Button);

export default {
  data() {
    return {
      // 初始化不显示聊天界面
      isChatting: true,
      // 玩家列表
      playerList: [
        { id: "001", name: "Jason", uid: "wlrhog" },
        { id: "002", name: "Alex", uid: "giug" },
        { id: "003", name: "ilin", uid: "wlrhz3og" },
      ],
    };
  },
  methods: {
    // 控制聊天界面展示与否的回调
    chatShowHandler() {
      this.isChatting = !this.isChatting;
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-wrapper {
  position: absolute;
  bottom: 50px;
  right: 50px;
  .chat-container {
    display: flex;
    width: 700px;
    height: 500px;
    background-color: red;
    z-index: 999;
    .playerList {
      width: 200px;
      height: 500px;
      background-color: #bfa;
      .player {
        width: 200px;
        height: 80px;
        background-color: #fff;
        border: 1px solid gray;
      }
    }
    .chat {
      .chat-history {
        width: 500px;
        height: 300px;
        background-color: #fff;
        border: 1px solid gray;
      }
      .chat-input {
        width: 500px;
        height: 200px;
        border: 1px solid gray;
        .chat-btn {
          position: absolute;
          bottom: 10px;
          right: 20px;
        }
      }
    }
  }
}
</style>
