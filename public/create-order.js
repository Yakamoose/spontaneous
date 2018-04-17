// const faker = require('faker');


let order = [{
  firstName: String,
  lastName: String,
  product: String,
  note: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: Number
  },
  deliveryDate: Date,
  payment: {
    cardNumber: Number,
    expDate: String,
    csc: Number,
    name: String,
    billingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: Number
    },
    paid: Boolean
  }
}];



// $.ajax({
//   type: 'GET',
//   contentType: 'application/json',
//   url: 'http://localhost:8080/user/5ace5b56b41ae65e60778cc6',
//   success: function(data) {
//     console.log('success');
//     console.log(data);
//   }
// });


function watchDozen() {
  $('.dozen-btn').click(event => {
    event.preventDefault();
    order[0].product = 'dozen roses';

    console.log(order);
    $('.title-product').hide();
    $('.title-address').show();

    $('.products').hide();
    $('.address').show();
  });
}
$(watchDozen);

function watchTwoDozen() {
  $('.two-dozen-btn').click(event => {
    event.preventDefault();
    order[0].product = 'two dozen roses';

    console.log(order);
    $('.title-product').hide();
    $('.title-address').show();

    $('.products').hide();
    $('.address').show();
  });
}
$(watchTwoDozen);

function watchMixedBouquet() {
  $('.mixed-btn').click(event => {
    event.preventDefault();
    order[0].product = 'mixed bouquet of roses';

    console.log(order);
    $('.title-product').hide();
    $('.title-address').show();

    $('.products').hide();
    $('.address').show();
  });
}
$(watchMixedBouquet);


// --------------------------------------------------------

function watchAddressSubmit() {
  $('.address-submit-btn').click(event => {
    event.preventDefault();
    order[0].firstName = document.getElementById('firstName').value;
    order[0].lastName = document.getElementById('lastName').value;
    order[0].address = {};
    order[0].address.street = document.getElementById('street').value;
    order[0].address.city = document.getElementById('city').value;
    order[0].address.state = document.getElementById('state').value;
    order[0].address.zipCode = document.getElementById('zipCode').value;

    console.log(order);
    $('.title-address').hide();
    $('.title-delivery-date').show();

    $('.address').hide();
    $('.delivery-date').show();
  });
}
$(watchAddressSubmit);


// -----------------------------------------------------------

function watchSpontSubmit() {
  $('.spontaneous-date-btn').click(event => {
    event.preventDefault();

    let dateWindow = Number(document.querySelector('input[name="choice"]:checked').id);
    // console.log(dateWindow);

    var d = new Date();
    var m = d.getMonth()+1;
    var day = d.getDate();
    var month = Number;
    let year = Number(d.getFullYear());


    if((dateWindow+m) > 12){
      month = (dateWindow+m)-12;
      year++;
    }
    else{
      month = (dateWindow+m);

    }

    const deliveryDate = `${month}/${day}/${year}`;
    // console.log(deliveryDate);

    let todayYear = Number(d.getFullYear());
    let todayMonth = d.getMonth()+1;
    let todayDay = d.getDate();
    let today = `${todayMonth}/${todayDay}/${todayYear}`;

    function randomDate(date1, date2){
      function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
      }
      var date1 = date1 || '04-16-2018'
      var date2 = date2 || new Date().toLocaleDateString()
      date1 = new Date(date1).getTime()
      date2 = new Date(date2).getTime()
      if( date1>date2){
        return new Date(getRandomArbitrary(date2,date1)).toLocaleDateString()
      } else{
        return new Date(getRandomArbitrary(date1, date2)).toLocaleDateString()
      }
    }

    order[0].deliveryDate = randomDate(deliveryDate, today);

    console.log(order);


    // $('.title-product').hide();
    // $('.title-address').hide();
    // $('.title-delivery-date').hide();
    // $('.title-note').show();
    //
    // $('.address').hide();
    // $('.delivery-date').hide();
    // $('.note').show();
    });

}
$(watchSpontSubmit);

function watchChooseDate() {
  $('.choose-date-btn').click(event => {
    event.preventDefault();

    order[0].deliveryDate = document.getElementById('choose-date-id').value;
    order[0].deliveryDate = order[0].deliveryDate.slice(0, 10);
    // console.log(order[0].deliveryDate);
    console.log(order);
    $('.title-product').hide();
    $('.title-address').hide();
    $('.title-delivery-date').hide();
    $('.title-note').show();

    $('.address').hide();
    $('.delivery-date').hide();
    $('.note').show();
  });
}
$(watchChooseDate);



// --------------------------------------------------------------------------------

function watchNoteSubmit() {
  $('.note-btn').click(event => {
    event.preventDefault();

    order[0].note = document.getElementById('note-text').value;
    console.log(order);

    $('.title-note').hide();
    $('.title-payment').show();


    $('.note').hide();
    $('.payment').show();

  })
}
$(watchNoteSubmit);


// -------------------------------------------------


function watchPaymentSubmit() {
  $('.payment-btn').click(event => {
    event.preventDefault();

    order[0].payment = {};
    order[0].payment.cardNumber = document.getElementById('cc-number').value;
    order[0].payment.expDate = document.getElementById('cc-exp').value;
    order[0].payment.csc = document.getElementById('cc-csc-code').value;
    order[0].payment.name = document.getElementById('cc-name').value;
    order[0].payment.billingAddress = {};
    order[0].payment.billingAddress.street = document.getElementById('cc-street').value;
    order[0].payment.billingAddress.city = document.getElementById('cc-city').value;
    order[0].payment.billingAddress.state = document.getElementById('cc-state').value;
    order[0].payment.billingAddress.zipCode = document.getElementById('cc-zipCode').value;
    order[0].paid = true;



    const orders ={orders: order};
    console.log(orders);

    // $.ajax({
    //   type: 'GET',
    //   contentType: 'application/json',
    //   url: 'http://localhost:8080/users',
    //   success: function(data) {
    //     console.log('success');
    //     console.log(data);
    //   }
    // })
    const endpoint = localStorage.userId;
    // console.log('endpoint');
    // console.log(endpoint);


    $.ajax({
      type: 'PUT',
      data: JSON.stringify(orders),
      contentType: 'application/json',
      url: `https://modern-romance.herokuapp.com/user/order/${endpoint}`,
      success: function(data) {
        console.log('success');
        console.log(data);
      }
    });

    $('.title-note').hide();
    $('.title-payment').hide();
    $('.title-confirmation').show();


    $('.note').hide();
    $('.payment').hide();
    $('.confirmation').show();

  });
}
$(watchPaymentSubmit);

















// ------
