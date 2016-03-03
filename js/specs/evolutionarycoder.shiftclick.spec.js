/**
 * Created by evolutionarycoder on 3/2/16.
 */
describe("ShiftClick Class", function () {
    it("should exist with in the global scope", function () {
        expect(window.ShiftClick).toBe(ShiftClick);
    });

    it("should have a reference to an element", function () {
        var selector = "#parent";
        expect(ShiftClick(selector).parent).toBe(document.querySelector(selector));
    });

    it("should have a total of 3 children", function () {
        var selector = "#parent";
        expect(ShiftClick(selector).children.length).toBe(3) ;
    })
});