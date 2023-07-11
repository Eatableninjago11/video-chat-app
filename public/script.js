// jquery is the language

const socket = io("/")
var peer = new Peer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "443"
})

const user = prompt("Enter your Name")

$(function () {
    // this code will run when the document is ready

    // when the element show_chat is clicked
    $('#show_chat').click(function () {
        console.log("chat button clicked");
        // hides the elements with the left-window
        $(".left-window").css("display", "none")
        //show the elements with the right-window
        $(".right-window").css("display", "block")
        // show the elements with the header_back
        $(".header_back").css("display", "block")
    })

    $('.header_back').click(function () {
        $(".left-window").css("display", "block")
        $(".right-window").css("display", "none")
        $(".header_back").css("display", "none")
    })

    $('#send').click(function () {
        if ($("#chat_message").val().length !== 0) {
            socket.emit('message', $("#chat_message").val())
            $("#chat_message").val() = ""
        }
    })
    $("#chat_meassage").keydown(function (e) {
        if (e.key == "Enter" && $("#chat_message".val().length !== 0)) {
            socket.emit('message', $("#chat_message").val())
            $("#chat_message").val() = ""
        }
    })
    peer.on("open", (id) => {
        socket.emit("join-room", ROOM_ID, id, user)
    })
    socket.on("createMessage", (message, userName) => {
        //code to display recieved message in the chat window
        //adding new messages to the chat window dynamically
        $(".messages").append(`
        <div class="message">
        <b><i class="far fa-user-circle"></i> 
        <span>${userName === user ? "me" : userName}</span>
        </b>
        <span>${message}</span>
        </div>`)
    })
})

