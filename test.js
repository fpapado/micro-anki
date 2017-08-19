const micro = require('micro');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');
const app = require('./');

const getUrl = fn => {
  const srv = micro(fn);

  return listen(srv);
};

test('send 200 on valid input', async t => {
  const url = await getUrl(app);

  const res = await got(url, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({cards: [{front: 'word', back: 'translation'}]})
  });

  t.is(res.statusCode, 200);
});

test('send 400 on invalid input', async t => {
  const url = await getUrl(app);

  const error = await t.throws(
    got(url, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({wrong: [{front: 'word', back: 'translation'}]})
    })
  );

  t.is(error.statusCode, 400);
});
