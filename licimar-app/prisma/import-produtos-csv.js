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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var csv_parse_1 = require("csv-parse");
var fs = require("fs/promises");
var prisma = new client_1.PrismaClient();
function importProdutosCsv() {
    return __awaiter(this, void 0, void 0, function () {
        var csvFilePath, csvFileContent;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    csvFilePath = 'prisma/produtos.csv';
                    return [4 /*yield*/, fs.readFile(csvFilePath, { encoding: 'utf8' })];
                case 1:
                    csvFileContent = _a.sent();
                    (0, csv_parse_1.parse)(csvFileContent, {
                        columns: true,
                        skip_empty_lines: true,
                        trim: true,
                        delimiter: ';',
                    }, function (err, records) { return __awaiter(_this, void 0, void 0, function () {
                        var _i, records_1, record, nome, marca, tipoNome, precoStr, estoqueStr, preco, estoque, tipoProduto, error_1;
                        var _a, _b, _c, _d, _e;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    if (!err) return [3 /*break*/, 2];
                                    console.error('Erro ao analisar o arquivo CSV:', err);
                                    return [4 /*yield*/, prisma.$disconnect()];
                                case 1:
                                    _f.sent();
                                    return [2 /*return*/];
                                case 2:
                                    _f.trys.push([2, 10, 11, 13]);
                                    _i = 0, records_1 = records;
                                    _f.label = 3;
                                case 3:
                                    if (!(_i < records_1.length)) return [3 /*break*/, 9];
                                    record = records_1[_i];
                                    nome = (_a = record['nome']) === null || _a === void 0 ? void 0 : _a.trim();
                                    marca = (_b = record['marca']) === null || _b === void 0 ? void 0 : _b.trim();
                                    tipoNome = (_c = record['tipo']) === null || _c === void 0 ? void 0 : _c.trim().toLowerCase();
                                    precoStr = (_d = record['preco']) === null || _d === void 0 ? void 0 : _d.trim();
                                    estoqueStr = (_e = record['estoque']) === null || _e === void 0 ? void 0 : _e.trim();
                                    preco = parseFloat(precoStr);
                                    estoque = estoqueStr ? parseInt(estoqueStr, 10) : null;
                                    return [4 /*yield*/, prisma.tiposProduto.findUnique({
                                            where: { nome: tipoNome },
                                        })];
                                case 4:
                                    tipoProduto = _f.sent();
                                    if (!!tipoProduto) return [3 /*break*/, 6];
                                    return [4 /*yield*/, prisma.tiposProduto.create({
                                            data: { nome: tipoNome },
                                        })];
                                case 5:
                                    tipoProduto = _f.sent();
                                    console.log("Tipo de produto criado: ".concat(tipoNome));
                                    _f.label = 6;
                                case 6: 
                                // Criar o produto com a referência correta
                                return [4 /*yield*/, prisma.produto.create({
                                        data: {
                                            nome: nome,
                                            marca: marca || null,
                                            preco: preco,
                                            estoque: estoque,
                                            tipo_produto_id: tipoProduto.id_tipos_produto,
                                        },
                                    })];
                                case 7:
                                    // Criar o produto com a referência correta
                                    _f.sent();
                                    console.log('Produto criado com sucesso:', nome);
                                    _f.label = 8;
                                case 8:
                                    _i++;
                                    return [3 /*break*/, 3];
                                case 9:
                                    console.log('Dados de produtos importados com sucesso do CSV!');
                                    return [3 /*break*/, 13];
                                case 10:
                                    error_1 = _f.sent();
                                    console.error('Erro ao inserir dados no banco de dados:', error_1);
                                    return [3 /*break*/, 13];
                                case 11: return [4 /*yield*/, prisma.$disconnect()];
                                case 12:
                                    _f.sent();
                                    return [7 /*endfinally*/];
                                case 13: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
importProdutosCsv()
    .then(function () { return console.log('Script de importação de produtos do CSV finalizado.'); })
    .catch(function (e) { return console.error(e); });
