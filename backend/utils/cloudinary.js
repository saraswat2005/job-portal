import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name:'key',
    api_key:'key',
    api_secret: 'key'
});
export default cloudinary;
