"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFiveStarRating = void 0;
var isFiveStarRating = function (rating) {
    var something = typeof rating === "number";
    something = something && rating <= 5 && rating >= 0.5;
    something = something && rating % 0.5 === 0;
    return something;
};
exports.isFiveStarRating = isFiveStarRating;
