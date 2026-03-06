"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectFood = void 0;
const emission_factors_1 = require("../constants/emission-factors");
const detectFood = (text) => {
    const items = [];
    if (/\b(vegetariano|vegano|vegetales|ensalada|verdura)\b/i.test(text)) {
        items.push({ label: 'Comida vegetariana', kgCo2: emission_factors_1.EMISSION_FACTORS.FOOD_VEGETARIAN });
    }
    if (/\b(pollo|ave|pechuga)\b/i.test(text)) {
        items.push({ label: 'Comida con pollo', kgCo2: emission_factors_1.EMISSION_FACTORS.FOOD_CHICKEN });
    }
    if (/\b(carne|res|cerdo|cordero|vacío|bife)\b/i.test(text)) {
        items.push({ label: 'Comida con carne (res/cerdo)', kgCo2: emission_factors_1.EMISSION_FACTORS.FOOD_MEAT });
    }
    return items;
};
exports.detectFood = detectFood;
//# sourceMappingURL=food.detector.js.map