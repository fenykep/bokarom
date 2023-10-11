const idToken = {
    "hexID":"3c"
}

const lookupData = {
  "ff": {
    "hexColor": "#FF5733",
    "fullName": "John Doe",
    "email": "john.doe@example.com"
  },
  "11": {
    "hexColor": "#41FF33",
    "fullName": "Jane Smith",
    "email": "jane.smith@example.com"
  },
  "3c": {
    "hexColor": "#3344FF",
    "fullName": "Mary Johnson",
    "email": "mary.johnson@example.com"
  },
  "7a": {
    "hexColor": "#FF3388",
    "fullName": "Robert Brown",
    "email": "robert.brown@example.com"
  },
  "b2": {
    "hexColor": "#AA88FF",
    "fullName": "Emily Davis",
    "email": "emily.davis@example.com"
  }
}

function hexStringToArray(hexString) {
    if (hexString.length % 2 !== 0) {
        throw new Error("Hex string must have an even number of characters.");
    }

    const wordArray = [];

    for (let i = 0; i < hexString.length; i += 2) {
        const word = hexString.slice(i, i + 2);
        wordArray.push(word);
    }

    return wordArray;
}

function leftPad(number, width, paddingChar) {
    const numString = String(number);
    const padding = Array(Math.max(width - numString.length, 0) + 1).join(paddingChar || '0');
    return padding + numString;
}

async function colorOccupied(weekArray) {
    if (lookupData) {
        weekArray.forEach(function (slot, index) {
            const paddedNumber = leftPad(index, 3, '0'); // Left-pad to 3 digits with '0'
            const selector = `#dr${paddedNumber}`;
            const element = document.querySelector(selector);
            element.innerText = slot.toUpperCase();
            if (slot!="00") {
                const occupantData = lookupData[slot];

                if (occupantData) {
                    element.setAttribute('nev', occupantData.fullName);
                    element.setAttribute('email', occupantData.email);
                    element.style.backgroundColor = occupantData.hexColor;
                    element.setAttribute('title', occupantData.fullName + " | " + occupantData.email);
                } else {
                    console.error(`Entry with key '${key}' not found.`);
                }
                element.classList.add('occupied');
                // console.log('index: '+index+' %40= '+index%40);
                if (index%40!=39) {
                    if (weekArray[index+1] == slot){
                        element.classList.add('Sop');
                    }
                }
                if (index%40!=0) {
                    if (weekArray[index-1] == slot){
                        element.classList.add('Nop');
                    }
                }
            }
        });
    }

}

function setHexString(newHexString){
    hexString = newHexString;
    colorOccupied(hexStringToArray(newHexString));
    // if(socket){
    //     // socket.send(newHexString);
    // }
}

function updateHexString(viertel,value, origHexString){
    //create a new datatype or prototype or class or whatever
    // that has like a name, email, id, color whatever
    // and like the browser should know that and the webserver socket should
    // like also be able to associate us with sth in its db
    // so yeah whatever thats like what we take here as value, as like default
    // and then somehow like bitbang or idk how its called, like we have to replace a byte in this array
    // but its like a string now in js
}

// String.prototype.replaceAt = function(index, replacement) {
//     return this.substring(0, index) + replacement + this.substring(index + replacement.length);
// }

function updateReserveMask(viertel,value, origReserveMask){
    reserveMask = origReserveMask.substring(0,viertel*2) + value + origReserveMask.substring((viertel*2)+2);
    console.log(reserveMask);
}

function reSetReserveMask(){
    reserveMask ="0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
}

var reserveMask ="0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

// var reserveMask;
// reSetReserveMask();

//const hexString ="0011223344556677889900aabbccddeeff0011223344556677889900aabbccddeeff0011223344556677889900aabbccddeeff0000000000000000000000000000000000000000000000000000000000000000000000000000011223344556677889000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011223344556677889900aabbccddeeff0011223344556677889900aabbccddeeff00000000000000000000000000000000";
// var hexString ="00111111000000000000000000000000000000000011111111111100000000000000003c3c3c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000000000000000";


// var hexString ="0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

var hexString;
// "0000000000000000000000000000000000000000000000000000000000000000000000000000011223344556677889000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000112233445566778890000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
// const wordArray = hexStringToArray(hexString);
// console.log(wordArray);
// colorOccupied(wordArray);

const serverIP = window.location.hostname;
const socket = new WebSocket('ws://'+serverIP+':8080');
// const socket = new WebSocket('ws://192.168.45.33:8080');

// Event handler for when the connection is established
socket.addEventListener('open', (event) => {
    console.log('WebSocket connection established.');
    // Itt kéne megkapnija az identitijét is, pl meg custom variablek
});

// // Event handler for the "Send" button click
// document.getElementById('sendButton').addEventListener('click', () => {
//     // Send a "hello" message to the server when the button is clicked
//     colPik = document.getElementById("colorPicker");
//     console.log(colPik.value);
//     socket.send(colPik.value);
// });

// Event handler for incoming messages from the server
socket.addEventListener('message', (event) => {
    console.log('Received message from server:', event.data);
    // console.log(event.data);
    if (event.data && event.data!=hexString) {
        setHexString(event.data);
    }
    // colorOccupied(hexStringToArray(event.data));
    //document.querySelector('body').style.backgroundColor = event.data;
});

// Event handler for when the connection is closed
socket.addEventListener('close', (event) => {
    if (event.wasClean) {
        console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
    } else {
        console.error('Connection abruptly closed.');
    }
});

// Event handler for WebSocket errors
socket.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
});

const hexString ="00111111000000000000000000000000000000000011111111111100000000000000003c3c3c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000000000000000";
const wordArray = hexStringToArray(hexString);
console.log(wordArray);
colorOccupied(wordArray);