const Koa = require('koa');
const app = new Koa();
const os = require('os'),
      hostname = os.hostname();
var redis = require("redis");

// You can also use node_redis with promises: https://github.com/NodeRedis/node_redis#promises
var bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var redisClient = redis.createClient();
let redisAvailable = false;
const PORT = 3000;
let visits = 0;

redisClient.on("error", (err) => {
    redisAvailable = false;
    console.log("Redis Error " + err);
});

redisClient.on('ready', () => {
  redisAvailable = true;
 console.log("Redis is ready");
});

const getCache = async (key) => {
  if(!redisAvailable){
    return 'Redis is not available!';
  }
  let data = await redisClient.getAsync(key);
  if(data) {
    data = JSON.parse(data.toString());
  }
  return data;
};

app.use(async ctx => {
  console.log('A Request!');
  try {
    if(redisAvailable) {
      redisClient.incr('visits');
    }
    visits = await getCache('visits');
  }
  catch(e) {
    visits = 'Redis Error!';
    console.log('redisClient.incr() Error: ', e);
  }
  ctx.type = 'html';
  ctx.body = `<h3>Bonjour Monde! </h3>
              <p>Hostname: <b style="color: red;">${hostname}</b></p>
              <p>Site visits from Redis: <b style="color: red;">${visits}</b></p>`;

});

console.log('APP START!!! App is running on port: ', PORT);
app.listen(PORT);
