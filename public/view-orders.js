
const endpoint = localStorage.userId;
let user = {};


$.ajax({
  type: 'GET',
  contentType: 'application/json',
  url: `https://modern-romance.herokuapp.com/user/${endpoint}`,
  success: function(data) {
    console.log('success');
    console.log(data);
    console.log(data.orders);
    user = data;

    if(user.orders.length > 0){
    user.orders.forEach(function(order) {

      let deliveryDate = order.deliveryDate.slice(0, 10);
      let imageUrl;
      if(order.product === 'dozen roses') {
        imageUrl = './images/dozen.jpg';
      } else if(order.product === 'two dozen roses') {
        imageUrl = './images/two-dozen.jpg';
      } else if(order.product === 'mixed bouquet of roses') {
        imageUrl = './images/mixed-bouquet.jpg';
      }

      $('div.boxes').append(`
        <div class="box">
        <div class="orders" style="display: visible;">
          <div class"indv-orders" id="order">
            <div class="details div-left" id="details">
              <h1>To: ${order.firstName} ${order.lastName}</h1>
              <h1>Delivery Date: ${deliveryDate}</h1>
              <h2>Delivery Address:</h2>
              <h2>${order.address.street}</h2>
              <h2>${order.address.city}, ${order.address.state}  ${order.address.zipCode}</h2>
            </div>
          <div class="product div-right" id="product">
            <img src='${imageUrl}' alt='product image'>
          </div>
        </div>
      </div>
      </div>
        `)

      })
      } else {
        $('div.boxes').append(`
          <div class="box">
          <div class="no-orders">
            <h1>You have not placed any orders yet.</h1>
            <h1>Head back to the home page and click Start Order.</h1>
        </div>
        </div>
          `)
      }



}
});
