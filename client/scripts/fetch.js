app.fetch = function() {
  var context = this;
  $.ajax({
    type: 'GET',
    url: 'https://api.parse.com/1/classes/chatterbox',
    contentType: 'application/json',
    success: function(data) {
      context.chats = data.results;
    }
  }).done(function(){
    // After AJAX GET call completes, we invoke the .displayChats() method to iterate through all chat data.
    context.displayChats();
  });
};


//not for posting our texts
app.addMessage = function(message_obj) {

  var chatElement = '<div class="chat"><span class="username">' + 
        sanitize(message_obj.username) + ': </span><span class="message">' + 
        sanitize(message_obj.text) + '</span><br/><small>' + message_obj.createdAt + '</small></div>';

  if(!_.contains(this.displayed, message_obj.objectId)) {
    if(this.firstLoad) {
      $('#chats').append(chatElement);  
      this.firstLoad = false;
    } else {
      $('#chats').prepend(chatElement);
    }
    
    this.displayed.push(message_obj.objectId);
  }
};


app.displayChats = function() {
  var context = this;
  
  _.each(this.chats, function(chat) {
    //TODO: make this filter better..
    if(chat.username !== undefined || chat.username !== '' || chat.username !== null) {
      console.log(chat.username);
      context.addMessage(chat);
    }
  });
};