export default ({ store, redirect }) => {
  if (store.state.user === null) {
    redirect("/?message=noUser");
  }
};
