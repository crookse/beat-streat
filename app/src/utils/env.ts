export function env<T>(key: string, defaultValue: T): T {
  const value = process.env[key.toUpperCase()];

  if (!value) {
    return defaultValue;
  }

  let ret;

  if (typeof defaultValue === "string") {
    ret = value;
  }

  if (typeof defaultValue === "boolean") {
    ret = value === "true";
  }

  if (typeof defaultValue === "number") {
    ret = parseInt(value);
  }

  return ret as T;
}
