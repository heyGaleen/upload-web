const image = {
  type: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp', 'image/webp'],
  message: '请上传图片',
};
const excel = {
  type: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/wps-office.xlsx',
    'application/wps-office.xls',
  ],
  message: '请上传excel',
};
const doc = {
  type: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/wps-office.docx',
    'application/wps-office.doc',
  ],
  message: '请上传word',
};
const ppt = {
  type: [
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ],
  message: '请上传PPT',
};
const zip = {
  type: [
    'application/x-zip-compressed',
    'application/x-rar-compressed',
    'application/zip',
    'application/x-rar',
  ],
  message: '请上传压缩包',
};
const pdf = {
  type: ['application/pdf'],
  message: '请上传PDF',
};
const contract = {
  type: [...doc.type, ...zip.type, ...pdf.type],
  message: '请上传.rar .zip .doc .docx .pdf格式的文件',
};
const Bom = {
  type: [...doc.type, ...excel.type, ...pdf.type],
  message: '请上传Word、Excel、和PDF格式的文件',
};
const whitelist = {
  type: [
    ...image.type,
    ...excel.type,
    ...doc.type,
    ...zip.type,
    ...pdf.type,
    ...ppt.type,
  ],
  message: '上传文件扩展名非法',
};
const profile = {
  type: ['image/jpg', 'image/jpeg', 'image/png', ...pdf.type],
  message: '请上传jpg,jpeg,png,pdf格式文件',
};
const tradeProfile = {
  type: [
    'image/jpg',
    'image/jpeg',
    'image/png',
    ...pdf.type,
    ...excel.type,
    ...doc.type,
  ],
  message: '请上传jpg,jpeg,png,pdf格式文件',
};
const attachment = {
  type: [...doc.type, ...zip.type, ...pdf.type, ...image.type, ...excel.type],
  message: '请上传.rar .zip .doc .docx .pdf .excel格式的文件',
};
const support = {
  type: [...doc.type, ...zip.type, ...pdf.type],
  message: '请上传.rar .zip .doc .docx .pdf格式的文件',
};
const miContract = {
  type: ['image/jpg', 'image/jpeg', 'image/png', ...pdf.type, ...zip.type],
  message: '请上传pdf、jpg、jpeg、png、zip、rar格式的文件',
};
const miFundVouchor = {
  type: ['image/jpg', 'image/jpeg', 'image/png', ...pdf.type, ...zip.type],
  message: '请上传pdf、jpg、jpeg、png、zip格式的文件',
};

export default {
  image,
  excel,
  doc,
  zip,
  pdf,
  contract,
  Bom,
  whitelist,
  profile,
  tradeProfile,
  attachment,
  miContract,
  support,
  miFundVouchor,
};
