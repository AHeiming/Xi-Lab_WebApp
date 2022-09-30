export function liquidUnitConverter(input: number): string {
  if (input < 1000) {
    return `${input} ml`;
  } else {
    return `${input / 1000} L`;
  }
}
