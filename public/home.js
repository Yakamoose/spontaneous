function watchProducts() {
  $('.create-btn').click(event => {
    event.preventDefault();
    window.location = './create-order.html';
  });
}
$(watchProducts);
