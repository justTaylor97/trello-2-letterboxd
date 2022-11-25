"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
var axios_1 = __importDefault(require("axios"));
var letterboxdApi = axios_1.default.create({
    baseURL: "https://api.letterboxd.com/api/v0/",
});
// TODO: create test for this
var getToken = function (request) {
    return letterboxdApi.post("/auth/token", request, {});
};
exports.getToken = getToken;
var LetterboxdAPI = /** @class */ (function () {
    function LetterboxdAPI(_a) {
        var username = _a.username, password = _a.password;
        // TODO: generate token with username and password
    }
    LetterboxdAPI.prototype.logFilm = function (review) { };
    return LetterboxdAPI;
}());
exports.default = LetterboxdAPI;
