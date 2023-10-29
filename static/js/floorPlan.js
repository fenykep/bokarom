// this works for the 15.OG only now,
// and we are likely to have conflicts
// with the 14.OG

const germanNames = [
    "Jan Müller",
    "Anna Schmidt",
    "Lukas Weber",
    "Sophie Fischer",
    "Max Wagner",
    "Hannah Becker",
    "Paul Richter",
    "Lea Schäfer",
    "Felix Schuster",
    "Emma Keller",
];

const imageList = [
    "https://lindenpartners.eu/wp-content/uploads/2022/08/TPO_LINDENPARTNERS_052022_0283_V2_WEB-aspect-ratio-4-5-800x1000.jpg",
    "https://lindenpartners.eu/wp-content/uploads/2022/09/TPO_LP_082022_SL2_0586_WEB-aspect-ratio-4-5-1-800x1000.jpg",
    "https://lindenpartners.eu/wp-content/uploads/2022/08/TPO_LINDENPARTNERS_062018_0929_WEB-Kopie-2-scaled-aspect-ratio-4-5-800x1000.jpg",
    "https://lindenpartners.eu/wp-content/uploads/2023/04/TPO_LP_-042023_0733_WEB-aspect-ratio-4-5-1-800x1000.jpg",
    "https://lindenpartners.eu/wp-content/uploads/2022/08/TPO_LINDENPARTNERS_062018_0659_WEB-Kopie-2-scaled-aspect-ratio-4-5-800x1000.jpg",
    "https://lindenpartners.eu/wp-content/uploads/2022/08/TPO_LINDENPARTNERS_062018_1064_WEB-Kopie-2-scaled-aspect-ratio-4-5-800x1001.jpg",
    "https://lindenpartners.eu/wp-content/uploads/2022/08/TPO_LINDENPARTNERS-052021_0408_WEB-aspect-ratio-4-5-800x1000.jpg",
    "https://lindenpartners.eu/wp-content/uploads/2023/02/Image27-aspect-ratio-4-5-800x1000.jpeg",
    "https://lindenpartners.eu/wp-content/uploads/2022/08/TPO_LINDENPARTNERS_02_20193517_WEB-Kopie-scaled-aspect-ratio-4-5-800x1000.jpg",
    "https://lindenpartners.eu/wp-content/uploads/2022/08/TPO_LINDENPARTNERS_062018_P2_0327_WEB-Kopie-2-scaled-aspect-ratio-4-5-800x1000.jpg",
];

// Function to select a random name
function getRandomGermanName() {
    const randomIndex = Math.floor(Math.random() * germanNames.length);
    // return germanNames[randomIndex];
    return {
        name: germanNames[randomIndex],
        image: imageList[randomIndex],
    };
}

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
    element.addEventListener("click", () => {
        console.log(element.id);
        const nameHeader = document.querySelector("#cardModal h1");
        const roomNoHeader = document.querySelector("#cardModal h2");
        const cardImage = document.querySelector("#cardModal img");
        nameHeader.style.opacity=0;
        roomNoHeader.style.opacity=0;
        cardImage.style.opacity=0;
        setTimeout(()=>{
            nameHeader.innerText = getRandomGermanName().name;
            cardImage.src = getRandomGermanName().image;
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
});