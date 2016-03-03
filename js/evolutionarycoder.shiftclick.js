(function (global) {
    var ShiftClick            = function (parentSelector, colors, resetColor) {
        return new ShiftClick.init(parentSelector, colors, resetColor);
    };
    var colors,
        children,
        resetColor,
        isShiftDown           = false,
        defaultHighLightColor = "#dee0dd",
        attributes            = {
            selected: "data-ec-selected",
            order   : "data-ec-order"
        };


    var iterate  = function (array, callback) {
            for (var i = 0; i < array.length; i++) {
                callback(array[i]);
            }
        },
        swapAttr = function (el, attr, val) {
            el.setAttribute(attr, val);
        };


    var itemSelected = function (e) {
            var lastItemSelected,
                selectedItems = [];
            // get current item selected
            var isSelected = this.getAttribute(attributes.selected);

            // check if shift key is down
            if (isShiftDown) {
                // get the order number of the element
                var dataOrderPos = this.getAttribute(attributes.order);

                // iterate through all children and find all selected children
                // and push them to an array
                iterate(children, function (el) {
                    var selected = el.getAttribute(attributes.selected);
                    if (selected === "true") {
                        selectedItems.push(el);
                    }
                });
                // if there are children which were selected
                if (selectedItems.length > 0) {
                    // get the last selected child
                    lastItemSelected = selectedItems[selectedItems.length - 1];

                    // get the order number of last selected child
                    var lastItemOrderNum = lastItemSelected.getAttribute(attributes.order),
                        // turn the last selected number and the selected number to integers
                        lastOrderNum     = parseInt(lastItemOrderNum),
                        selectedOrderNum = parseInt(dataOrderPos);

                    // if the last selected item number is less then the selected number
                    // it means we are going from top to bottom
                    if (lastOrderNum < selectedOrderNum) {
                        // iterate through children swapping colors appropriately
                        iterate(children, function (el) {
                            // get the current item being iterated through position
                            var currentPos = parseInt(el.getAttribute(attributes.order));
                            // if the currentPosition is greater than or equal to the
                            // last order number it means the element is between the lastitem selected
                            // and the current one selected or within range

                            // if the currentPosition is lessthan or equal to the selected item
                            // it means the element is within range to be highlighted
                            if (currentPos >= lastOrderNum && currentPos <= selectedOrderNum) {
                                swapAttr(el, attributes.selected, "true");
                                el.style.backgroundColor = colors;
                            } else {
                                // else default to the base color
                                el.style.backgroundColor = resetColor;
                                swapAttr(el, attributes.selected, "false");
                            }
                        });


                        // if the last selected item number is greater then the selected number
                        // it means we are going from bottom to top
                    } else if (lastOrderNum > selectedOrderNum) {

                        // iterate through children swapping colors appropriately
                        iterate(children, function (el) {
                            // get the current item being iterated through position
                            var currentPos = parseInt(el.getAttribute(attributes.order));
                            // if the current position is less than or equal to the last item selected
                            // it means the currentelement is with in range

                            // if the current position is greater than or equal to the selectedNum
                            // it means we are in range
                            if (currentPos <= lastOrderNum && currentPos >= selectedOrderNum) {
                                swapAttr(el, attributes.selected, "true");
                                el.style.backgroundColor = colors;
                            } else {
                                // else default to the base color
                                el.style.backgroundColor = resetColor;
                                swapAttr(el, attributes.selected, "false");
                            }
                        });
                    }
                }

            } else {
                // highlight selected element accordingly
                if (isSelected === "true") {
                    this.style.backgroundColor = resetColor;
                    swapAttr(this, attributes.selected, "false");
                } else {
                    this.style.backgroundColor = colors;
                    swapAttr(this, attributes.selected, "true");
                }
            }
        },
        keyDown      = function (e) {
            // shift key pressed
            if (e.keyCode === 16) {
                isShiftDown = true;
            }
        },
        keyUp        = function (e) {
            // shift key pressed
            if (e.keyCode === 16) {
                isShiftDown = false;
            }
        };

    ShiftClick.prototype = {
        reset: function () {
            iterate(children, function (el) {
                el.style.backgroundColor = resetColor;
                swapAttr(el, attributes.selected, false);
            });
        }
    };

    ShiftClick.init = function (parentSelector, colorsToUse, resetcolor) {
        var self      = this;
        this.parent   = document.querySelector(parentSelector);
        this.children = [];

        children = this.parent.children;
        iterate(children, function (el) {
            self.children.push(el);
        });

        iterate(this.children, function (el) {
            el.addEventListener("click", itemSelected, false);
        });

        // add keydown and keyup event listener
        document.addEventListener("keydown", keyDown, false);
        document.addEventListener("keyup", keyUp, false);

        // Colors
        // highlight
        colors = (colorsToUse) ? colorsToUse : defaultHighLightColor;
        // unhighlight
        resetColor = (resetcolor) ? resetcolor : "#eee";
    };

    ShiftClick.init.prototype = ShiftClick.prototype;

    global.ShiftClick = ShiftClick;
})(window);