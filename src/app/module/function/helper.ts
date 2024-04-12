export function copyObject<T>(obj: T): T {
  const jsonObj = JSON.stringify(obj);
  return JSON.parse(jsonObj);
}
