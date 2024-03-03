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
          :style="{ top: scrollPosition + 'px' }"
          @mouseover="setHover(true)"
          @mouseout="setHover(false)"
        >
          <div
            class="player"
            :class="{ active: chatName === player.name }"
            v-for="player in chatPlayerList"
            :key="player.vid"
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
            <a-textarea
              class="input-box"
              placeholder=""
              :rows="8"
              @keyup="handleStopPropagation"
              v-model="textarea"
            />
            <div class="chat-btn">
              <!-- 取消按钮 -->
              <a-button style="margin-right: 5px" @click="chatShowHandler"
                >取消</a-button
              >
              <!-- 发送按钮 -->
              <a-button icon="check" @click.stop="sendMessage">发送</a-button>
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
      isChatting: false,
      // hover标识
      isHovered: false,
      // 初始化滚动定位
      scrollPosition: 0,
      // 选中的聊天对象名
      chatName: "",
      // textarea
      textarea: "",
    };
  },
  computed: {
    // 聊天的玩家列表
    chatPlayerList() {
      // 玩家标志
      const isSpectator = this.$store.state.session.isSpectator;
      // 取出玩家信息
      const { players } = this.$store.state.players;
      // chatPlayerList
      let chatPlayerList = [];

      // 若为玩家
      if (isSpectator) {
        // StoryTeller的chatId
        const stChatId = "host" + this.$store.state.session.sessionId;
        chatPlayerList.push({
          id: "host" + this.$store.state.session.sessionId,
          name: "StoryTeller",
          vid: "storyteller",
          chatId: stChatId,
        });
      } else {
        // 若为StoryTeller
        // 过滤字段 添加自定义字段
        chatPlayerList = players.map((item, index) => {
          return { id: item.id, name: item.name, vid: index, chatId: item.id };
        });
      }
      return chatPlayerList;
    },
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
    // 处理选择聊天对象
    handleChoosePlayer(player) {
      this.chatName = player.name;
    },
    // input时阻止冒泡
    handleStopPropagation() {
      event.stopPropagation();
    },
    // 发送
    sendMessage() {
      console.log("sendMessage");
    },
  },
};
</script>

<style lang="scss" scoped>
// 滚动条样式修改
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.15);
  transition: color 0.2s ease;
}
// 组件样式
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
      overflow-x: hidden;
      overflow-y: scroll;
      .player {
        width: 200px;
        height: 80px;
        background-color: #fbfbfb;
        border-bottom: 1px solid #e8e8e8;
      }
      .active {
        background-color: #e3e3e3;
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
        .input-box {
          // 消除input的默认样式
          background: none;
          outline: none;
          border: none;
          &:focus {
            // ant-input focus的蓝框效果是用box-shadow实现的
            box-shadow: none;
          }
        }
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
