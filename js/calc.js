'use strict';

var gNum1 = '';
var gNum2 = '';
var gOp = null;
var result;

function init() {
	clear();
	addOnclickToTds();
}

var mathAction = {
	'+': () => gNum1 + gNum2,
	'-': () => gNum1 - gNum2,
	'/': () => gNum1 / gNum2,
	'*': () => gNum1 * gNum2
};

function getKey(el) {
	var key = el.innerText || el;
	// handle key presses and not only mouse
	var cell = document.querySelectorAll('td');
	for (var i = 0; i < cell.length; i++) {
		if (cell[i].innerText === key || cell[i].innerText === el) {
			cell[i].style.backgroundColor = '#a2a2a2';
			removeClick(i);
		}
		// to avoid closure with i, we need to call it with the specific i
		function removeClick(i) {
			setTimeout(() => {
				cell[i].style.backgroundColor = 'azure';
			}, 125);
		}
	}
	if (key === 'C') {
		clear();
		return false;
	}
	if ((Number(key) && !gOp) || (!gOp && (key === '0' || key === '.'))) {
		gNum1 += key;
		document.querySelector('.result').innerText = gNum1;
		return false;
	}
	// if (!Number(key) && key !== '=' && key !== '0' && key !== '.') {
	if (!Number(key) && mathAction[key]) {
		// console.log('Setting Op to: ', key);
		gOp = key;
		document.querySelector('.result').innerText = gNum1 + ' ' + gOp;
		return false;
	}
	if ((Number(key) && gOp && key !== '=') || key === '0' || key === '.') {
		gNum2 += key;
		document.querySelector('.result').innerText = gNum1 + ' ' + gOp + ' ' + gNum2;
		return false;
	} else if (key === '=') {
		gNum1 = +gNum1;
		gNum2 = +gNum2;
		result = mathAction[gOp]();
		document.querySelector('.result').innerText = result;
		gNum1 = result;
		gNum2 = '';
		gOp = null;
	}
}

//add onClick attribute to all table data cells
function addOnclickToTds() {
	var elTd = document.querySelectorAll('td');
	for (var i = 0; i < elTd.length; i++) {
		elTd[i].setAttribute('onClick', 'getKey(this)');
		elTd[i].setAttribute('onMouseenter', 'hover(this)');
		elTd[i].setAttribute('onMouseout', 'remHover(this)');
	}
}

function clear() {
	document.querySelector('.result').innerText = '\uD83D\uDDA9 JS Calc';
	gNum1 = '';
	gNum2 = '';
	gOp = null;
}

// chaned to hard coded style so the former key press won't override style setting. otherwise can't set hover back after key press!
function hover(el) {
	el.style.backgroundColor = '#a2a2a2';
	// el.classList.add('hover');
}

function remHover(el) {
	el.style.backgroundColor = 'azure';
	// el.classList.remove('hover');
}
