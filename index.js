const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { init: initDB, Counter } = require("./db");
const http = require("http")
const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 更新计数
app.post("/api/count", async (req, res) => {
  const { action } = req.body;
  if (action === "inc") {
    await Counter.create();
  } else if (action === "clear") {
    await Counter.destroy({
      truncate: true,
    });
  }
  res.send({
    code: 0,
    test:89811119,
    data: await Counter.count(),
  });
});
app.post('/getResult',async (req,res)=> {
  let formData = {
    position:"德悦路375弄"
  }
  
  console.log("222333");
 
    
    _fn.postData( formData, function(data){
      console.log("data");
      console.log(data);
        res.send(data);
    });
  
});

// 获取计数
app.get("/api/count", async (req, res) => {
  const result = await Counter.count();
  res.send({
    code: 0,
    test:898,
    data: result,
  });
});

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
});

const port = process.env.PORT || 80;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();

_fn = {
  // getData: function(callback){
  //     http.get({
  //         hostname: apiHost,
  //         path: path
  //     }, function(res){
  //         var body = [];
  //         res.on('data', function(chunk){
  //             body.push(chunk);
  //         });
  //         res.on('end', function(){
  //             body = Buffer.concat(body);
  //             callback(body.toString());
  //         });
  //     });
  // },
  postData: function(data, callback){
      data = data || {};
      content = JSON.stringify(data);
      https://www.vigeotec.com/sh/query
      var options = {
          host: "www.vigeotec.com",
          port: "443",
          path: "/sh/query",
          method: 'POST',
          headers:{
            'Content-Type': 'multipart/form-data',
                        'Content-Length': content.length
            //根据提交请求类型不同而不同，以上适用多媒体文件
            //可查询各种报头类型代表的意思
          }
      };
      http.request(options, function(res){
          var _data = '';
          res.on('data', function(chunk){
              _data += chunk;
          });
          res.on('end', function(){
              callback(_data);
          });
      });
      req.write(content);
      req.end()
  }
};