import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {fakeOrders} from "../data/fakeOrders";
import Order from './Order'

jest.mock('../utils/getDate');
/* eslint-disable import/first */
import {getDate} from '../utils/getDate';

configure({adapter: new Adapter()});

describe('Order.js', () => {
    beforeEach(() => {
        getDate.mockReturnValue('hello from GoLang');
    })

    afterEach(() => {
        jest.resetModules()
    })

    it('right render', () => {
        const wrapper = shallow(<Order
            order={{shop: 'shop', date: 1234567890}}
        />);

        expect(wrapper).toMatchSnapshot();
    });

    it('render without order', () => {
        const wrapper = shallow(<Order/>);
        expect(wrapper).toMatchSnapshot();
    })

    it('render without items', () => {
        const wrapper = shallow(<Order order={
            {
                id: 228,
                date: 1234567891,
                shop: 'Alihandro Express',
            }
        }/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('render without shop', () => {
        const wrapper = shallow(<Order order={
            {
                id: 69,
                date: 1234567891,
                items: ['item1', 'item2']
            }
        }/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('all in input', () => {
        const wrapper = shallow(<Order order={
            {
                shop: 'shop',
                id: 69,
                date: 1234567891,
                items: ['item1', 'item2']
            }
        }/>);
        expect(wrapper).toMatchSnapshot();
    });
});
