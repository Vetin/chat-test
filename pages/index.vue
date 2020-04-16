<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="450">
        <v-snackbar v-model="snackbar" :top="true" :timeout="3000">
          {{ snackbarText }}
          <v-btn color="pink" text @click="snackbar = false">
            Close
          </v-btn>
        </v-snackbar>
        <v-card-title>
          Chat
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="room"
              :counter="10"
              :rules="roomRules"
              label="Room"
              required
            ></v-text-field>
            <v-btn color="primary" @click="submitHandler">Sign in</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  head: () => ({
    title: "Nuxt chat"
  }),
  layout: "empty",
  sockets: {
    connect() {
      console.log("Client IO connected");
    }
  },
  data: () => ({
    valid: true,
    snackbar: false,
    snackbarText: "",
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    room: "",
    roomRules: [
      v => !!v || "Room is required",
      v => (v && v.length <= 10) || "Room must be less than 10 characters"
    ],
    lazy: false
  }),

  methods: {
    submitHandler() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        };

        this.$socket.emit("userConnect", user, data => {
          if (data.error) {
            console.log(data.message);
          } else {
            user.id = data.userId;

            this.$store.commit("setUser", user);
            this.$router.push("/chat");
          }
        });
      }
    },
    initSnackbar(text) {
      this.snackbar = true;
      this.snackbarText = text;
    }
  },
  mounted() {
    switch (this.$route.query.message) {
      case "leftChat":
        this.$store.commit("clearUser");
        this.initSnackbar("You left chat");
        break;
      case "noUser":
        this.initSnackbar("For use app you need to login");
        break;
      default:
        break;
    }
  }
};
</script>
<style scoped></style>
