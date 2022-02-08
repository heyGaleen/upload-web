interface FileDataObj {
  response: Object;
  data: Object;
  url: String;
  [propName: string]: any;
}

export function parsePath(str: string): Function {
  const segments: string[] = str.split('.');
  return (obj: FileDataObj) => {
    if (!obj) return '';
    for (let i = 0; i < segments.length; i++) {
      obj = obj[segments[i]];
    }
    return obj;
  };
}
