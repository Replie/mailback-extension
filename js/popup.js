'use strict'
var predict_url = 'https://mb-analytics.site'

$(document).ready(function () {
    chrome.storage.sync.get(null, function(result) {
        console.log('Value currently is ' + result.date);
        $("#date_st").text(result.date)
        $("#epoch_st").text(result.epoch)
        $("#step_st").text(result.step)
    });
    $("#v-pills-home-tab").click(function () {
        chrome.storage.sync.get(null, function(result) {
            console.log('Value currently is ' + result.date);
            $("#date_st").text(result.date)
            $("#epoch_st").text(result.epoch)
            $("#step_st").text(result.step)
        });
    })
    $("#v-pills-prefrences-tab").click(function () {
        console.log("getting stuff")
        $.getJSON(predict_url + "/_get_dates", {
            format: "json"
        })
            .done(function (data) {
                let results = data.dates;
                let res_element = $("#checkpoints_list");
                res_element.empty();
                let epochs_val = $("#epochs_val");
                epochs_val.val('');
                epochs_val.text('Epochs');
                results.forEach(function (element) {
                    res_element.append(
                        '<a class="dropdown-item" href="#">' + element + '</a>'
                    );
                    $("#checkpoints_list > .dropdown-item").click(function () {
                        let checkpoint_val = $("#checkpoint_val");
                        let value = $(this).text();
                        checkpoint_val.val(value);
                        checkpoint_val.text(value);
                        $.getJSON(predict_url + "/_get_epochs", {
                            date: value,
                            format: "json"
                        })
                            .done(function (data) {
                                let results = data.epoches;
                                let res_element = $("#epochs_list");
                                res_element.empty();
                                results.forEach(function (element) {
                                    res_element.append(
                                        '<a class="dropdown-item" href="#">' + element + '</a>'
                                    );
                                    $("#epochs_list > .dropdown-item").click(function () {
                                        let checkpoint_val = $("#checkpoint_val").val();
                                        let epochs_val = $("#epochs_val");
                                        let value = $(this).text();
                                        epochs_val.val(value);
                                        epochs_val.text(value);
                                        $.getJSON(predict_url + "/_get_steps", {
                                            date: checkpoint_val,
                                            epoch: value,
                                            format: "json"
                                        })
                                            .done(function (data) {
                                                let results = data.steps;
                                                let res_element = $("#steps_list");
                                                res_element.empty();
                                                results.forEach(function (element) {

                                                    res_element.append(
                                                        '<a class="dropdown-item" href="#">' + element + '</a>'
                                                    );
                                                    $("#steps_list > .dropdown-item").click(function () {
                                                        let steps_val = $("#steps_val");
                                                        let value = $(this).text();
                                                        steps_val.val(value);
                                                        steps_val.text(value);
                                                        $("#submit").removeAttr("disabled");
                                                        $("#submit").click(function () {
                                                            chrome.storage.sync.set(
                                                                {
                                                                'date': $("#checkpoint_val").val(),
                                                                'epoch': $("#epochs_val").val(),
                                                                'step': $("#steps_val").val()
                                                              },
                                                              function() {
                                                                console.log('Settings saved');
                                                              });
                                                        });
                                                    });
                                                });
                                            });
                                    });
                                });
                            });

                    });
                });
            });
    });
});


