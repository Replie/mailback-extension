'use strict'
var gmail;
var suggestions;
var predict_url = 'https://mb-analytics.site/_predict'
var suggestions_html;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function suggest() {
   while (suggestions[0] == "MailBack") {
    console.log("haha");
    sleep(100);
    console.log("blala");
   }

 }

 function refresh(f) {
   if ((/in/.test(document.readyState)) || (typeof Gmail === undefined)) {
     setTimeout('refresh(' + f + ')', 10);
   } else {
     f();
   }
 }

var setup = function () {
    gmail = new Gmail();
    console.log('MailBack is of for: ', gmail.get.user_email());

    gmail.observe.before('send_message', function(url, body, data, xhr){
      var body_params = xhr.xhrParams.body_params;

      // lets cc this email to someone extra if the subject is 'Fake example'
//      if(data.subject == 'Fake example') {
//        if(body_params.cc) {
//          if(typeof body_params.cc != 'object') body_params.cc = [ body_params.cc ];
//        } else {
//          body_params.cc = [];
//        }
//        body_params.cc.push('brent@zeald.com');
//      }
      debugger;
     // body_params.body = body_params.body.replace(suggestions_html, 'harame');
    //  let bbb = suggestions_html
      debugger;
      // now change the subject

      console.log("sending message, url:", url, 'body', body, 'email_data', data, 'xhr', xhr);
    });


    gmail.observe.on("compose", function (compose, type) {
    if (type === 'reply') {
      suggestions = ["MailBack", "is", "Processing"];
      //Extract mail's content
      var email = gmail.dom.email($('div.adn'));
      var body = email.data().content_plain;
      debugger;

      //Ajax request
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
        debugger;
      window.setTimeout(function () {
        suggestions_html = '<div id="mb_suggest1" class="mb-button-group btn-group">' +
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

        //for now it's without any loop
          window.setTimeout(function () {
                  suggestions_html = '<div id="mb_suggest1" class="mb-button-group btn-group">' +
                    '<button type="button" id="mb_button" class="btn mb-button btn-raised">'
                    + suggestions[0]  + '</button>' +
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

                }, 2000);
    }

    });


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





}

var interval = setInterval(function() {
    if(document.readyState === 'complete') {
        clearInterval(interval);
         setup();
    }
}, 100);


//refresh(main);