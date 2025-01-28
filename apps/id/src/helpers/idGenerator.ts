let id = 0;

export function getNextElementId(prefix?: string) {
  return `${prefix + "-" || ""}${id++}`;
}
