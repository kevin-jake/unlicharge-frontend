import isObjectEmpty from "./isObjectEmpty";

export const uploadImage = async (values) => {
  const { user } = JSON.parse(window.localStorage.getItem("persist:auth"));
  const { username } = JSON.parse(user) || values;
  if (!isObjectEmpty(values.imagePath)) {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    try {
      const imageUrl = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/image`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imagePath = await imageUrl.json();
      const updatedImageData = { ...values, imagePath };
      return updatedImageData;
    } catch (err) {
      return `Error uploading image: ${err}`;
    }
  }
};
