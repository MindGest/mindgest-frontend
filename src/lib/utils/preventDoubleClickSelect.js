export default event => {
  if (event.detail > 1) {
    event.preventDefault();
  }
};
