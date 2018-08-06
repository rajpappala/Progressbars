/**
 * @jest-environment node
 */
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ActionGrid from "./Actiongrid";
import Button from "../UI/Button/Button";
import Listbox from "../UI/Listbox/Listbox";

configure({ adapter: new Adapter() });
describe("<ActionGrid/>", () => {
  it("Should Render <Button/> elements if service success", () => {
    const wrapper = shallow(<ActionGrid buttons={[1, 2]} bars={[1, 2, 3]} />);
    wrapper.setProps({ buttons: [1, 2], bars: [1, 2, 3] });
    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it("Should Render <Listbox/> elements if service success", () => {
    const wrapper = shallow(<ActionGrid buttons={[1, 2]} bars={[1, 2, 3]} />);
    wrapper.setProps({ buttons: [], bars: [1, 2, 3] });
    expect(wrapper.find(Listbox)).toHaveLength(1);
  });
});
