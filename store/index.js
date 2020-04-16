export default {
  state: () => ({
    users: [],
    user: null,
    messages: []
  }),
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
      state.messages = [];
      state.users = [];
    },
    SOCKET_newMessage(state, message) {
      state.messages.push(message);
    },
    SOCKET_updateUsers(state, users) {
      state.users = users;
    }
  }
};
