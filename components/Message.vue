<template>
  <div>
    <div class="system-msg" v-if="message === 'admin'">
      <p class="text-xs-center">{{ text }}</p>
      <hr />
    </div>
    <div class="default-msg" v-else>
      <div class="message" :class="{ isOwner }">
        <p>
          <small
            ><strong>{{ message }}</strong></small
          >
        </p>
        <p>
          <strong>{{ text }}</strong>
        </p>
        <small class="time">{{ date }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    isOwner: {
      type: Boolean,
      default: false
    },
    date: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.system-msg {
  margin-bottom: 1rem;
}
.system-msg > p {
  margin-bottom: 1rem;
}

.default-msg {
  display: flex;
  flex-direction: column;
}
.message {
  padding: 1rem;
  width: 45%;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  margin: 0 1rem;
  border-radius: 4px;
  background: #1976d2;
  position: relative;
  margin-bottom: 1px;
}
.message > p {
  margin-bottom: 0;
}
.isOwner {
  background: #fff;
  color: #000000;
  align-self: flex-end;
}
.time {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
