<template>
  <!-- 组件容器 -->
  <div class="chat-wrapper">
    <!-- 动态展示聊天框 -->
    <div v-show="isChatting">
      <!-- 聊天框顶部 -->
      <div class="chat-head">
        <a-input-search class="playerSearch" placeholder="input search text" />
        <span class="chatName">{{ chatName }}</span>
      </div>
      <!-- 聊天框 -->
      <div class="chat-container">
        <!-- 玩家列表 -->
        <div
          class="playerList"
          ref="playerList"
          :style="{ top: scrollPosition + 'px' }"
          @mouseover="setHover(true)"
          @mouseout="setHover(false)"
          @wheel.prevent="handleScroll"
        >
          <div
            class="player"
            :class="{ active: activeId === player.id }"
            v-for="player in playerList"
            :key="player.id"
            @click="handleChoosePlayer(player)"
          >
            <!-- 玩家信息 -->
            <div class="player-info" style="line-height: 80px">
              <a-avatar
                icon="user"
                size="large"
                style="margin-left: 10px"
              ></a-avatar>
              <span style="font-size: 16px; color: black; margin-left: 10px">{{
                player.name
              }}</span>
            </div>
          </div>
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
      // 跟谁聊天
      chatName: "",
      // 选中的id
      activeId: "",
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
    // 处理选择聊天对象
    handleChoosePlayer(player) {
      this.chatName = player.name;
      this.activeId = player.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-wrapper {
  position: absolute;
  bottom: 50px;
  right: 50px;
  z-index: 999;
  .chat-head {
    width: 700px;
    height: 40px;
    background-color: #f3f3f3;
    .playerSearch {
      width: 190px;
      line-height: 40px;
      margin-left: 5px;
    }
    .chatName {
      display: inline-block;
      width: 500px;
      text-align: center;
      color: black;
      font-size: 18px;
    }
  }
  .chat-container {
    width: 700px;
    height: 500px;
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
      .active {
        background-color: #f3f3f3;
      }
    }
    .chat {
      position: absolute;
      right: 0;
      .chat-history {
        width: 500px;
        height: 350px;
        background-color: #f3f3f3;
      }
      .chat-input {
        width: 500px;
        height: 150px;
        background-color: #f3f3f3;
        border-top: 1px solid #e8e8e8;
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
