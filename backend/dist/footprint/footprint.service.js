"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FootprintService = void 0;
const common_1 = require("@nestjs/common");
const detectors_1 = require("./detectors");
let FootprintService = class FootprintService {
    calculateFromDescription(description) {
        const text = description.toLowerCase().trim();
        const breakdown = [];
        for (const detect of detectors_1.ACTIVITY_DETECTORS) {
            const items = detect(text);
            for (const item of items) {
                breakdown.push({ label: item.label, kgCo2: this.round(item.kgCo2) });
            }
        }
        const totalKgCo2 = this.round(breakdown.reduce((sum, item) => sum + item.kgCo2, 0));
        return { totalKgCo2, breakdown };
    }
    round(n) {
        return Math.round(n * 100) / 100;
    }
};
exports.FootprintService = FootprintService;
exports.FootprintService = FootprintService = __decorate([
    (0, common_1.Injectable)()
], FootprintService);
//# sourceMappingURL=footprint.service.js.map