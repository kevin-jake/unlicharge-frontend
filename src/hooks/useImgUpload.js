import { useState } from "react";

export const useImgUpload = () => {
  const [imgFile, setImgFile] = useState();

  console.log(imgFile);
  return {
    imgFile,
  };
};
