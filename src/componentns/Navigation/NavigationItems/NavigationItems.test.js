import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import NavigationItems from "./NavigationItems"
import NavigationItem from "./NavigationItem/NavigationItem"

configure({adapter: new Adapter()})

describe('<NavigationItems/>', () => {
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<NavigationItems/>);
    })

    it('If not authenticated should render two NavigationItems', () => {
        //const wrapper = shallow(<NavigationItems/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('If  authenticated should render three NavigationItems', () => {
         //wrapper = shallow(<NavigationItems auth/>);
        wrapper.setProps({auth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('Should render NavigationItem Logout if Authenticated ', () => {
        wrapper.setProps({auth: true});
        expect(wrapper.contains(<NavigationItem link={'/logout'}>Logout</NavigationItem>)).toEqual(true);
    });
})