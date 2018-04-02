
function watchSubmit() {
    $('.start-btn').submit(event => {
      event.preventDefault();
      $('.description').hide();
      $(".sign-up").show();
      // window.location = 'create-order-page.html';
    });
}



function watchLogin() {
  $('.login').click(event => {
    event.preventDefault();
    $('.description').hide();
    $('.sign-up').show();
  });
}

$(watchLogin);

$(watchSubmit);
