"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InjectModule_1 = __importDefault(require("../../decorators/InjectModule"));
const BController_1 = __importDefault(require("./BController"));
let AController = class AController {
    constructor() {
        console.info('A created');
    }
};
AController = __decorate([
    InjectModule_1.default({
        dependencies: [BController_1.default],
        method: 'get',
        path: '/hello'
    })
], AController);
exports.default = AController;
