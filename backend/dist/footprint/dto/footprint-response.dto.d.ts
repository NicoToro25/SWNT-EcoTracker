export declare class FootprintBreakdownItemDto {
    label: string;
    kgCo2: number;
}
export declare class FootprintResponseDto {
    kgCo2: number;
    breakdown: FootprintBreakdownItemDto[];
    constructor(kgCo2: number, breakdown: FootprintBreakdownItemDto[]);
}
