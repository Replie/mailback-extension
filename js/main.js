var gmail;


function refresh(f) {
  if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}


var main = function(){
  // NOTE: Always use the latest version of gmail.js from
  // https://github.com/KartikTalwar/gmail.js
  gmail = new Gmail();
  gmail.observe.register('compose_email_select', {
    class: 'Jd-axF',
    selector: 'div.Jd-axF:first-child'
  });
  gmail.observe.register('compose_select', {
    class: 'ip',
    sub_selector: 'div.M9'
  });
  console.log('Hello,', gmail.get.user_email())
  // $.get('http://193.106.55.110:8080/_predict', {
  //     seq_str: btoa("input_sentence"),
  //   },
  //     function (data) {
  //       console.log(data)
  //     });
  gmail.observe.on("compose", function(compose, type) {
    console.log("on compose");
  
    // console.log(gmail.dom.email_body()[0].textContent)
    suggestions = "<div class=\"btn-group\"><button style=\"border: solid 2px #a51c93;padding: 10px;margin-right: 10px;-moz-border-radius: 50px;-webkit-border-radius: 50px;border-radius: 50px;\" type=\"button\" class=\"btn btn-default btn-xs\">Yes I would Love to Come!</button><button style=\"border: solid 2px #a51c93;padding: 10px;margin-right: 10px;-moz-border-radius: 50px;-webkit-border-radius: 50px;border-radius: 50px;\" type=\"button\" class=\"btn btn-default btn-xs\">Yes I will be able to make it</button><button style=\"border: solid 2px #a51c93;padding: 10px;margin-right: 10px;-moz-border-radius: 50px;-webkit-border-radius: 50px;border-radius: 50px;\" type=\"button\" class=\"btn btn-default btn-xs\">Sorry, I wont be able to make it</button></div></div>";
    // compose[0].body("suggestions")
    console.log(compose);
    // console.log(compose.$el[0].body('Hello'));
    gmail.dom.composes()[0].body("suggestions")
    console.log("add text");
    // gmail.dom.composes()[0].body("test asdfa sdf kads;fkjasdkfjas;dfkjasdkj as;lkdfjalskdf j;lkasdjfl;kasjdfl;kajsdfkl;jasd fkjas;ldfjk;asldfjl;kjasdfj;asd;lfkjl;kajsdfkjkljasdfkjaslk;dfjlkajsdflksj");
  });

  
  gmail.observe.on('compose_email_select', function(match) {
    console.log('Email select popup',match);
    suggestions = "<div class=\"btn-group\"><button style=\"border: solid 2px #a51c93;padding: 10px;margin-right: 10px;-moz-border-radius: 50px;-webkit-border-radius: 50px;border-radius: 50px;\" type=\"button\" class=\"btn btn-default btn-xs\">Yes I would Love to Come!</button><button style=\"border: solid 2px #a51c93;padding: 10px;margin-right: 10px;-moz-border-radius: 50px;-webkit-border-radius: 50px;border-radius: 50px;\" type=\"button\" class=\"btn btn-default btn-xs\">Yes I will be able to make it</button><button style=\"border: solid 2px #a51c93;padding: 10px;margin-right: 10px;-moz-border-radius: 50px;-webkit-border-radius: 50px;border-radius: 50px;\" type=\"button\" class=\"btn btn-default btn-xs\">Sorry, I wont be able to make it</button></div></div>";
    gmail.dom.composes()[0].body(suggestions)
  });
  gmail.observe.on('compose_select', function(match) {
    console.log('Compose select',match);
    suggestions = "<div class=\"btn-group\"><button style=\"border: solid 2px #a51c93;padding: 10px;margin-right: 10px;-moz-border-radius: 50px;-webkit-border-radius: 50px;border-radius: 50px;\" type=\"button\" class=\"btn btn-default btn-xs\">Yes I would Love to Come!</button><button style=\"border: solid 2px #a51c93;padding: 10px;margin-right: 10px;-moz-border-radius: 50px;-webkit-border-radius: 50px;border-radius: 50px;\" type=\"button\" class=\"btn btn-default btn-xs\">Yes I will be able to make it</button><button style=\"border: solid 2px #a51c93;padding: 10px;margin-right: 10px;-moz-border-radius: 50px;-webkit-border-radius: 50px;border-radius: 50px;\" type=\"button\" class=\"btn btn-default btn-xs\">Sorry, I wont be able to make it</button></div></div>";
    gmail.dom.composes()[0].body("suggestions")
  });

 
}

refresh(main);