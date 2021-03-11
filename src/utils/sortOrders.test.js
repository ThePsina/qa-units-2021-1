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
	it('right type returns date', () => {
		expect(getSortFunction('date')).toBe(sortByDate);
	})

	it('right type returns count', () => {
		expect(getSortFunction('count')).toBe(sortByItemCount);
	})
});

describe('sortByDate function', () => {
	it('dates equal', () => {
		const order1 = {
			date: 1552481120000,
		};
		const order2 = {
			date: 1552481120000,
		};

		expect(sortByDate(order1, order2)).toBe(0);
	})

	it('left lesser than right date', () => {
		const order1 = {
			date: 155248112000,
		};
		const order2 = {
			date: 1552481120000,
		};

		expect(sortByDate(order1, order2)).toBe(1);
	})

	it('left greater than right date', () => {
		const order1 = {
			date: 155248112000,
		};
		const order2 = {
			date: 1552481000,
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
});

describe('sortOrders function', () => {
	it('call sort func', () => {
		const orders = [
			{items: ['item1', 'item2']},
			{items: ['item1', "item2", "item3"]}
		];

		const func = jest.fn()
		sortOrders(orders, func)
		expect(func).toHaveBeenCalled();
	})

	it('not call sort func', () => {
		const orders = [];

		const func = jest.fn()
		sortOrders(orders, func)
		expect(func).not.toHaveBeenCalled();
	})
});