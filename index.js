const {send, createError, json} = require('micro');
const AnkiExport = require('anki-apkg-export').default;
const microCors = require('micro-cors');

const cors = microCors({allowMethods: ['POST']});

async function saveAnki(deckName, cards) {
  const apkg = new AnkiExport(deckName);

  cards.forEach(card => apkg.addCard(card.front, card.back));

  const zip = await apkg.save();

  return zip;
}

async function handleRequest(req, res) {
  const data = await json(req);

  if (!data.cards) {
    throw createError(400, 'No cards field found');
  }

  const deckName = data.deckName ? data.deckName : 'micro-anki-deck';
  const zip = await saveAnki(deckName, data.cards);

  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${deckName}.apkg"`
  );
  send(res, 200, zip);
}

module.exports = cors(handleRequest);
