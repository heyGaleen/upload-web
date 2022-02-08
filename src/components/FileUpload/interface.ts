export type UploadFileStatus =
  | 'uploading'
  | 'done'
  | 'error'
  | 'removed'
  | 'success';

type SizeType = 'large' | 'middle' | 'small';

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
  url?: string;
  type: string;
}

export interface UploadProps {
  action: string;
  type: string;
  fileSize?: number;
  unit?: string;
  maxCount?: number;
  fileVertifyType?: string;
  btnName?: string;
  btnSize?: SizeType;
  urlReg?: string;
  disabled?: boolean;
  defaultFileList?: UploadFile[];
  beforeUpload?: (file: UploadFile) => boolean | PromiseLike<void>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (info: InfoProps) => void;
  onRemove?: (file: UploadFile) => void;
  headers?: { [key: string]: any };
  name?: string;
  data?: { [key: string]: any };
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
  [propName: string]: any;
}

export interface InfoProps {
  file: UploadFile;
  fileList: UploadFile[];
}

export type FileType =
  | 'image'
  | 'excel'
  | 'doc'
  | 'zip'
  | 'pdf'
  | 'contract'
  | 'Bom'
  | 'whitelist'
  | 'profile'
  | 'tradeProfile'
  | 'attachment'
  | 'miContract'
  | 'support'
  | 'miFundVouchor'
  | '';
