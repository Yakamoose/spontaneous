localStorage.setItem('loggedIn', 0);

function watchStartSubmit() {
    $('.start-btn').click(event => {
      event.preventDefault();
      $('.start-box').hide();
      $(".signup-login").show();
      // window.location = 'create-order-page.html';
    });
}
$(watchStartSubmit);


function watchLogin() {
  $('.login').click(event => {
    event.preventDefault();
    $('.start-box').hide();
    $(".signup-login").hide();
    $('.signup-box').hide();
    $('.login-box').show();
  });
}
$(watchLogin);


function watchSignup() {
  $('.signup-btn').click(event => {
    event.preventDefault();
    $('.start-box').hide();
    $('.signup-login').hide();
    $('.signup-box').show();
  });
}
$(watchSignup);


function watchLoginFromStart() {
  $('.login-btn').click(event => {
    event.preventDefault();
    $('.start-box').hide();
    $(".signup-login").hide();
    $('.signup-box').hide();
    $('login-box').show();
  });
}
$(watchLoginFromStart);


function watchLoginButton() {
  $('.login-window-btn').click(event => {
    event.preventDefault();

    const userName = document.getElementById("existingName").value;
    const password = document.getElementById("existingPassword").value;

    const user = {userName, password};

    console.log(user);

    localStorage.loggedIn = 1;


    window.location = './home.html';
  });
}
$(watchLoginButton);


function watchCreateUserButton() {
  $('.create-btn').click(event => {
    event.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password,
      email: email
    };

    console.log(user);

    $.ajax({
						type: 'POST',
						data: JSON.stringify(user),
				    contentType: 'application/json',
            url: 'http://localhost:8080/user/',
            success: function(data) {
                console.log('success');
                console.log(JSON.stringify(data));
            }
    });
    localStorage.loggedIn = 1;

    window.location = './home.html';
  });
}
$(watchCreateUserButton);
