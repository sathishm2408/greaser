import productReducer from '../../reducers/products';
import * as constants from '../../constants/constants';

describe('test product reducers',()=>{
    let defaultState;

    beforeEach(() => {
        defaultState = [{
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
    });

    it('should return the initial state', () => {
        expect(productReducer(undefined, [])).toEqual({});
    });

    it('should get ALLPRODUCTS_SUCCESS', () => {
        let action = {};
        action.type = constants.ALLPRODUCTS_SUCCESS;
        action.productData = defaultState;
        expect(productReducer([], action)).toStrictEqual({"productData":defaultState});
    });

    it('should get exact number of products from ALLPRODUCTS_SUCCESS', () => {
        let action = {};
        action.type = constants.ALLPRODUCTS_SUCCESS;
        action.productData = defaultState;
        expect(productReducer([], action).productData).toHaveLength(1);
    });
})
