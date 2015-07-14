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

    //maybe implement:
    // context.chatWorker(['addMessage', 'getRooms']);
  });
};


//not for posting our texts
app.addMessage = function(message_obj) {

  var chatElement = '<div class="chat"><span class="username">' + 
        sanitize(message_obj.username) + ': </span><span class="message">' + 
        sanitize(message_obj.text) + '</span><br/><small>' + message_obj.createdAt 
        + '</small><br><small>Room name: ' + sanitize(message_obj.roomname) + '</small></div>';

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

//maybe implement:
app.chatWorker = function(applyMethods) {
//   _.each(this.chats, function(chat) {
//     _.each(applyMethods) {
//       //apply method to chat
//       // Get rooms
//       // Get chat info
//       // Now addMessages
//     }
//   });
};

app.displayChats = function() {
  var context = this;
  
  _.each(this.chats, function(chat) {
    context.getRooms(chat);  
    context.storeChat(chat);
  });
  
  _.each(context.chatStorage, function(chat) {
    //TODO: make this filter better..
    if(chat.username !== undefined || chat.username !== '' || chat.username !== null) {

      //if app.currentRoom is null, display all by default
      if(context.currentRoom === null) {
        context.addMessage(chat);
      }

      //if chat.roomname is same as app.currentRoom, then display
      else if(chat.roomname === context.currentRoom) {
        context.addMessage(chat);
      }

    }
  });
};

app.getRooms = function(chat) {
  if(chat.roomname === undefined) {
    //do nothing
    return;
  }
  if(!this.rooms[chat.roomname]) {
    this.rooms[chat.roomname] = 1;
    $('#rooms').append('<option id="' + chat.roomname + '">' + chat.roomname + '</option>');
  } else {
    this.rooms[chat.roomname]++;
  }
};

app.storeChat = function(chat) {
  var context = this;
  if(!context.chatStorage[chat.objectId]) {
    context.chatStorage[chat.objectId] = chat;
  }
};



