const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const Users = require("./users")();

const messageCreater = (name, text, id, date) => ({ name, text, id, date });

io.on("connection", socket => {
  socket.on("userConnect", (data, callback) => {
    if (!data.name || !data.room) {
      return callback({
        error: true,
        message: "Uncorrect data"
      });
    }
    socket.join(data.room);
    Users.remove(socket.id);
    Users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    });
    callback({ userId: socket.id });
    io.to(data.room).emit("updateUsers", Users.getByRoom(data.room));
    socket.emit(
      "newMessage",
      messageCreater("admin", `Welcome to chat ${data.room}, ${data.name}`)
    );
    socket.broadcast
      .to(data.room)
      .emit(
        "newMessage",
        messageCreater("admin", `User ${data.name} joined to the room`)
      );
  });

  socket.on("createMessage", (data, callback) => {
    if (!data.text) {
      return callback({ error: true, message: "Text can not be blank" });
    }

    const user = Users.get(data.id);
    if (user) {
      io.to(user.room).emit(
        "newMessage",
        messageCreater(
          user.name,
          data.text,
          user.id,
          new Date().toLocaleString()
        )
      );
      callback();
    }
  });

  socket.on("exitFromChat", (id, callback) => {
    const user = Users.remove(id);
    if (user) {
      io.to(user.room).emit("updateUsers", Users.getByRoom(user.room));
      io.to(user.room).emit(
        "newMessage",
        messageCreater("admin", `User ${user.name} left`)
      );
    }
    callback();
  });

  socket.on("disconnect", () => {
    const user = Users.remove(socket.id);
    if (user) {
      io.to(user.room).emit("updateUsers", Users.getByRoom(user.room));
      io.to(user.room).emit(
        "newMessage",
        messageCreater("admin", ` User ${user.name} left`)
      );
    }
  });
});

module.exports = {
  app,
  server
};
