const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const chatBox = document.getElementById('chatBox')
const messageEl = document.getElementById('message')
const user = document.getElementById('user')
const date = new Date() // Date implementation


const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.json();
}

socket.on('newMessage', data => {
    addMessage(data, false)
})

// Post message to board
const postMessage = () => {
    const message = document.getElementById('message').value;
    const color = document.getElementById('color').value;

    const data = { message, type: "uMessage", color: color }
    addMessage(data, true);
    socket.emit('message', data);
}

const posLogout = async () => {
    const user = document.getElementById('user').value;
    const res = await postData("/prove12/logout", { username: user });
    if (res.message.includes('Success')) {
        socket.emit('newUser', { message: user + " has logged out." , color: 'gray'});
        window.location.href = "/prove12/";
    }
}

// Add message from any user to chatbox, determine if added
// by current user.
const addMessage = (data = {}, self = true) => {

    const time = date.getHours() + ":" + date.getMinutes() + " : ";

    const chatList = document.getElementById('chatBox');

    const newLi = document.createElement("li");
    newLi.innerText = time + data.message;

    newLi.setAttribute('class', data.type);

    if (!self) {
        newLi.setAttribute('class',data.type+  ' ' + data.color);
    }

    chatList.appendChild(newLi);

}
