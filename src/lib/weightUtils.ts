export function formatWeight(weight: any, unit: string = "gm"): string {
    const num = Number(weight);
    if (isNaN(num)) return `0 ${unit}`;
    return `${num.toFixed(3)} ${unit}`;
}
