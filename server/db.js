Meteor.publish("form_by_id",function(id){
  return forms.find({_id: id});
});

Meteor.publish("forms",function(){
  return forms.find();
});

Meteor.publish("results_by_form_id",function(form_id){
  return resultsfind();
});
