import OSS from 'ali-oss';
import http from './http';

export async function deleteOSS(fileUrl) {
  const res = await http.get('/upload/getOssConfig');
  const ossConfig = res.data;

  const baseUrl = 'https://file.cavalry.xin/';
  const filePath = fileUrl.replace(baseUrl, '');

  // 初始化OSS客户端
  const client = new OSS({
    region: ossConfig.region,
    accessKeyId: ossConfig.accessKeyId,
    accessKeySecret: ossConfig.accessKeySecret,
    bucket: ossConfig.bucket,
    stsToken: ossConfig.security_token,
    secure: true,
    endpoint: ossConfig.endpoint, // 配置自定义域名
    cname: true, // 开启CNAME
  });

  const result = client.delete(filePath)
  return result
}

export async function uploadToOSS(file, directory = 'boke') {
  try {
    // 获取OSS配置
    const res = await http.get('/upload/getOssConfig');
    const ossConfig = res.data;

    // 初始化OSS客户端
    const client = new OSS({
      region: ossConfig.region,
      accessKeyId: ossConfig.accessKeyId,
      accessKeySecret: ossConfig.accessKeySecret,
      bucket: ossConfig.bucket,
      stsToken: ossConfig.security_token,
      secure: true,
      endpoint: ossConfig.endpoint, // 配置自定义域名
      cname: true, // 开启CNAME
    });

    // 生成文件路径
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const fileName = `${directory}/${year}/${month}/${day}/${Date.now()}_${file.name}`;

    // 上传文件
    const result = await client.put(fileName, file);
    return result.url;
  } catch (error) {
    console.error('文件上传失败:', error);
    throw error;
  }
}