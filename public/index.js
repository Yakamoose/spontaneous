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
    console.log(user);

    $.ajax({
      type: 'GET',
      contentType: 'application/json',
      url: `http://localhost:8080/user/${user.userName}/${user.password}`,
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


    // alert('no such user found');


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
      type: 'GET',
      contentType: 'application/json',
      url: `http://localhost:8080/user/${user.userName}/${user.password}`,
      success: function(data) {
        console.log('success');
        console.log(data);


          if(data.message != null) {
            $.ajax({
        						type: 'POST',
        						data: JSON.stringify(user),
        				    contentType: 'application/json',
                    url: 'http://localhost:8080/user/',
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
    // $.ajax({
    //   type: 'GET',
    //   contentType: 'application/json',
    //   url: 'http://localhost:8080/users',
    //   success: function(data) {
    //     console.log('success');
    //     console.log(data);
    //     data.forEach(function(users) {
    //       if(users.userName === user.userName && users.password === user.password) {
    //         alert('User already exists.');
    //         // window.location = './index.html'
    //         // $('.start-box').hide();
    //         // $(".signup-login").hide();
    //         // $('.signup-box').show();
    //         // $('.login-box').hide();
    //         // return;
    //       } else {
    //         $.ajax({
    //     						type: 'POST',
    //     						data: JSON.stringify(user),
    //     				    contentType: 'application/json',
    //                 url: 'http://localhost:8080/user/',
    //                 success: function(data) {
    //                     console.log('success');
    //                     console.log(JSON.stringify(data));
    //                     localStorage.setItem('userId', data.id);
    //                     localStorage.loggedIn = 1;
    //                     window.location = './home.html';
    //
    //                 }
    //         });
    //       }
    //     });
    //
    //   }
    // })

    // $.ajax({
		// 				type: 'POST',
		// 				data: JSON.stringify(user),
		// 		    contentType: 'application/json',
    //         url: 'http://localhost:8080/user/',
    //         success: function(data) {
    //             console.log('success');
    //             console.log(JSON.stringify(data));
    //             localStorage.setItem('userId', data.id);
    //             localStorage.loggedIn = 1;
    //             window.location = './home.html';
    //
    //         }
    // });

  });
}
$(watchCreateUserButton);
