export interface FootprintResult {
    totalKgCo2: number;
    breakdown: {
        label: string;
        kgCo2: number;
    }[];
}
