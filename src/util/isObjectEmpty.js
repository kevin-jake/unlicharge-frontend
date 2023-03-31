export default function isObjectEmpty(value) {
  return (
    Boolean(value) ||
    (Object.prototype.toString.call(value) === "[object Object]" &&
      JSON.stringify(value) === "{}")
  );
}
