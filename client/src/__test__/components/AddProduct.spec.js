import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import {AddProduct} from '../../components/AddProduct.js';

describe('test productCards component',()=>{
    let wrapper;
   // let state;
    beforeEach(()=>{
        // state ={
        //     category: "Tshirt"
        // }
        wrapper = shallow(<AddProduct />)
    });

    afterEach(()=>{
        wrapper.unmount();
    });

    it('should not crash AddProduct',()=>{
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it('input fileds in AddProduct',()=>{
        expect(wrapper.find('input').length).toEqual(5);
    })

    it('Input fileds in AddProduct',()=>{
        expect(wrapper.find('Input').length).toEqual(7);
    })

    it('Dropdown fileds in AddProduct without tshirt',()=>{
        expect(wrapper.find('Dropdown').length).toEqual(2);
    })

})