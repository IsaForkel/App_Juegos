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
exports.gamesController = void 0;
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM games', function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT * FROM games WHERE id = " + req.params.id;
            yield database_1.default.query(sql, function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result[0]);
                }
                else {
                    res.status(404).json('Juego No Encontrado');
                }
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO games (title, description, image) VALUES (' + '"' + req.body['title'] + '","' + req.body['description'] + '","' + req.body['image'] + '")', function (err, result, fields) {
                if (err)
                    throw err;
                res.json('Game Saved');
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "DELETE FROM games WHERE id = " + req.params.id;
            yield database_1.default.query(sql, function (err, result, fields) {
                if (err)
                    throw err;
                res.json({ message: "El juego fue eliminado" });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE games SET title = ' + '"' + req.body['title'] + '"' + ', description =' + '"' + req.body['description'] + '"' + ' , image = ' + '"' + req.body['image'] + '"' + 'WHERE id =' + req.params.id, function (err, result, fields) {
                if (err)
                    throw err;
                res.json('Juego Actualizado');
            });
        });
    }
}
exports.gamesController = new GamesController();
