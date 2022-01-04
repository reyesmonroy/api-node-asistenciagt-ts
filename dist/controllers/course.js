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
exports.activateCourse = exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourses = void 0;
const course_1 = __importDefault(require("../models/course"));
const gradeCourse_1 = __importDefault(require("../models/gradeCourse"));
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const courses = yield gradeCourse_1.default.findAll({
            where: {
                id_user: id
            }
        });
        res.status(200).json({
            data: courses,
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
exports.getCourses = getCourses;
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_1.default.create(req.body);
        res.status(201).json({
            data: course,
            code: 201
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo crear el Curso.'
        });
        console.log(error);
    }
});
exports.createCourse = createCourse;
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield course_1.default.findByPk(id);
        if (!course) {
            res.status(404).json({
                error: `No existe un Curso con el id ${id}`
            });
        }
        yield (course === null || course === void 0 ? void 0 : course.update(req.body));
        res.status(200).json({
            data: course,
            code: 200
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo actualizar el Curso.'
        });
        console.log(error);
    }
});
exports.updateCourse = updateCourse;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const course = yield course_1.default.findByPk(id);
        if (!course) {
            res.status(404).json({
                error: `No existe el Curso con el id ${id}`
            });
        }
        yield (course === null || course === void 0 ? void 0 : course.update({ status: status }));
        res.status(200).json({
            data: course,
            code: 200
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo eliminar el Curso.'
        });
        console.log(error);
    }
});
exports.deleteCourse = deleteCourse;
const activateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const course = yield course_1.default.findByPk(id);
        if (!course) {
            res.status(404).json({
                error: `No existe el Curso con el id ${id}`
            });
        }
        yield (course === null || course === void 0 ? void 0 : course.update({ status: status }));
        res.status(200).json({
            data: course,
            code: 200
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo activar el Curso.'
        });
        console.log(error);
    }
});
exports.activateCourse = activateCourse;
//# sourceMappingURL=course.js.map