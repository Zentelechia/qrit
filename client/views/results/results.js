import React from 'react'
import ReactDOM from 'react-dom'
import FormBuilder from '../../builder.js'
// import registerServiceWorker from './registerServiceWorker'

UI.registerHelper('removeQ', (q) => {
  return q;
  return q.replace("?", "");
})
var options = {
  width: "200px",
  stretch: false

};

var responsiveOptions = [
  ['screen and (min-width: 640px)', {
    chartPadding: 0,
    labelOffset: 0,
    labelDirection: 'implode',
    labelInterpolationFnc: function (value) {
      return value;
    }
  }],
  ['screen and (min-width: 1024px)', {
    labelOffset: 80,
    chartPadding: 20
  }]
];

Template.results.onRendered(function(){
    $('#qrcode').qrcode({
      size: 100,
      text: Session.get("form_id")
    })
})
Template.results.helpers({
  charts: function () {
    $("div[class^=ct-chart]").remove();
    var i = 0;
    if (true) {
      var f = forms.findOne(Session.get("form_id"));
      if (f && f.content) {
        var content = f.content;
        //console.log(content);
        var rr = resultsfind({
          form_id: Session.get("form_id")
        }).fetch();

        _.each(content, c => {
          var data = {};
          var all = _.flatten(_.map(rr, (r) => {
            return r.answers[i]
          }));
          var map = {};
          _.each(all, a => {
            if (a != "") {
              map[a] = ~~map[a] + 1;
            }
          });
          //      console.log(map);
          data.labels = _.keys(map);
          data.series = _.map(data.labels, k => {
            return map[k]
          });

          console.log(data);

          $(`<div class="ct-chart${i}">${c.title}</div>`).appendTo("#charts");
          new Chartist.Bar('.ct-chart' + i, data, {
            distributeSeries: true
          }, responsiveOptions);
          i = i + 1;
        });
      }
    }
  },
  results() {
        var rr=resultsfind({form_id: Session.get("form_id")}).fetch();

        var data = {
          labels: ['Bananas', 'Apples', 'Grapes'],
          series: [20, 15, 40]
        };
        var options = {
          labelInterpolationFnc: function(value) {
            return value[0]
          }
        };

        var responsiveOptions = [
          ['screen and (min-width: 640px)', {
            chartPadding: 30,
            labelOffset: 100,
            labelDirection: 'explode',
            labelInterpolationFnc: function(value) {
              return value;
            }
          }],
          ['screen and (min-width: 1024px)', {
            labelOffset: 80,
            chartPadding: 20
          }]
        ];
        if ($(".ct-chart").get().length){
          new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
        }

    $('#qrcode canvas').remove();
   
    return resultsfind({
      form_id: Session.get("form_id")
    }).fetch().reverse();
  },
  form() {
    return forms.findOne(Session.get("form_id"));
  },
  b64() {
    return Session.get("form_id");
  }
});
Template.results.events({
  'click #remove'() {
    forms.remove(Session.get("form_id"));
  }
})

Template.newForm.onRendered(function () {
  ReactDOM.render( < FormBuilder / > , document.getElementById('newForm'))
})