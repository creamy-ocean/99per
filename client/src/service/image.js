import axios from "axios";
import { config } from "../util/config";

const {
  cloudinary: { cloudName, apiKey },
} = config;
const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`;

export default class ImageService {
  async upload(image) {
    const formData = new FormData();

    formData.append("api_key", apiKey);
    formData.append("upload_preset", "bjad8nza"); // preset 이름을 넣어준다
    formData.append("timestamp", Date.now() / 1000 || 0);
    formData.append("file", image);

    const configOfUpload = {
      header: { "Content-Type": "multipart/form-data" },
    };

    const { data } = await axios.post(url, formData, configOfUpload);

    return data.url;
  }
}
