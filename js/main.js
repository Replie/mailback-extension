'use strict'
var gmail;
var suggestions = [];
var predict_url = 'https://mb-analytics.site/_predict'

function refresh(f) {
  if ((/in/.test(document.readyState)) || (typeof Gmail === undefined)) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}


var main = function () {
  // NOTE: Always use the latest version of gmail.js from
  gmail = new Gmail();
  console.log('MailBack is of for: ', gmail.get.user_email());
  var email = gmail.dom.email($('div.adn')); 
  var body = email.data().content_plain;
  console.log('MailBack for content: ', body);
  $.ajax({
    url: predict_url,
    type: 'get',
    data: { seq_str: btoa(body) },
    headers: {
      "Content-Type": "application/json"
    },
    dataType: 'json',
    success: function (data) {
      console.log("Go predictions");
      suggestions = data.data.results;
    },
    error: function (data) {
      console.log("Failed To predict, status: " + status + " Error: " + error)
      suggestions = ["Ok, i’m on it.", "Sorry No can Do.", "Sure, Thank’s"];
    }
  });


  // $.ajax({url:predict_url, {
  //   seq_str: btoa("input_sentence"),
  // })
  //   .done(function (msg) {
  //     console.log("Go predictions")
  //     suggestions = msg.data.results;
  //   })
  //   .fail(function (xhr, status, error) {
  //     console.log("Failed To predict, status: " + status + " Error: " + error)
  //     suggestions = ["Ok, i'm on it.", "Sorry No can Do.", "Sure, Thank's"];
  //   });

  gmail.observe.on("compose", function (compose, type) {
    if (type === 'reply') {
      window.setTimeout(function () {
        let suggestions_html = '<div id="mb_suggest1" class="mb-button-group btn-group">' +
          '<button type="button" id="mb_button" class="btn mb-button btn-raised">'
          + suggestions[0] + '</button>' +
          '<button type="button" id="mb_button2" class="btn mb-button btn-raised">'
          + suggestions[1] + '</button>' +
          '<button type="button" id="mb_button3" class="btn mb-button btn-raised">'
          + suggestions[2] + '</button>' +
          '</div>';
        compose.body("<br/><br/>" + suggestions_html);
        $(document).ready(function () {
          $(".mb-button").on("click", function () {
            compose.body($(this).text() + "<br/><br/>");
          });
        });
      }, 0);
    }
  });
}
refresh(main);