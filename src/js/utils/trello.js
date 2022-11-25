"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyBoards = void 0;
var axios_1 = __importDefault(require("axios"));
var trelloApi = axios_1.default.create({
    baseURL: "https://api.trello.com/1/",
});
// TODO: create test for this
var getMyBoards = function (_a) {
    var fields = _a.fields, apiKey = _a.apiKey, apiToken = _a.apiToken;
    var fieldsString = fields.join(",");
    return trelloApi.get("members/me/boards?fields=".concat(fieldsString, "&key=").concat(apiKey, "&token=").concat(apiToken));
};
exports.getMyBoards = getMyBoards;
