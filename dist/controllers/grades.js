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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateGrade = exports.deleteGrade = exports.updateGrade = exports.createGrade = exports.getGradesSelect = exports.getGrades = void 0;
const grade_1 = __importDefault(require("../models/grade"));
const gradeSelect_1 = __importDefault(require("../models/gradeSelect"));
const gradeUser_1 = __importDefault(require("../models/gradeUser"));
const getGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const grades = yield grade_1.default.findAll({
            include: {
                model: gradeUser_1.default,
                required: true,
                as: 'GradeUser',
                where: {
                    id_user: id
                }
            }
        });
        res.status(200).json({
            data: grades,
            code: 200
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo cargar los datos'
        });
        console.log(error);
    }
});
exports.getGrades = getGrades;
const getGradesSelect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const grades = yield gradeSelect_1.default.findAll({
            where: {
                id_user: id
            }
        });
        res.status(200).json({
            data: grades,
            code: 200
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo cargar los datos'
        });
        console.log(error);
    }
});
exports.getGradesSelect = getGradesSelect;
const createGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grade = yield grade_1.default.create(req.body);
        const gradeUser = yield gradeUser_1.default.create({
            id_grade: grade.id,
            id_user: req.body.userId,
            permission: 'PROPIETARIO'
        });
        res.status(201).json({
            data: grade,
            code: 201
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo crear el Grado.'
        });
        console.log(error);
    }
});
exports.createGrade = createGrade;
const updateGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const grade = yield grade_1.default.findByPk(id);
        if (!grade) {
            res.status(404).json({
                error: `No existe un Grado con el id ${id}`
            });
        }
        yield (grade === null || grade === void 0 ? void 0 : grade.update(req.body));
        res.status(200).json({
            data: grade,
            code: 200
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo actualizar el grado.'
        });
        console.log(error);
    }
});
exports.updateGrade = updateGrade;
const deleteGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const grade = yield grade_1.default.findByPk(id);
        if (!grade) {
            res.status(404).json({
                error: `No existe el Grado con el id ${id}`
            });
        }
        yield (grade === null || grade === void 0 ? void 0 : grade.update({ status: status }));
        res.status(200).json({
            data: grade,
            code: 200
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo eliminar el Grado.'
        });
        console.log(error);
    }
});
exports.deleteGrade = deleteGrade;
const activateGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const grade = yield grade_1.default.findByPk(id);
        if (!grade) {
            res.status(404).json({
                error: `No existe el Grado con el id ${id}`
            });
        }
        yield (grade === null || grade === void 0 ? void 0 : grade.update({ status: status }));
        res.status(200).json({
            data: grade,
            code: 200
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo activar el Grado.'
        });
        console.log(error);
    }
});
exports.activateGrade = activateGrade;
//# sourceMappingURL=grades.js.map