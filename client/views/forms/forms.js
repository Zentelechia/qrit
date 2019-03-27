UI.registerHelper('c',function(id){
  return resultsfind({form_id: id}).count();
})
Template.forms.helpers({
  forms: function(){
    var q={};
    if (Session.get("q")){
    q.title={$regex: Session.get("q")}
    }
    return forms.find(q).fetch().reverse();
}
})

Template.forms.events({
  'keyup .search': function(){
    Session.set("q",$(".search").val());
  },
  'click .form_title'(e){
    Router.go("/results/"+e.currentTarget.id);
  },
  'click #addForm'(){
    Router.go("/form/new");
  }
})
