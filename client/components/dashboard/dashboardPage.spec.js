/* eslint-disable no-unused-vars */
import { mount, shallow } from "enzyme";
import TestUtils from "react-addons-test-utils";
import React from "react";
import DashboardPage from "./dashboardPage.jsx";

function setup() {
    return shallow(<DashboardPage />);
}

describe("<DashboardPage />", () => {

    // it("Home page includes a button with a text of 'Get started using your dashboard!'", () => {
    //     const wrapper = setup();

    //     let actual = wrapper.find(".mdl-button").children().get(0);
    //     let expected = "Get started using your dashboard!";

    //     expect(actual).toEqual(expected);

    // });

});