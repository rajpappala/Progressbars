/**
 * @jest-environment node
 */
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Progressbars from "./Progressbars";
import Progressbar from "../components/Progressbar/Progressbar";
import Actiongrid from "../components/Actiongrid/Actiongrid";

configure({ adapter: new Adapter() });
describe("<Progressbars/>", () => {
  it("Should Render <Progressbar/> elements if service success", () => {
    const wrapper = shallow(<Progressbars />);
    wrapper.setState({
      buttons: [1, 2],
      bars: [1, 2, 3],
      limit: 0,
      servicestatuscode: 0
    });
    expect(wrapper.find(Progressbar)).toHaveLength(3);
  });

  it("Should Render <Actiongrid/> elements if service success", () => {
    const wrapper = shallow(<Progressbars />);
    wrapper.setState({
      buttons: [1, 2],
      bars: [1, 2, 3],
      limit: 0,
      servicestatuscode: 0
    });
    expect(wrapper.find(Actiongrid)).toHaveLength(1);
  });
});
