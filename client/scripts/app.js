
//to execute on load
$(document).ready(function() {
  
  app.init();

  setInterval(function() {
    console.log('Loading. . . . ');
    app.fetch();
  }, 5000);
}); 


// Global variables
var app = {};
app.user = 'Captain Fancy Pants III';
app.beersDaveOwes = 1;
app.beersHarryOwes = 0;
app.chatStorage = {};
app.chats = {};
app.displayed = []; // Push ObjectID of chat messages here so we can make sure we aren't posting duplicates.
app.firstLoad = true; // Track whether we're loading the app for the first time.
app.rooms = {}; // Build and store our list of chatrooms. TODO: Make this work.
app.currentRoom = null; // Stores the current room that we'll pass into our chat iterator

app.init = function() {
  var context = this;

  this.fetch();
  
  // Event handling for clicking on username
  $('.username').on('click', function() {
    context.addFriend();
  });

  // Event handling for submit buttom
  $('#send .submit').on('click',function(e) {
    e.preventDefault();
    context.handleSubmit();
  });

  // Create a new chatroom
  $('#createRoom').on('click', function() {
    app.currentRoom = prompt("Create a new room:");
    $('#rooms').append('<option id="' + app.roomname + '">' + app.roomname + '</option>');
  });

  //set username
  $('#setUser').on('click', function() {
    app.user = prompt("Choose your username:");
  });  

  $('#rooms').change(function() {
    context.currentRoom = $(this).find('option:selected').text();
    if (context.currentRoom === 'All Rooms') {
      context.currentRoom = null;
    }
    $('#chats').html('');
    app.displayed = [];
    app.displayChats();
    console.log(context.currentRoom);
  });
};


app.clearMessages = function() {
  $('#chats').html('');
};

app.addRoom = function(room) {
  $('#roomSelect').append('<div>' + room + '</div>');
};

app.addFriend = function(message_obj) {
  // var username = message_obj.username;
  return true;
};


//utility funcs
var sanitize = function(input) {
  if (input === null) {
    input = '';
  }

  var output = input === undefined ? undefined : input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
    replace(/<[\/\!]*?[^<>]*?>/gi, '').
    replace(/<style[^>]*?>.*?<\/style>/gi, '').
    replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
  
  return output;
};







