import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();

import {AdminHome} from '../../components/AdminHome.js';

describe('test AdminHome component', () => {
    let wrapper;
    let props;
    const initialState = {
        products:{
            deletedData: null
        }
    }
    const store = mockStore(initialState);
    beforeEach(() => {
        props = {
            allProducts: [{
                images: ["uploads/1585658943466/8-5.jpg", "uploads/1585658943466/8-6.jpg", "uploads/1585658943466/8-7.jpg"],
                viewed: "8",
                ordered: 0,
                _id: 1585658943466,
                productName: "blue tshirt",
                description: "Blue tshirt",
                gender: "male",
                category: "tshirt",
                sleeveType: "",
                neckType: "",
                manufacturer: "thuret",
                salesPrice: 599,
                MRP: 999,
                manufactureCost: 399,
                quantity: 2500,
                creator: "5e833bc9df3fd45e806e3597",
                updates: []
            },
            {
                images: ["uploads/1585658943466/8-5.jpg", "uploads/1585658943466/8-6.jpg", "uploads/1585658943466/8-7.jpg"],
                viewed: "8",
                ordered: 0,
                _id: 1585658943463,
                productName: "red tshirt",
                description: "Red tshirt",
                gender: "male",
                category: "tshirt",
                sleeveType: "",
                neckType: "",
                manufacturer: "thuret",
                salesPrice: 599,
                MRP: 999,
                manufactureCost: 399,
                quantity: 2500,
                creator: "5e833bc9df3fd45e806e3597",
                updates: []
            }]
        }
        wrapper = mount(<Provider store={store}>
            <AdminHome {...props}/>
            </Provider>)
    });

    it('should return exact cards', () => {
        expect(wrapper.find('ProductCards').length).toEqual(2);
    });

});