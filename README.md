# `micro-anki` [![Build Status](https://travis-ci.org/fpapado/micro-anki.svg?branch=master)](https://travis-ci.org/fpapado/micro-anki)
> Anki apkg export as a microservice.

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/fpapado/ankimic)

## Usage

```bash
$ git clone https://github.com/fpapado/ankimic.git
$ cd ankimic
$ npm start
```

### Request Format
```json
{
  "cards": [
    { "front": "some word",
      "back": "translation"
    }
  ]
}
```

## License

MIT © Fotis Papadogeorgopoulos
