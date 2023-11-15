"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudModel = void 0;
class CrudModel {
    constructor(model) {
        this.model = model;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.create(data);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this.model.findByIdAndUpdate(id, data, { new: true });
            return document ? document : null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.deleteOne({ _id: id });
            return result.deletedCount === 1;
        });
    }
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.find(query);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findById(id);
        });
    }
    findBy(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findOne(filter);
        });
    }
    findAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.find(filter || {});
        });
    }
}
exports.CrudModel = CrudModel;
