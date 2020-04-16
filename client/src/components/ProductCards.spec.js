import React from 'react';
import { shallow, mount, render } from 'enzyme';
//import { Item } from 'react-bootstrap/lib/Breadcrumb';

import ProductCards from './ProductCards.js'

describe('test productCards component',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<ProductCards />)
    });

    afterEach(()=>{
        wrapper.unmount();
    });

    it.todo('should snapshot the productCards')
})