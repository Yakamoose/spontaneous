function watchCreateOrder() {
  $('.create-btn').click(event => {
    event.preventDefault();

    if(localStorage.loggedIn == 0) {
      window.location = './index.html';
    }
    else {
      window.location = './home.html';
    };

  });
}

$(watchCreateOrder);


function watchHomeSubmit() {
  $('a').click(event => {

    if(localStorage.loggedIn == 0) {
      window.location = './index.html';
    }
    else {
      window.location = './home.html';
    };

  })
}
