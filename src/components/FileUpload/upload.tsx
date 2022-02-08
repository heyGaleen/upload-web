import React, { FC, useState } from 'react';
import { Button, Upload, Spin, message } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { check } from './fileVertify';
import { parsePath } from '@/utils';
import { UploadProps, UploadFile, InfoProps } from './interface';

/**
 *
 * @param {*} param0
 * action 上传的地址
 * defaultFileList 默认显示的文件列表
 * checkFileType suffix 后缀名判断 fileType 文件type判断
 * size 限制的文件大小
 * maxCount 限制上传文件的数量
 * beforeUpload 上传文件之前的钩子
 * onChange 文件发生改变
 * @returns
 */
const FileUpload: FC<UploadProps> = ({
  action,
  defaultFileList = [],
  accept,
  type,
  fileSize = 30,
  unit = 'M',
  maxCount = 1,
  fileVertifyType = 'suffix',
  headers,
  beforeUpload,
  onChange,
  btnName = '上传文件',
  btnSize = 'middle',
  disabled = false,
  urlReg = 'response.data.url',
  customRequest,
  ...customProps
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const [uploading, setUploading] = useState<Boolean>(false);

  // 上传文件验证
  const handleBeforeUpload = (file: UploadFile) => {
    if (typeof beforeUpload === 'function') return beforeUpload(file);
    return check({ file, fileSize, unit, type, accept, fileVertifyType });
  };
  // 获取response里的url地址
  const getUrl = (file: UploadFile): string => {
    return parsePath(urlReg)(file);
  };

  const handleChange = (info: InfoProps) => {
    let list = [...info.fileList];
    const { status, name } = info.file;
    if (status === 'uploading') {
      setUploading(true);
    }
    if (status === 'done') {
      message.success(`${name}上传成功`);
      setUploading(false);
    } else if (status === 'error') {
      message.success(`${name}上传失败`);
      setUploading(false);
    }
    list = list.slice(-maxCount);
    list = list.map((file) => {
      if (file?.response?.code === 0) {
        // Component will show file.url as link
        file.url = getUrl(file);
      }
      return file;
    });
    setFileList(list);
    onChange!(info);
  };

  const uploadProps: any = {
    action,
    accept,
    maxCount,
    headers,
    beforeUpload: handleBeforeUpload,
    onChange: handleChange,
    fileList,
    ...customProps,
  };

  return (
    <Upload {...uploadProps}>
      <Button type="primary" size={btnSize} icon={<UploadOutlined />}>
        {btnName}
      </Button>
    </Upload>
  );
};

export default FileUpload;
