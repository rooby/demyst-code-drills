"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
require("@testing-library/jest-dom/jest-globals");
var useQuery = globals_1.jest.fn();
module.exports = {
    useQuery: useQuery,
};
