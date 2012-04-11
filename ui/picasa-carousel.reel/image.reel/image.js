var Montage = require("montage").Montage,
    Component = require("ui/component").Component;

var Image = exports.Image = Montage.create(Component, {

    _src: {value: null},

    src: {
        set: function(value) {
            if (value) { // added this line as changing indexMap was sending undefined urls
                this._src = value;
                this.needsDraw = true;
            }
        }
    },

    draw: {
        value: function() {
            this._element.style.backgroundImage = "url(" + this._src + ")";
        }
    }
});
