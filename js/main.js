'use strict'
var gmail;
var suggestions = [];
var predict_url = 'https://mb-analytics.site/_predict'
debugger;
var editorExtensionId = "pkbampofljnjdlepoonfjkefjkbpknki";
chrome.extension.sendMessage({method: "getLocalStorage", key: "date"}, function(response) {
  console.log(response);
});
chrome.extension.sendMessage({method: "getLocalStorage", key: "epoch"}, function(response) {
  console.log(response);
});
chrome.extension.sendMessage({method: "getLocalStorage", key: "step"}, function(response) {
  console.log(response);
});

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
  console.log('MailBack is on for: ', gmail.get.user_email());
  if (gmail.check.is_inside_email()){
    console.log('Im in an email');
    var email = gmail.dom.email($('div.adn'));
    var body = email.data().content_plain;
    console.log('MailBack for content: ', body);
    gmail.observe.on("compose", function (compose, type) {
      if (type === 'reply') {
        console.log('MailBack  compose for content: ', body);
        window.setTimeout(function () {
          $.ajax({
            url: predict_url,
            type: 'get',
            data: { 
              seq_str: btoa(body),
              date: exp_date,
              epoch: exp_epoch,
              step: exp_step
             },
            headers: {
              "Content-Type": "application/json"
            },
            dataType: 'json',
            success: function (data) {
              console.log("Got predictions");
              suggestions = data.data.results;
            },
            error: function (data) {
              console.log("Failed To predict, status: " + status + " Error: " + error)
              suggestions = ["Ok, i’m on it.", "Sorry No can Do.", "Sure, Thank’s"];
            }
          });
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
  gmail.observe.on('view_thread', function (obj) {
    var email = gmail.dom.email($('div.adn'));
    var body = email.data().content_plain;
    console.log('MailBack for content: ', body);
    gmail.observe.on("compose", function (compose, type) {
      if (type === 'reply') {
        window.setTimeout(function () {
          $.ajax({
            url: predict_url,
            type: 'get',
            data: { 
              seq_str: btoa(body),
              date: exp_date,
              epoch: exp_epoch,
              step: exp_step
             },
            headers: {
              "Content-Type": "application/json"
            },
            dataType: 'json',
            success: function (data) {
              console.log("Got predictions");
              suggestions = data.data.results;
            },
            error: function (data) {
              console.log("Failed To predict, status: " + status + " Error: " + error)
              suggestions = ["Ok, i’m on it.", "Sorry No can Do.", "Sure, Thank’s"];
            }
          });
          debugger;
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
  });
}

refresh(main);