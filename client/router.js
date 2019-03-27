Router.configure({
  layoutTemplate: 'Double'
});
Router.route("/my", function(){
  Meteor.subscribe("forms");
  this.render('dashboard');
  this.render('forms', {to: "left"});
});

Router.route("/", function(){
  this.layout('Full');
  this.render('about');
});
Router.route("/form/new", function(){
  Meteor.subscribe("forms");
  this.render('forms', {to: "left"});
  this.render('new_form');
});
Router.route("/results/:id", function(){
  Meteor.subscribe("forms");
  Session.set("form_id",this.params.id);
  Meteor.subscribe("results_by_form_id",this.params.id);
  this.render('forms', {to: "left"});
  this.render('results');
});
Router.route("/login", function(){
  this.layout('Full');
  this.render('login');
});
