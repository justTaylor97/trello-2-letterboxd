"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var trello = __importStar(require("./utils/trello"));
var inquirer_1 = __importDefault(require("inquirer"));
// TODO: get trello board
// TODO: iterate over board lists, ask if convert or not (maybe convert mode? Log vs watchlist)
var trelloAPIToken = "bba78b5730770b99673f5aee249425b1e409d77849baf3afb03dec203ae27fd4";
var trelloAPIKey = "2f024004d590ddf687f7bd40d1ab1e7d";
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var myBoards, boardId, boardLists, listsToScrape, _i, listsToScrape_1, list, listAction, cardOverride, cards, _a, cards_1, card, action, cardAction;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, trello.getMyBoards({
                    fields: ["id", "name"],
                    apiKey: trelloAPIKey,
                    apiToken: trelloAPIToken,
                })];
            case 1:
                myBoards = (_b.sent()).data;
                return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: "list",
                            name: "boardId",
                            message: "What board would you like to scrape?",
                            choices: myBoards.map(function (board) {
                                return {
                                    name: board.name,
                                    value: board.id,
                                };
                            }),
                        },
                    ])];
            case 2:
                boardId = (_b.sent()).boardId;
                return [4 /*yield*/, trello.getBoardLists({
                        apiKey: trelloAPIKey,
                        apiToken: trelloAPIToken,
                        boardId: boardId,
                    })];
            case 3:
                boardLists = (_b.sent()).data;
                return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: "checkbox",
                            name: "listsToScrape",
                            message: "What lists would you like to scrape?",
                            choices: boardLists.map(function (list) {
                                return { name: list.name, value: list, checked: false };
                            }),
                        },
                    ])];
            case 4:
                listsToScrape = (_b.sent()).listsToScrape;
                console.log(listsToScrape);
                _i = 0, listsToScrape_1 = listsToScrape;
                _b.label = 5;
            case 5:
                if (!(_i < listsToScrape_1.length)) return [3 /*break*/, 14];
                list = listsToScrape_1[_i];
                return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: "expand",
                            name: "listAction",
                            message: "What would you like to do with ".concat(list.name, "?"),
                            choices: [
                                {
                                    key: "w",
                                    name: "Add the films in the list to your watchlist",
                                    value: "watchlist",
                                },
                                {
                                    key: "l",
                                    name: "Log the films in the list",
                                    value: "log",
                                },
                            ],
                        },
                    ])];
            case 6:
                listAction = (_b.sent()).listAction;
                return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: "confirm",
                            name: "cardOverride",
                            message: "Do you want to manually override any films in the list?",
                            default: false,
                        },
                    ])];
            case 7:
                cardOverride = (_b.sent()).cardOverride;
                return [4 /*yield*/, trello.getCardsInList({
                        apiKey: trelloAPIKey,
                        apiToken: trelloAPIToken,
                        listId: list.id,
                    })];
            case 8:
                cards = (_b.sent()).data;
                _a = 0, cards_1 = cards;
                _b.label = 9;
            case 9:
                if (!(_a < cards_1.length)) return [3 /*break*/, 13];
                card = cards_1[_a];
                action = listAction;
                if (!cardOverride) return [3 /*break*/, 11];
                return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: "expand",
                            name: "cardAction",
                            message: "What would you like to do with ".concat(card.name, "?"),
                            choices: [
                                {
                                    key: "w",
                                    name: "Add the film to your watchlist",
                                    value: "watchlist",
                                },
                                {
                                    key: "l",
                                    name: "Log the film",
                                    value: "log",
                                },
                            ],
                        },
                    ])];
            case 10:
                cardAction = (_b.sent()).cardAction;
                action = cardAction;
                _b.label = 11;
            case 11:
                switch (action) {
                    case "watchlist":
                    // TODO: helper function watchlist card
                    case "log":
                    default:
                        console.log(action, card.name);
                        // TODO: helper function log card
                        break;
                }
                _b.label = 12;
            case 12:
                _a++;
                return [3 /*break*/, 9];
            case 13:
                _i++;
                return [3 /*break*/, 5];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.main = main;
(0, exports.main)();
