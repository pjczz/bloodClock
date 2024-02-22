<template>
  <!-- 组件容器 -->
  <div class="chat-wrapper">
    <!-- 聊天框 -->
    <div class="chat-container" v-show="isChatting">
      <!-- 玩家列表 -->
      <div
        class="playerList"
        ref="playerList"
        :style="{ top: scrollPosition + 'px' }"
        @mouseover="setHover(true)"
        @mouseout="setHover(false)"
        @wheel.prevent="handleScroll"
      >
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
            <a-button icon="check">发送</a-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 未展示聊天框时的按钮 -->
    <a-button
      icon="message"
      size="large"
      v-show="!isChatting"
      @click="chatShowHandler"
      >Chat</a-button
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
      // hover标识
      isHovered: false,
      // 初始化滚动定位
      scrollPosition: 0,
      // 玩家列表
      playerList: [
        { id: "001", name: "Jason", uid: "wlrhog" },
        { id: "002", name: "Alex", uid: "giug" },
        { id: "003", name: "ilin", uid: "wlrhz3og" },
        { id: "004", name: "ilin", uid: "wlrhz3og" },
        { id: "005", name: "ilin", uid: "wlrhz3og" },
        { id: "006", name: "ilin", uid: "wlrhz3og" },
        { id: "007", name: "ilin", uid: "wlrhz3og" },
        { id: "008", name: "ilin", uid: "wlrhz3og" },
        { id: "009", name: "ilin", uid: "wlrhz3og" },
        { id: "010", name: "ilin", uid: "wlrhz3og" },
        { id: "011", name: "ilin", uid: "wlrhz3og" },
        { id: "012", name: "ilin", uid: "wlrhz3og" },
      ],
    };
  },
  methods: {
    // 控制聊天界面展示与否的回调
    chatShowHandler() {
      this.isChatting = !this.isChatting;
    },
    // 设置hover标识
    setHover(value) {
      this.isHovered = value;
    },
    // 处理滚动
    handleScroll(event) {
      const deltaY = event.deltaY;
      const playerListItemHeight = 80;
      const enableDeltaY =
        playerListItemHeight * this.playerList.length -
        this.$refs.playerList.clientHeight;

      if (this.isHovered) {
        this.scrollPosition -= deltaY;
        console.log(this.scrollPosition);
        // 顶端修正
        if (this.scrollPosition > 0) {
          this.scrollPosition = 0;
        }
        // 底部修正
        if (-this.scrollPosition > enableDeltaY) {
          this.scrollPosition = -enableDeltaY;
        }
      }

      // 阻值默认滚动
      event.preventDefault();
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
    width: 700px;
    height: 500px;
    z-index: 999;
    overflow: hidden;
    .playerList {
      width: 200px;
      height: 500px;
      background-color: #f3f3f3;
      position: absolute;
      transition: top 0.3s ease;
      .player {
        width: 200px;
        height: 80px;
        background-color: #fbfbfb;
        border-bottom: 1px solid #e8e8e8;
      }
    }
    .chat {
      position: absolute;
      right: 0;
      .chat-history {
        width: 500px;
        height: 350px;
        background-color: #f3f3f3;
        outline: 1px solid #e8e8e8;
        outline-offset: -1px;
      }
      .chat-input {
        width: 500px;
        height: 150px;
        background-color: #f3f3f3;
        outline: 1px solid #e8e8e8;
        outline-offset: -1px;
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
