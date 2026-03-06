"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FootprintApiController = exports.FootprintController = void 0;
const common_1 = require("@nestjs/common");
const footprint_service_1 = require("./footprint.service");
const calculate_footprint_dto_1 = require("./dto/calculate-footprint.dto");
const footprint_response_dto_1 = require("./dto/footprint-response.dto");
let FootprintController = class FootprintController {
    constructor(footprintService) {
        this.footprintService = footprintService;
    }
    calculate(dto) {
        const { totalKgCo2, breakdown } = this.footprintService.calculateFromDescription(dto.description);
        return new footprint_response_dto_1.FootprintResponseDto(totalKgCo2, breakdown);
    }
};
exports.FootprintController = FootprintController;
__decorate([
    (0, common_1.Post)('calculate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calculate_footprint_dto_1.CalculateFootprintDto]),
    __metadata("design:returntype", footprint_response_dto_1.FootprintResponseDto)
], FootprintController.prototype, "calculate", null);
exports.FootprintController = FootprintController = __decorate([
    (0, common_1.Controller)('footprint'),
    __metadata("design:paramtypes", [footprint_service_1.FootprintService])
], FootprintController);
let FootprintApiController = class FootprintApiController {
    constructor(footprintService) {
        this.footprintService = footprintService;
    }
    calculate(dto) {
        const { totalKgCo2, breakdown } = this.footprintService.calculateFromDescription(dto.description);
        return new footprint_response_dto_1.FootprintResponseDto(totalKgCo2, breakdown);
    }
};
exports.FootprintApiController = FootprintApiController;
__decorate([
    (0, common_1.Post)('calculate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calculate_footprint_dto_1.CalculateFootprintDto]),
    __metadata("design:returntype", footprint_response_dto_1.FootprintResponseDto)
], FootprintApiController.prototype, "calculate", null);
exports.FootprintApiController = FootprintApiController = __decorate([
    (0, common_1.Controller)('api/footprint'),
    __metadata("design:paramtypes", [footprint_service_1.FootprintService])
], FootprintApiController);
//# sourceMappingURL=footprint.controller.js.map