import { fetch, router } from 'dva';

const { routerRedux } = router;

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  let newOptions = { ...options };
  if (['POST', 'PUT', 'DELETE'].includes(newOptions.method)) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  } else if (newOptions.method === 'fileUpload') {
    //这部分为上传文件
    newOptions.method = 'POST';
    const dataParament = newOptions.body;
    console.log('dataParament ==', dataParament); //你可以在这里查看你要传的文件对象
    let filedata = new FormData();
    if (newOptions.body.files) {
      //这里可以包装多文件
      for (let i = 0; i < dataParament.files.fileList.length; i++) {
        //dataParament.files.fileList[i].originFileObj 这个对象是我观察 antd的Upload组件发现的里面的originFileObj 对象就是file对象
        filedata.append('files', dataParament.files.fileList[i].originFileObj);
      }
    }
    for (let item in dataParament) {
      if (item != 'files' && dataParament[item]) {
        //除了文件之外的 其他参数 用这个循环加到filedata中
        filedata.append(item, dataParament[item]);
      }
    }
    newOptions.body = filedata;
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then((response) => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch((e) => {
      // const { dispatch } = store;
      // const status = e.name;
      // if (status === 401) {
      //   dispatch({
      //     type: 'login/logout',
      //   });
      //   return;
      // }
      // if (status === 403) {
      //   dispatch(routerRedux.push('/exception/403'));
      //   return;
      // }
      // if (status <= 504 && status >= 500) {
      //   dispatch(routerRedux.push('/exception/500'));
      //   return;
      // }
      // if (status >= 404 && status < 422) {
      //   dispatch(routerRedux.push('/exception/404'));
      // }
    });
}
