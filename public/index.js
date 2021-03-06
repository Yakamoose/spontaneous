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

    const user = {
      userName: userName,
      password: password
    };
    // console.log(user);

    if(userName != "" && password != "") {
      $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: `https://modern-romance.herokuapp.com/user/${user.userName}/${user.password}`,
        success: function(data) {
          console.log('success');
          console.log(data);


            if(data.userName != null) {
              localStorage.loggedIn = 1;
              localStorage.setItem('userId', data.id);
              console.log('we found a match');
              console.log(data.id);
              window.location = './home.html';


            } else {
              alert(data.message);
            }
          }
          });
    } else {
      alert('Must fill in ALL fields');
    }
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
    if(firstName != "" && lastName != "" && email != "" && userName != "" && password != "") {
      $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: `https://modern-romance.herokuapp.com/user/${user.userName}/${user.password}`,
        success: function(data) {
          console.log('success');
          console.log(data);


            if(data.message != null) {
              $.ajax({
          						type: 'POST',
          						data: JSON.stringify(user),
          				    contentType: 'application/json',
                      url: 'https://modern-romance.herokuapp.com/user/',
                      success: function(data) {
                          console.log('success');
                          console.log(JSON.stringify(data));
                          localStorage.setItem('userId', data.id);
                          localStorage.loggedIn = 1;
                          window.location = './home.html';

                      }
              });


            } else {
              alert('User already exists');
            }
          }
          });
    } else {
      alert('Must fill in ALL fields');
    }

  });
}
$(watchCreateUserButton);
