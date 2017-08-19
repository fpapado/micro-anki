const {send, sendError, json} = require('micro');
const fs = require('fs');
const AnkiExport = require('anki-apkg-export').default;
const microCors = require('micro-cors');

const cors = microCors({allowMethods: ['POST']});

async function saveAnki(cards) {
  const apkg = new AnkiExport('deck-name');

  cards.forEach(card => apkg.addCard(card.front, card.back));

  let zip = await apkg.save();

  return zip;
}

async function handleRequest(req, res) {
  // {
  // 'cards:'[{front: '...', back: '...'}];
  // }
  const data = await json(req);

  let zip = await saveAnki(data.cards);

  send(res, 200, zip);
}

module.exports = cors(handleRequest);
