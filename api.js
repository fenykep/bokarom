// N-up,W-right,
// import { lookupData } from './db.js';
// const lookupData = require('./data.js');

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

// fetch('db.json') // Relative path to the JSON file
//     .then(response => response.json())
//     .then(data => {
//         // Do something with the JSON data
//         console.log(data);
//     })
//     .catch(error => {
//         console.error('Error fetching JSON:', error);
//     });


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
    // const lookupData = await fetchLookupData();

    if (lookupData) {
        // Access data using keys ('f3', 'c9', etc.)
        // const key = 'f3';

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
                    // console.log(`Hex Color: ${occupantData.hexColor}`);
                    // console.log(`Full Name: ${occupantData.fullName}`);
                    // console.log(`Email: ${occupantData.email}`);
                } else {
                    console.error(`Entry with key '${key}' not found.`);
                }
                element.classList.add('occupied');
                console.log('index: '+index+' %40= '+index%40);
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

//const hexString ="0011223344556677889900aabbccddeeff0011223344556677889900aabbccddeeff0011223344556677889900aabbccddeeff0000000000000000000000000000000000000000000000000000000000000000000000000000011223344556677889000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011223344556677889900aabbccddeeff0011223344556677889900aabbccddeeff00000000000000000000000000000000";
const hexString ="00111111000000000000000000000000000000000011111111111100000000000000003c3c3c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000000000000000";
// "0000000000000000000000000000000000000000000000000000000000000000000000000000011223344556677889000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000112233445566778890000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
// "0011223344556677889900aabbccddeeff00112233445566778899000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000aabbccddeeff000000000000000000000000000000000000000000000000000000000000000000000000000011223344556677889900aabbccddeeff0011223344556677889900120011223344556677889900aabbccddeeff0011223344556677889900aabbccddeeff00000000000000000000000000000000";
// "0000000000000000000000000000000000000000000011223344556677889900aabbccddeeff0011223344556677889900120011223344556677889900aabbccddeeff00112233445566778000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000089900aabbccddeeff000000000000066778899aabbccddeefff232419234123824600000000000000000000223344556677889900aabbccddeeff00000000000000000000000000000000";
// "00110022003300440055006600770088009900aabbccddeeff001122334455000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000066778899aabbccddeefff2324192341238246000110022003300440055006600770088009900aabbccddeeff001122334455000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000066778899aabbccddeefff23241923412382460";
const wordArray = hexStringToArray(hexString);
console.log(wordArray);
colorOccupied(wordArray);