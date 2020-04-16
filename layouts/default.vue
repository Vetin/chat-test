<template>
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer" mobile-break-point="650">
      <v-list subheader>
        <v-subheader>List of rooms users</v-subheader>
        <v-list-tile v-for="(u, index) in users" :key="index">
          <v-list-tile-content>
            <v-list-tile-title
              v-text="u.name"
              :style="{ color: u.id === user.id ? 'deeppink' : 'inherit' }"
            ></v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon v-if="u.id !== user.id">chat_bubble</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click="exit">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>{{ user.room }}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <div style="height: 100%">
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true
  }),
  computed: {
    user() {
      return this.$store.state.user;
    },
    users() {
      return this.$store.state.users;
    }
  },
  methods: {
    async exit() {
      this.$socket.emit("exitFromChat", this.user.id, data => {
        if (data) {
        }
        this.$router.push("/?message=leftChat");
      });
    }
  }
};
</script>
