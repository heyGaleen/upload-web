import { message } from 'antd';
import fileTypes from './fileType';
import { UploadFile, FileType } from './interface';

// check文件类型
export const checkFileType = (type: FileType) => {
  if (type === '') return true;
  if (fileTypes.whitelist.type.indexOf(type) === -1) {
    message.error(fileTypes.whitelist.message);
    return false;
  }
  let isType = true;
  if (type) {
    isType = fileTypes[type].type.indexOf(type) > -1;
    if (!isType) message.warn(fileTypes[type].message);
  }
  return isType;
};

// check文件后缀名
export const checkFileNameSuffix = (file: UploadFile, accept: string) => {
  const dotPos = file.name.lastIndexOf('.');
  const expt = file.name.slice(dotPos).toLowerCase();
  if (!accept.includes(expt)) {
    message.error(`上传文件为不支持的文件格式`);
    return false;
  }
  return true;
};

// check文件大小
export const checkFileSize = (file: UploadFile, size = 30, unit = 'M') => {
  const unitTxt = {
    M: 'MB',
    K: 'K',
  };
  const isLtSize =
    unit === 'K' ? file.size / 1024 < size : file.size / 1024 / 1024 < size;
  if (!isLtSize) message.warn(`文件大小不能超过${size}${unitTxt}!`);
  return isLtSize;
};

export const verify = (data: any): boolean => {
  const {
    file,
    size = 30,
    unit = 'M',
    type,
    accept,
    fileVertifyType = 'suffix',
  } = data;
  return (
    (fileVertifyType === 'suffix'
      ? checkFileNameSuffix(file, accept)
      : checkFileType(type)) && checkFileSize(file, size, unit)
  );
};

export const check = (data: any): Promise<File> => {
  const result = verify(data);
  return new Promise((resolve, reject) =>
    result ? resolve(data.file) : reject(data.file),
  );
};
