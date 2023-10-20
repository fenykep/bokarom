let isDragging = false;
let isMouseDown = false;
let isDeletemode = false;


document.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'TD' && e.target.id.includes('dr') && !e.target.classList.contains('occupied')) {
        isMouseDown = true;
        startCell = e.target;
        if (!isDeletemode) {
            startCell.classList.add('selected');
            updateReserveMask(Number(e.target.id.replace('dr','')),idToken.hexAlias, reserveMask);
        } else {
            startCell.classList.remove('selected');
            updateReserveMask(Number(e.target.id.replace('dr','')),"00", reserveMask);
        }
    }
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

document.querySelectorAll('td[id^="dr"]').forEach((cell) => {
    cell.addEventListener('mouseenter', () => {
        if (isMouseDown && !cell.classList.contains('occupied')) {
            const currentCell = cell;
            currentCell.classList.add('selected');
            if (!isDeletemode) {
                currentCell.classList.add('selected');
                updateReserveMask(Number(currentCell.id.replace('dr','')),idToken.hexAlias, reserveMask);
            } else {
                currentCell.classList.remove('selected');
                updateReserveMask(Number(currentCell.id.replace('dr','')),"00", reserveMask);
            }
        }
    });
});


function toggleDelMode(){
    if (!isDeletemode) {
        document.querySelector('#trashCanLid').classList.add('opencan');
        isDeletemode = true;
    } else {
        document.querySelector('#trashCanLid').classList.remove('opencan');
        isDeletemode = false;
    }
}

function applyReserveMask(origHexString, currReserveMask){
    let mergedHexString = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    for (let i = 0; i < (currReserveMask.length/2); i+=1) {
        let reservedSeg = currReserveMask.substr(i*2,2);
        let originalSeg = origHexString.substr(i*2,2);
        if (originalSeg=="00" && reservedSeg!='00') {
            //console.log("I: "+i+" | 2I: "+i*2+" | sub: " + currReserveMask.substr(i,2));
            mergedHexString = mergedHexString.substring(0,i*2) + reservedSeg + mergedHexString.substring((i*2)+2);
        } else if (originalSeg!='00') {
            mergedHexString = mergedHexString.substring(0,i*2) + originalSeg + mergedHexString.substring((i*2)+2);
        }
    }
    return mergedHexString;
}

function submitReserve(){
    // // Event handler for the "Send" button click
    // document.getElementById('sendButton').addEventListener('click', () => {
    //     // Send a "hello" message to the server when the button is clicked
    //     colPik = document.getElementById("colorPicker");
    //     console.log(colPik.value);
    //     socket.send(colPik.value);
    // });

    let newHexString = applyReserveMask(hexString, reserveMask);
    setHexString(newHexString);
    socket.send(newHexString);

    var elems = document.querySelectorAll('.selected');
    [].forEach.call(elems, function(el) {
        el.classList.remove("selected");
    });

    // reSetReserveMask();
    reserveMask = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
}