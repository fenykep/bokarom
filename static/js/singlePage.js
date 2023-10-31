const app = {
    currentPage: null,
    currentView: 'H',
    currentID: '00',
    currentWeek: '42',
    setPage(page) {
        this.currentPage = page;
        document.getElementById("content").textContent = "Current Page: " + page;
    }
};

function toggleElements(cardModal, personsGrid, roomImage, weekNoSelector, weekTable, searchBar, floorPlan) {
  const elements = {
    cardModal: document.getElementById('cardModal'),
    personsGrid: document.getElementById('personsGrid'),
    roomImage: document.getElementById('roomImage'),
    weekNoSelector: document.getElementById('weekNoSelector'),
    weekTable: document.getElementById('weekTable'),
    searchBar: document.getElementById('searchBar'),
    floorPlan: document.getElementsByClassName('floorPlan')[0],
  };

  // Check the boolean values and toggle the display property of the elements
  elements.cardModal.style.display = cardModal ? 'grid' : 'none';
  elements.personsGrid.style.display = personsGrid ? 'flex' : 'none';
  elements.roomImage.style.display = roomImage ? 'block' : 'none';
  elements.weekNoSelector.style.display = weekNoSelector ? 'flex' : 'none';
  elements.weekTable.style.display = weekTable ? 'block' : 'none';
  elements.searchBar.style.display = searchBar ? 'block' : 'none';
  elements.floorPlan.style.display = floorPlan ? 'block' : 'none';
}

toggleElements(false, false, false, false, false, false, false); // reset

function jank(urlChar){
    switch(urlChar){
        case 'f':
            toggleElements(true, false, false, false, false, false, true); // floorView
        break;
        case 's':
            toggleElements(false, true, false, false, false, true, false); // searchView
        break;
        case 'r':
            toggleElements(false, false, true, true, true, false, false); // roomView
        break;
        case 'p':
            toggleElements(true, false, false, true, true, false, false); // personView
        break;
        default:
            toggleElements(false, false, false, false, false, false, false); // reset        
    }
}

window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
    window.history.go(1);
    jank('f');
};
