const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  console.log('A Request!');
  ctx.body = 'Bonjour Monde!';
});

console.log('APP START!!!');
app.listen(3000);