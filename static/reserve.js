let isDragging = false;
let isMouseDown = false;
let isDeletemode = false;


document.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'TD' && e.target.id.includes('dr') && !e.target.classList.contains('occupied')) {
        isMouseDown = true;
        startCell = e.target;
        if (!isDeletemode) {
        	startCell.classList.add('selected');
        } else {
        	startCell.classList.remove('selected');
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
            } else {
            	currentCell.classList.remove('selected');
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