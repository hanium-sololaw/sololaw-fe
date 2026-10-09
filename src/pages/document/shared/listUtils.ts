export const updateAt = <T>(list: T[], index: number, patch: Partial<T>): T[] =>
  list.map((item, i) => (i === index ? { ...item, ...patch } : item));

export const removeAt = <T>(list: T[], index: number): T[] => list.filter((_, i) => i !== index);
