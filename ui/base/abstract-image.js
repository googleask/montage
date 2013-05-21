/*global require, exports*/

/**
 @module montage/ui/base/abstract-image.reel
 */
var Montage = require("montage").Montage,
    Component = require("ui/component").Component;

/**
 * @class AbstractImage
 * @extends Component
 */
var AbstractImage = exports.AbstractImage = Montage.create(Component, /** @lends AbstractImage# */ {

    /**
     * @private
     */
    create: {
        value: function() {
            if(this === AbstractImage) {
                throw new Error("AbstractImage cannot be instantiated.");
            } else {
                return Component.create.apply(this, arguments);
            }
        }
    },

    // http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever
    emptyImageSrc: {
        value: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
    },

    _isLoadingImage: {
        value: false
    },

    _image: {
        value: null
    },

    _src: {
        value: null
    },

    src: {
        set: function(value) {
            if (this._src !== value) {
                this._src = value;
                this._isLoadingImage = true;
                this._image.src = value;
                this.needsDraw = true;
            }
        },
        get: function() {
            return this._src;
        }
    },

    width: {
        value: null
    },

    height: {
        value: null
    },

    _textAlternative: {
        value: null
    },

    textAlternative: {
        set: function(value) {
            this._textAlternative = value;
            this.needsDraw = true;
        },
        get: function() {
            return this._textAlternative;
        }
    },

    /**
     * @private
     */
    didCreate: {
        value: function() {
            Component.didCreate.call(this); // super
            this._image = new Image();
            this._image.onload = this.handleImageLoad.bind(this);
        }
    },

    enterDocument: {
        value: function(firstTime) {
            if (firstTime) {
                this.element.setAttribute("role", "img");
            }
        }
    },

    draw: {
        value: function() {
            if (this._isLoadingImage) {
                this.element.src = this.emptyImageSrc;
            } else {
                this.element.src = this._src;
            }
            this.element.setAttribute("aria-label", this._textAlternative);
        }
    },

    handleImageLoad: {
        value: function() {
            this._isLoadingImage = false;
            this.needsDraw = true;
        }
    }
});