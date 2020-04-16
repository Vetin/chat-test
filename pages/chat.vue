<template>
  <div class="chat-container">
    <div class="chat" ref="chat">
      <!-- <ul>
        <li v-for="(message, index) in messages" :key="index">
          {{ message.text }}
        </li>
      </!-->

      <Message
        v-for="(message, index) in messages"
        :message="message.name"
        :text="message.text"
        :isOwner="message.id === user.id"
        :date="message.date"
        :key="index"
      />
    </div>
    <div class="chat-send">
      <Form />
    </div>
  </div>
</template>

<script>
import Message from "~/components/Message";
import Form from "~/components/CharForm";

export default {
  head() {
    return {
      title: `Chat ${this.user.room}`
    };
  },
  middleware: ["chat"],
  components: {
    Message,
    Form
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    messages() {
      return this.$store.state.messages;
    }
  },
  watch: {
    messages() {
      setTimeout(() => {
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
      }, 0);
    }
  }
};
</script>

<style scoped>
.chat-container {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.chat {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}
.chat-send {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1px;
  height: 60px;
  background: #212121;
}
</style>
