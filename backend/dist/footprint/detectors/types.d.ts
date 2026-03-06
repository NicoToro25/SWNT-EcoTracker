export interface BreakdownItem {
    label: string;
    kgCo2: number;
}
export type ActivityDetector = (text: string) => BreakdownItem[];
