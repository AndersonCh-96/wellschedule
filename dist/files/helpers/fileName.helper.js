"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileName = void 0;
const uuid_1 = require("uuid");
const fileName = (req, file, callback) => {
    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
    callback(null, fileName);
};
exports.fileName = fileName;
//# sourceMappingURL=fileName.helper.js.map