import Mock from 'mockjs';

Mock.mock('http://124.221.113.80:8080/api/buyin/add', 'post', () => {
  const data = Mock.mock({
    code: 200,
    mag: '请求成功',
    data: '12345',
  });
  return data;
});
