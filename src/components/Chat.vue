<template>
  <!-- 组件容器 -->
  <div class="chat-wrapper">
    <!-- 动态展示聊天框 -->
    <div v-show="showChatting">
      <!-- 聊天框顶部 -->
      <div class="chat-head">
        <a-input-search
          class="playerSearch"
          placeholder="input search text"
          @keyup="handleStopPropagation"
        />
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
          <div class="chat-history" ref="scrollContainer">
            <!-- 空历史记录提示卡片 -->
            <div v-if="chatHistoryList.length == 0" class="notice-card">
              ———— {{ extra ? "暂无历史记录" : "该玩家未入座" }}————
            </div>
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
              v-model="message"
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
import { mapState } from "vuex";
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
      // 选中对象的chatId
      extra: "",
      // 输入框的内容
      message: "",
    };
  },
  computed: {
    ...mapState("chat", ["stId", "userId", "chatRecords"]),
    ...mapState("players", ["players"]),
    // chatHistoryList
    chatHistoryList() {
      const res = this.chatRecords.filter((item) => {
        return (
          (item.extra == this.extra && item.user == this.userId) ||
          (item.extra == this.userId && item.user == this.extra)
        );
      });
      return res;
    },
  },
  watch: {
    // players变化同步修改chatPlayerList
    players: {
      handler: function () {
        // ST页面
        if (!this.$store.state.session.isSpectator) {
          this.chatPlayerList = this.players;
        } else {
          // 玩家页面
          // 添加ST
          const arr = [{ name: "StoryTeller", id: "" }];
          this.chatPlayerList = arr.concat(this.players);
          // 去除自身
          const idx = this.chatPlayerList.findIndex((item) => {
            return item.chatId == this.userId;
          });
          if (idx !== -1) this.chatPlayerList.splice(idx, 1);
        }
      },
      deep: true,
      immediate: true,
    },
    // extra随变
    chatName() {
      if (this.chatName == "StoryTeller") {
        this.extra = this.stId;
        return;
      }
      const player = this.chatPlayerList.find((item) => {
        return item.name == this.chatName;
      });
      this.extra = player ? player.chatId : "";
    },
    // 聊天记录每次变化都自动触底
    chatHistoryList() {
      // 滚动最底
      this.scrollHistoryToBottom();
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
            // this.scrollHistoryToBottom();
          } else if (claimedSeat !== -1) {
            // players需要入座后才能打开
            // 展示聊天页面
            this.showChatting = true;
            // this.scrollHistoryToBottom();
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
      this.message = "";
    },

    // input时阻止冒泡
    handleStopPropagation() {
      event.stopPropagation();
    },

    // 发送按钮
    sendMessage() {
      event.preventDefault();
      const { message, chatName, extra } = this;
      if (!chatName) return;
      // 输入非空判断
      if (!message) {
        this.notice("发送失败！", "输入不能为空！");
        return;
      }
      // 发送对象Id非空
      if (!extra) {
        this.notice("发送失败！", "玩家未入座，请等待玩家入座后再试。");
        return;
      }
      console.log(message, extra);
      // 发送
      this.$store.dispatch("chat/handleSendMessage", { extra, message });
      this.message = "";
    },

    // 聊天记录自动滚动到底部
    scrollHistoryToBottom() {
      this.$nextTick(() => {
        this.$refs.scrollContainer.scrollTop =
          this.$refs.scrollContainer.scrollHeight;
      });
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
        overflow-y: scroll;
        .notice-card {
          width: 100%;
          color: #5d747c;
          font-size: 18px;
          text-align: center;
          margin-top: 50%;
        }
        .chat-history-container {
          font-size: 16px;
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
