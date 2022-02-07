import BigFileUpload from './BigFileUpload';
import { Card } from 'antd';
// const r = require.context('./Uploads', false, /\.jsx$/)
// const uploadComs = r.keys().map(key => r(key))

const FileUpload = () => {
  return (
    <>
      <Card
        title="大文件上传之 xhr formdata"
        style={{ margin: 30, width: '80%' }}
      >
        <BigFileUpload />
      </Card>
      {/* {uploadComs.map((com,i) => (
        <Card key={i} title="大文件上传之 xhr formdata" style={{ margin: 10, width: '50%' }}>
          {com.default()}
        </Card>
      ))} */}
    </>
  );
};

export default FileUpload;
