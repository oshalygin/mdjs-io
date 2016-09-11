import itemController from "./itemController";
import expect from "expect";

describe("item Controller", () => {

    it("status of 200 is returned when a successful get is made", () => {
        const expected = 200;
        const dataAccessMock = {
            getAllItems: function (query, callback) {
                const item = {
                    type: "Mexican"
                };
                callback(null, item);
            }
        };

        let sut = itemController(dataAccessMock);

        let request = {
            body: {
                type: "Mexican"
            }
        };
        let response = {
            status: function (statusCode) {
                expect(statusCode).toEqual(expected);
                return this;
            },
            json: function () { }
        };

        sut.get(request, response);

    });
});