import Mock from "mockjs";

Mock.mock("http://124.221.113.80:8080/api/buyin/add","post",(options)=>{
    console.log("request url: ", options.url);
  console.log("request params: ", options.body);
  const data = Mock.mock({
    code:200,
    mag:"请求成功",
    data:"12345"
  })
  console.log("response data: ", data);
  return data;
})
