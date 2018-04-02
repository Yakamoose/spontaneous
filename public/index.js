
function watchSubmit() {
    $('.start-btn').submit(event => {
      event.preventDefault();
      window.location = 'create-order-page.html';
    });
}

$(watchSubmit);
