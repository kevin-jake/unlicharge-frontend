export default function isObjectEmpty(value) {
  if (Boolean(value)) {
    return (
      Object.prototype.toString.call(value) === "[object Object]" &&
      JSON.stringify(value) === "{}"
    );
  }
  return true;
}
