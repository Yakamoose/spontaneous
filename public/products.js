function watchCreateOrder() {
  $('.create-btn').click(event => {
    event.preventDefault();

    if(localStorage.loggedIn == 0) {
      window.location = './index.html';
      $('.start-box').hide();
      $(".signup-login").show();
    }
    else {
      window.location = './create-order.html';
    };

  });
}

$(watchCreateOrder);


function watchHomeSubmit() {
  $('a.home').click(event => {

    if(localStorage.loggedIn == 0) {
      window.location = './index.html';
    }
    else {
      window.location = './home.html';
    };

  })
}
$(watchHomeSubmit);
