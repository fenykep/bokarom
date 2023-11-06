// this works for the 15.OG only now,
// and we are likely to have conflicts
// with the 14.OG

// Function to select a random name
function getRandomPerson() {
    let keys = Object.keys(persLookup);
    // the 0 bang is for rounding
    let indexInt = (keys.length * Math.random() << 0);
    return {
        name: persLookup[keys[indexInt]].fullName,
        image: "../../img/perso/"+keys[indexInt]+".jpg",
    };
}

// var randomValueFromObject = function (obj) {
//     var keys = Object.keys(obj);
//     return obj[keys[ keys.length * Math.random() << 0]];
// };


// Ill have to edit this in the svg :(
const dataDict = {
    rect12570: 1503,
    rect12568: 1504,
    rect12566: 1505,
    rect12564: 1506,
    rect12562: 1507,
    rect1252: 1508,
    rect12618: "Konfi15",
    rect12602: 1523,
    rect12600: 1524,
    rect12598: 1525,
    rect12596: "Kreativraum",
    rect12594: 1529,
    rect12604: 1530,
    rect12590: 1519,
    rect12578: 1518,
    rect12576: 1515,
    rect12574: 1514,
    rect12592: 1513,
    rect12572: 1512,
    rect12614: "Garderobe",
    rect12612: 1541,
    rect12610: 1540,
    rect12608: 1539,
    rect12606: 1536,
    rect12616: 1535
};

document.querySelectorAll('.roomBackgroundPlain').forEach(element => {
    element.addEventListener("mouseover", () => {
        console.log(element.id);
        const nameHeader = document.querySelector("#cardModal h1");
        const roomNoHeader = document.querySelector("#cardModal h2");
        const cardImage = document.querySelector("#cardModal img");
        nameHeader.style.opacity=0;
        roomNoHeader.style.opacity=0;
        cardImage.style.opacity=0;
        setTimeout(()=>{
            const { name, image } = getRandomPerson();
            nameHeader.innerText = name;
            cardImage.src = image;
            nameHeader.style.opacity=1;
            roomNoHeader.style.opacity=1;
            cardImage.style.opacity=1;
            if(typeof dataDict[element.id] === 'number'){
                document.querySelector("#cardModal h2").innerText = "Room " + dataDict[element.id];
            } else{
                document.querySelector("#cardModal h2").innerText = dataDict[element.id];
            }
        },250);
    });
    element.addEventListener("click", () => {
        console.log(element.id);
        if(typeof dataDict[element.id] === 'number'){
            // window.location.href='roomWeek.html?room=Room_'+dataDict[element.id];
            jank('r');
        } else{
            // window.location.href='roomWeek.html?room='+dataDict[element.id];
            jank('r');
        }
    });
});