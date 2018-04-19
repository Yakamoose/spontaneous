

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


function watchDozen() {
  $('.dozen-btn').click(event => {
    event.preventDefault();
    order[0].product = 'dozen roses';

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

    if(order[0].firstName != "" && order[0].address.street != "" && order[0].address.city != "" && order[0].address.state != "" && order[0].address.state != "" && order[0].address.zipCode != "" ) {
      $('.title-address').hide();
      $('.title-delivery-date').show();

      $('.address').hide();
      $('.delivery-date').show();
    } else {
      alert('Please fill in ALL fields');
    }
  });
}
$(watchAddressSubmit);


// -----------------------------------------------------------
//This function takes a radio choice and comes up with a spontaneous date in the delivery window
function watchSpontSubmit() {
  $('.spontaneous-date-btn').click(event => {
    event.preventDefault();

    if(document.querySelector('input[name="choice"]:checked') != null) {
      let dateWindow = Number(document.querySelector('input[name="choice"]:checked').id);

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



      $('.title-product').hide();
      $('.title-address').hide();
      $('.title-delivery-date').hide();
      $('.title-note').show();

      $('.address').hide();
      $('.delivery-date').hide();
      $('.note').show();
    } else {
      alert('Please choose a Spontaneous delivery date.');
    }
    });

}
$(watchSpontSubmit);



function watchChooseDate() {
  $('.choose-date-btn').click(event => {
    event.preventDefault();

    order[0].deliveryDate = document.getElementById('choose-date-id').value;
    order[0].deliveryDate = order[0].deliveryDate.slice(0, 10);
    if(document.getElementById('choose-date-id').value != "" && new Date(order[0].deliveryDate) > new Date()) {
      $('.title-product').hide();
      $('.title-address').hide();
      $('.title-delivery-date').hide();
      $('.title-note').show();

      $('.address').hide();
      $('.delivery-date').hide();
      $('.note').show();
    } else {
      alert('Please choose a date in the future from the calendar.');
    }
  });
}
$(watchChooseDate);



// --------------------------------------------------------------------------------

function watchNoteSubmit() {
  $('.note-btn').click(event => {
    event.preventDefault();

    order[0].note = document.getElementById('note-text').value;

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



    const orders = {orders: order};
    const endpoint = localStorage.userId;

    if(order[0].payment.cardNumber != "" && order[0].payment.expDate != "" && order[0].payment.csc != "" && order[0].payment.name != "" && order[0].payment.billingAddress.street != "" && order[0].payment.billingAddress.city != "") {

      $.ajax({
        type: 'PUT',
        data: JSON.stringify(orders),
        contentType: 'application/json',
        url: `https://modern-romance.herokuapp.com/user/order/${endpoint}`,
        success: function(data) {
          console.log('success');
        }
      });

      $('.title-note').hide();
      $('.title-payment').hide();
      $('.title-confirmation').show();


      $('.note').hide();
      $('.payment').hide();
      $('.confirmation').show();
    } else {
      alert('Please fill out ALL fields.')
    }
  });
}
$(watchPaymentSubmit);
