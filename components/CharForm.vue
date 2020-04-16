<template>
  <v-flex xs12>
    <v-text-field
      label="Insert your message here :)"
      @keydown.enter="sendMessage"
      v-model="text"
      outline
    >
    </v-text-field>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    text: ""
  }),
  methods: {
    sendMessage() {
      this.$socket.emit(
        "createMessage",
        {
          text: this.text,
          id: this.$store.state.user.id
        },
        data => {
          if (data) {
            console.log("error");
          } else {
            this.text = "";
          }
        }
      );
    }
  }
};
</script>

<style></style>
