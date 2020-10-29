//dom queries
const chatlist = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');
//new chat add
newChatForm.addEventListener('submit', e=>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addchat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

//update username
newNameForm.addEventListener('submit' , e=>{
    e.preventDefault();
   const newName = newNameForm.name.value.trim();
   chatroom.updateName(newName);
   newNameForm.reset();
   //show then hide msg
   updateMsg.innerText = `Your name was updated to ${newName}`;
   setTimeout(()=> updateMsg.innerText ='',3000);
});

//chat rooms
rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getchats(chat => chatUI.render(chat));
    }

});




//check local storage 
const username = localStorage.username ? localStorage.username : 'anon';

//class instances
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom ('general' , username);

//render chat template
chatroom.getchats((data) => {
    chatUI.render(data);
});
