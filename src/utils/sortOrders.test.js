import React from 'react'
import {sortByItemCount, getSortFunction, sortByDate, sortOrders, sortTypes} from './sortOrders';


describe('sortByItemCount function', () => {
	it('orders are null', () => {
		const result = sortByItemCount(null, null);
		expect(result).toEqual(0);
	});

	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};
		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('left item lesser than right', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};
		const order2 = {
			items: ['1', '2', '3'],
		};

		expect(sortByItemCount(order1, order2)).toBe(-1);
	})

	it('left item greater than right', () => {
		const order1 = {
			items: ['item1', 'item2', 'item3'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		expect(sortByItemCount(order1, order2)).toBe(1);
	})

	it('not an objects', () => {
		expect(sortByItemCount([], [])).toBe(0);
	})

	it('without args', () => {
		expect(sortByItemCount()).toBe(0);
	})

	it('without items', () => {
		expect(sortByItemCount({}, {items: []})).toBe(0);
	})
});

describe('getSortFunction function', () => {
	it('right func returns: date', () => {
		expect(getSortFunction('date')).toBe(sortByDate);
	})

	it('right func returns: count', () => {
		expect(getSortFunction('count')).toBe(sortByItemCount);
	})

	it('no type', () => {
		expect(getSortFunction(null)).toBeUndefined();
	});
});

describe('sortByDate function', () => {
	it('dates equal', () => {
		const order1 = {
			date: 1,
		};
		const order2 = {
			date: 1,
		};

		expect(sortByDate(order1, order2)).toBe(0);
	})

	it('left lesser than right date', () => {
		const order1 = {
			date: 1,
		};
		const order2 = {
			date: 2,
		};

		expect(sortByDate(order1, order2)).toBe(1);
	})

	it('left greater than right date', () => {
		const order1 = {
			date: 2,
		};
		const order2 = {
			date: 1,
		};

		expect(sortByDate(order1, order2)).toBe(-1);
	})

	it('not an objects in date sort', () => {
		expect(sortByDate([], [])).toBe(0);
	})

	it('no args in date sort', () => {
		expect(sortByDate()).toBe(0);
	})

	it('no date args in date sort', () => {
		expect(sortByDate({}, {date: 1})).toBe(0);
	})

	it('null in orders', () => {
		expect(sortByDate(null, null)).toBe(0);
	})
});

describe('sortOrders function', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	let func
	beforeEach(() => {
		func = jest.fn();
	});

	it('call sort func', () => {
		const orders = [
			{items: ['item1', 'item2']},
			{items: ['item1', "item2", "item3"]}
		];

		sortOrders(orders, func);
		expect(func).toHaveBeenCalled();
	})

	it('not call sort func', () => {
		sortOrders([], func);
		expect(func).not.toHaveBeenCalled();
	})

	it('null args', () => {
		expect(sortOrders(null, func)).toBeUndefined();
	})

	it('sortFunction is not a function', () => {
		const orders = [
			{items: ['item1', 'item2']},
			{items: ['item1', "item2", "item3"]}
		];

		const result = sortOrders(orders, 1);
		expect(result).toBeUndefined();
	});
});