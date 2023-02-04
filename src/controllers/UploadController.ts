import api from '../api/axios';
import { IUploadViewModel } from 'viewModels';

const getAll = () => {
  return new Promise<IUploadViewModel[]>((resolve, reject) => {
    api
      .get(`uploadtemplate/get-all`)
      .then(({ data }) => resolve(data))
      .catch(reject);
  });
};

const upload = (file: FormData) => {
  return new Promise<boolean>((resolve, reject) => {
    api
      .post(`uploadtemplate/upload-file`, file)
      .then(({ data }) => resolve(data))
      .catch(reject);
  });
};

export const UploadController = { getAll, upload };