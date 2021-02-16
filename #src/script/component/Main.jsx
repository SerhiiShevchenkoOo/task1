import React, { useState, useEffect } from 'react';
import style from '@style/style.js';
import shuffle from '@utils/shuffle.js';

const fieldSizes = {
	beginner: {
		size: 81,
		mine: 10,
	},
	intermediate: {
		size: 255,
		mine: 40,
	},
	expert: {
		size: 899,
		mine: 99,
	},
};

const Cell = ({ cell, index, arr }) => {
	const [open, setOpen] = useState(false);
	const [check, setCheck] = useState(false);
	const [bg, setBg] = useState('bg-red-600');
	const [count, setCount] = useState(0);
	//add cell key----------------

	const coll = index % 9,
		row = (index - coll) / 9,
		top = row > 0,
		bottom = row < 8,
		left = coll > 0,
		right = coll < 8;
	cell.bg = 'bg-red-500';
	(cell.top = row > 0),
		(cell.bottom = row < 8),
		(cell.left = coll > 0),
		(cell.right = coll < 8);
	cell.coll = coll;
	cell.row = row;
	cell.open = open;
	cell.image = cell.mine && true;
	cell.check = check;

	cell.mineIndex = checkFieldPosition(
		top,
		bottom,
		right,
		left,
		9,
		arr,
		index,
		cell,
	);
	//-----------------------------

	//pointerEvent
	const openCell = (cell, arr, index) => {
		setOpen(true);
		if (cell.mine) {
			setBg('bg-red-100');
		} else {
			setBg('bg-blue-100');
		}
	};
	// check other cell------------------------

	//------------------------------------
	return (
		<button
			onPointerDown={() => openCell(cell, arr, index)}
			className={`h-8 w-8 ${bg} transition duration-500 `}>
			{!cell.open
				? ''
				: !cell.mine
				? cell.mineIndex > 0
					? cell.mineIndex
					: ''
				: cell.image}
		</button>
	);
};

const Main = props => {
	const [fieldSize, setFieldSize] = useState(fieldSizes.beginner.size);
	const arr = [],
		createField = arr => {
			for (let i = 0; i < fieldSize; i++) {
				let mine = i < 11;
				arr.push({
					mine: mine,
				});
			}
			shuffle(arr);
			return arr;
		};
	createField(arr);
	return (
		<div className=' grid-cols-9 gap-1 grid'>
			{arr.map((cell, index, arr) => {
				return (
					<div key={index}>
						<Cell cell={cell} index={index} arr={arr} />
					</div>
				);
			})}
		</div>
	);
};

function checkFieldPosition(
	top = false,
	bottom = false,
	right = false,
	left = false,
	cut = 9,
	arr,
	index,
	cell,
) {
	let count = 0;
	if (top) {
		arr[index - 9].mine && count++;
	}
	if (bottom) {
		arr[index + 9].mine && count++;
	}
	if (right) {
		arr[index + 1].mine && count++;
	}
	if (left) {
		arr[index - 1].mine && count++;
	}
	if (top && right) {
		arr[index - 9 + 1].mine && count++;
	}
	if (top && left) {
		arr[index - 9 - 1].mine && count++;
	}
	if (bottom && right) {
		arr[index + 9 + 1].mine && count++;
	}
	if (bottom && left) {
		arr[index + 9 - 1].mine && count++;
	}
	return count;
}

export default Main;
