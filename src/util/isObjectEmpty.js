export default function isObjectEmpty(value) {
  return (
    Object.prototype.toString.call(value) === "[object Object]" &&
    JSON.stringify(value) === "{}"
  );
}
