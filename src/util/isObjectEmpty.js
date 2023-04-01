export default function isObjectEmpty(value) {
  console.log(
    "🚀 ~ file: isObjectEmpty.js:5 ~ isObjectEmpty ~ JSON.stringify(value):",
    JSON.stringify(value) === "{}"
  );
  console.log(
    "🚀 ~ file: isObjectEmpty.js:8 ~ isObjectEmpty ~ Object.prototype.toString.call(value) ===0]",
    Object.prototype.toString.call(value) === "[object Object]"
  );
  console.log(
    "🚀 ~ file: isObjectEmpty.js:13 ~ isObjectEmpty ~ Boolean(value):",
    Boolean(value)
  );
  return (
    Object.prototype.toString.call(value) === "[object Object]" &&
    JSON.stringify(value) === "{}" &&
    Boolean(value)
  );
}
