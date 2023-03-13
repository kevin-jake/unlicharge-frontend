export const uploadImage = async (values) => {
  if (values.imagePath) {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    const imageUrl = await fetch(`${import.meta.env.VITE_BACKEND_URL}/image`, {
      method: "POST",
      body: formData,
    });
    const imagePath = await imageUrl.json();
    const updatedImageData = { ...values, imagePath };
    return updatedImageData;
  }
};
