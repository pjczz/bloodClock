<template>
  <!-- 组件容器 -->
  <div class="chat-wrapper">
    <!-- 动态展示聊天框 -->
    <div v-show="showChatting">
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
            :key="player.name"
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
          <div class="chat-history">
            <div
              class="chat-history-container"
              v-for="ch in chatHistoryList"
              :key="ch.mid"
            >
              <!-- 聊天信息和头像 -->
              <div class="history-user" v-if="ch.user == userId">
                <div class="history-text">{{ ch.message }}</div>
                <a-avatar
                  icon="user"
                  size="small"
                  style="margin: 0 10px"
                ></a-avatar>
              </div>
              <div class="history-extra" v-else>
                <a-avatar
                  icon="user"
                  size="small"
                  style="margin: 0 10px"
                ></a-avatar>
                <div class="history-text">{{ ch.message }}</div>
              </div>
            </div>
          </div>
          <!-- 输入框 -->
          <div class="chat-input">
            <a-textarea
              class="input-box"
              placeholder=""
              :rows="6"
              @keyup="handleStopPropagation"
              v-model="inputValue"
              @pressEnter="sendMessage"
            />
            <div class="chat-btn">
              <!-- 取消按钮 -->
              <a-button style="margin-right: 5px" @click="hideChat"
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
      v-show="!showChatting"
      @click="showChat"
      >Chat</a-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 显示聊天界面
      showChatting: false,
      // hover标识
      isHovered: false,
      // 初始化滚动定位
      scrollPosition: 0,
      // 聊天列表
      chatPlayerList: [],
      // 选中的聊天对象名
      chatName: "",
      // textarea
      inputValue: "",
      chatHistoryList: [
        {
          extra: "39ffe05c-16c0-40a9-9153-e1570ea5a11c",
          id: 66,
          message: "hello bbb",
          mid: "odsgk",
          subtxt: "PM to 39ffe05c-16c0-40a9-9153-e1570ea5a11c",
          timestamp: 1711547144324,
          type: "pm",
          user: "ad7f8790-6413-4a25-9912-ea4e64c65ec5",
        },
        {
          extra: "ad7f8790-6413-4a25-9912-ea4e64c65ec5",
          id: 66,
          message:
            "hello st lsjoiyoghe lhosahiehf kdhsiuhebg skdhsig aohfiouehifhiuash feouhwiu4hwkhsiaohfoihwaiousye iuhasih3iufuhasigouh  foiuyw3oihfoqwh ",
          mid: "ygktt",
          subtxt: "",
          timestamp: 1711547174695,
          type: "pm",
          user: "39ffe05c-16c0-40a9-9153-e1570ea5a11c",
        },
      ],
    };
  },
  computed: {
    // players
    players() {
      return this.$store.state.players.players;
    },
    // stId
    stId() {
      return this.$store.state.chat.stId;
    },
    // userId
    userId() {
      return this.$store.state.chat.userId;
    },
  },
  watch: {
    // players变化同步修改chatPlayerList
    players: {
      handler: function () {
        const arr = [{ name: "StoryTeller", id: "", chatId: this.stId }];
        this.chatPlayerList = arr.concat(this.players);
      },
      deep: true,
      immediate: true,
    },
    stId() {
      this.chatPlayerList[0].chatId = this.stId;
    },
  },
  methods: {
    /**
     * Notice Error Message
     * @param {String} message
     * @param {String} description
     */
    notice(message, description) {
      this.$notification["error"]({
        message,
        description,
      });
    },

    // 控制聊天界面展示与否的回调
    showChat() {
      const { sessionId, isSpectator, claimedSeat } = this.$store.state.session;
      // 房间已经存在
      if (sessionId) {
        // 判断players
        if (this.players.length > 0) {
          // ST可以直接打开
          if (!isSpectator) {
            // 展示聊天页面
            this.showChatting = true;
          } else if (claimedSeat !== -1) {
            // players需要入座后才能打开
            // 展示聊天页面
            this.showChatting = true;
          } else {
            // 警告玩家未入座
            this.$notification["error"]({
              message: "无法打开聊天页面",
              description: "未入座无法聊天，请入座后再试",
            });
          }
        } else {
          // 警告未添加玩家
          this.$notification["error"]({
            message: "无法打开聊天页面",
            description: "未添加玩家，请邀请玩家入座后再试",
          });
        }
      } else {
        // 警告未创建房间
        this.$notification["error"]({
          message: "无法打开聊天页面",
          description: "未创建/加入房间，请创建或者加入房间后再试",
        });
      }
    },

    // hideChat
    hideChat() {
      this.showChatting = false;
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

    // 发送按钮
    sendMessage() {
      event.preventDefault();
      const { inputValue, chatName, chatPlayerList } = this;
      if (!chatName) return;
      // 输入非空判断
      if (!inputValue) {
        this.notice("发送失败！", "输入不能为空！");
        return;
      }
      // 寻找
      const player = chatPlayerList.find((item) => {
        return item.name == chatName;
      });
      if (!player.chatId) {
        this.notice("发送失败！", "玩家未入座，请等待玩家入座后再试。");
        return;
      }

      // 整理
      const message = inputValue;
      const extra = player.chatId;
      console.log(message, extra);
      // 发送
      this.$store.dispatch("chat/handleSendMessage", { extra, message });
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
        cursor: pointer;
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
        .chat-history-container {
          font-size: 18px;
          font-weight: 100;
          color: black;
          margin: 0 15px 20px 15px;
          .history-user {
            display: flex;
            justify-content: flex-end;
            .history-text {
              max-width: 300px;
              padding: 5px 10px;
              background-color: #95ec69;
            }
          }
          .history-extra {
            display: flex;
            .history-text {
              max-width: 300px;
              padding: 5px 10px;
              background-color: #fff;
            }
          }
        }
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
          // 下移
          margin: 20px 0 0 10px;
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
../store/chatSocket
