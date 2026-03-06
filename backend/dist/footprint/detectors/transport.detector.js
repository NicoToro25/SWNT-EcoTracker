"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectTransport = void 0;
const emission_factors_1 = require("../constants/emission-factors");
function parseKm(s) {
    return parseFloat(s.replace(',', '.')) || 0;
}
function sumKm(text, pattern) {
    let sum = 0;
    const re = new RegExp(pattern.source, pattern.flags);
    let m;
    while ((m = re.exec(text)) !== null)
        sum += parseKm(m[1]);
    return sum;
}
function round(n) {
    return Math.round(n * 100) / 100;
}
const detectTransport = (text) => {
    const items = [];
    let busKm = sumKm(text, /(\d+(?:[.,]\d+)?)\s*km\s*(?:en\s*)?(?:bus|autobús|autobus|colectivo|transporte\s*público)/gi);
    if (busKm === 0)
        busKm = sumKm(text, /(?:tomé|tomar|agarré|tomando)\s*(?:el\s*)?(?:bus|autobús|autobus|colectivo)\s*[^\d]*?(\d+(?:[.,]\d+)?)\s*km/gi);
    if (busKm === 0)
        busKm = sumKm(text, /(\d+(?:[.,]\d+)?)\s*km\s*(?:en\s*)?(?:tomando\s*)?(?:el\s*)?(?:bus|autobús|autobus)/gi);
    if (busKm > 0) {
        items.push({
            label: `Transporte en bus (${busKm} km)`,
            kgCo2: round(busKm * emission_factors_1.EMISSION_FACTORS.TRANSPORT_BUS),
        });
    }
    let carKm = sumKm(text, /(\d+(?:[.,]\d+)?)\s*km\s*(?:en\s*)?(?:carro|coche|auto|automóvil|automovil|camión|camion)/gi);
    if (carKm === 0)
        carKm = sumKm(text, /(?:manejé|manejar|manejo|conduje|conducir|manejando)\s*[^\d]*?(\d+(?:[.,]\d+)?)\s*km/gi);
    if (carKm === 0)
        carKm = sumKm(text, /(\d+(?:[.,]\d+)?)\s*km\s*(?:manejando|en\s*carro)/gi);
    if (carKm > 0) {
        items.push({
            label: `Transporte en carro (${carKm} km)`,
            kgCo2: round(carKm * emission_factors_1.EMISSION_FACTORS.TRANSPORT_CAR),
        });
    }
    let planeKm = sumKm(text, /(\d+(?:[.,]\d+)?)\s*km\s*(?:en\s*)?(?:avión|avion|vuelo)/gi);
    if (planeKm === 0)
        planeKm = sumKm(text, /(?:avión|avion|vuelo)\s*[^\d]*?(\d+(?:[.,]\d+)?)\s*km/gi);
    if (planeKm === 0)
        planeKm = sumKm(text, /(?:volé|volar|volamos|volando)\s*[^\d]*?(\d+(?:[.,]\d+)?)\s*km/gi);
    if (planeKm === 0)
        planeKm = sumKm(text, /(\d+(?:[.,]\d+)?)\s*km\s*(?:volando|en\s*avión)/gi);
    if (planeKm > 0) {
        items.push({
            label: `Viaje en avión (${planeKm} km)`,
            kgCo2: round(planeKm * emission_factors_1.EMISSION_FACTORS.TRANSPORT_PLANE),
        });
    }
    if (planeKm === 0 && /\b(avión|avion|vuelo|volé|volar|volamos)\b/i.test(text)) {
        items.push({ label: 'Viaje en avión (sin km indicados)', kgCo2: 0 });
    }
    const bikeKm = sumKm(text, /(\d+(?:[.,]\d+)?)\s*km\s*(?:en\s*)?(?:bici|bicicleta)/gi);
    if (bikeKm > 0 || /\b(bici|bicicleta)\b/i.test(text)) {
        items.push({
            label: bikeKm > 0 ? `Bicicleta (${bikeKm} km)` : 'Bicicleta',
            kgCo2: emission_factors_1.EMISSION_FACTORS.TRANSPORT_BIKE,
        });
    }
    let walkKm = sumKm(text, /(\d+(?:[.,]\d+)?)\s*km\s*(?:a\s*pie|caminando|caminé|caminar)/gi);
    if (walkKm === 0)
        walkKm = sumKm(text, /(?:caminé|caminar)\s*(\d+(?:[.,]\d+)?)\s*km/gi);
    if (walkKm > 0 || /\b(caminé|caminar|a pie|caminando)\b/i.test(text)) {
        items.push({
            label: walkKm > 0 ? `Caminata (${walkKm} km)` : 'Caminata',
            kgCo2: emission_factors_1.EMISSION_FACTORS.TRANSPORT_WALK,
        });
    }
    return items;
};
exports.detectTransport = detectTransport;
//# sourceMappingURL=transport.detector.js.map