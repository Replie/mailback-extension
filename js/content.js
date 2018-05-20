var j = document.createElement('script');
j.src = chrome.extension.getURL('js/jquery-3.2.1.min.js');
(document.head || document.documentElement).appendChild(j);

var j = document.createElement('script');
j.src = chrome.extension.getURL('js/popper.js');
(document.head || document.documentElement).appendChild(j);

var s = document.createElement('link');
s.rel = "stylesheet"
s.type = "text/css"
s.href = chrome.extension.getURL('css/bootstrap-material-design.min.css');
(document.head || document.documentElement).appendChild(s);


var s = document.createElement('script');
s.src = chrome.extension.getURL('js/bootstrap-material-design.min.js');
(document.head || document.documentElement).appendChild(s);

var g = document.createElement('script');
g.src = chrome.extension.getURL('js/gmail.js');
(document.head || document.documentElement).appendChild(g);

var s = document.createElement('script');
s.src = chrome.extension.getURL('js/main.js');
(document.head || document.documentElement).appendChild(s);

var s = document.createElement('link');
s.rel = "stylesheet"
s.type = "text/css"
s.href = chrome.extension.getURL('css/main.css');
(document.head || document.documentElement).appendChild(s);


