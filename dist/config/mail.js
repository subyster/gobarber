"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'arthur.amaral1@gmail.com',
      name: 'Arthur Amaral'
    }
  }
};
exports.default = _default;