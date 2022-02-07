import React, { useState } from 'react';
import { Upload, Button, Table } from 'antd';
import request from '../../utils/request';

// 兼容性slice方法
const blobSlice =
  File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

const CHUNK_SIZE = 2 * 1024 * 1024;
let worker;
const BigFileUpload = () => {
  const [file, setFile] = useState();
  const [fileChunkList, setFileChunkList] = useState([]);
  const [fileHash, setFileHash] = useState('');

  // 生成文件切片
  const createFileChunks = (file, size = CHUNK_SIZE) => {
    const chunks = [];
    let cur = 0;
    while (cur < file.size) {
      chunks.push({ file: blobSlice.call(file, cur, cur + size) });
      cur += size;
    }
    return chunks;
  };

  const createProgressHandler = (item) => {
    return (e) => {
      item.percentage = parseInt((e.loaded / e.total) * 100 + '');
    };
  };

  const mergeRequest = async () => {
    await request('/api/file/merge', {
      method: 'POST',
      body: { filename: file.name, size: CHUNK_SIZE, fileHash },
    });
  };

  const calculateHash = (fileChunkList) => {
    return new Promise((resolve) => {
      worker = new Worker('/hash.js');
      worker.postMessage({ fileChunkList });
      worker.onmessage = (e) => {
        const { hash } = e.data;
        if (hash) {
          setFileHash(hash);
          resolve(hash);
        }
      };
    });
  };

  // 上传文件切片
  const uploadFileChunks = async (data) => {
    const rList = data
      .map(({ chunk, hash, i: index }) => {
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('hash', hash);
        formData.append('fileHash', fileHash);
        formData.append('index', index);
        return { formData, index };
      })
      .map(async ({ formData, index }) =>
        request('/api/file/upload', {
          method: 'POST',
          body: formData,
          onprogress: createProgressHandler(fileChunkList[index]),
        }),
      );
    await Promise.allSettled(rList);
    // 合并切片
    await mergeRequest();
  };

  const submit = async () => {
    if (!file) return;
    const fileChunks = createFileChunks(file);
    const hash = await calculateHash(fileChunks);
    const data = fileChunks.map(({ file: file1 }, i) => ({
      chunk: file1,
      hash: `${hash}-${i}`,
      i,
      percentage: 0,
      size: file1.size,
    }));
    setFileChunkList(data);
    await uploadFileChunks(data);
  };

  const columns = [
    {
      title: '切片hash',
      dataIndex: 'hash',
    },
    {
      title: '大小(KB)',
      dataIndex: 'size',
      render: (val) => (val / 1024).toFixed(2),
    },
  ];
  return (
    <>
      <form style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ marginRight: 10 }}>大文件上传-分片:</span>
        <input
          type="file"
          id="f1"
          name="file"
          onChange={(e) => {
            const [fileObj] = e.target.files;
            setFile(fileObj);
          }}
        />
        <br />
        <Button type="primary" onClick={submit}>
          点击上传
        </Button>
      </form>
      <Table rowKey="hash" columns={columns} dataSource={fileChunkList} />
    </>
  );
};

export default BigFileUpload;
