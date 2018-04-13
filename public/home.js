function watchCreateOrder() {
  $('.create-btn').click(event => {
    event.preventDefault();
    window.location = './create-order.html';
  });
}
$(watchCreateOrder);

function watchViewOrders() {
  $('.edit-btn').click(event => {
    event.preventDefault();
    window.location = './view-orders.html';
  });
}
$(watchViewOrders);
