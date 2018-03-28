# HLTV Livescore

## Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Methods](#methods)
- [Events](#events)


## Introduction

This is a wrapper for [andrewda](https://github.com/andrewda)'s [hltv-scorebot](https://github.com/andrewda/hltv-livescore), v. 1.0.0.

A cheerio web scraper monitors HLTV for live games and socket-io child processes are forked
to monitor each match's live score.

## Getting Started

**Install with npm:**


```CMD
$ git clone path-to-this-repo
$ npm install
```

## Usage
```CMD
node index.js
node serverParent.js
```

This project also comes with PM2 ecosystem files. . They're  in the root of the project folders. Use them like this:
```
pm2 start ecosystem_win.json --env=development
```

You can also set environment variables manually, e.g. on Windows:
```
// set environment to development:
set NODE_ENV=development
set API_URL=
set API_KEY=
node serverParent.js
```

## Methods

### Constructor([options])
- `options` - An optional object containing some of the following options
    - `listid` - The game's listid
    - `url` - The URL to listen on. Defaults to `https://scorebot-secure.hltv.org`
    - `port` - The port to listen on. Defaults to `80`

Constructs a new `Livescore`. You will be automatically connected to the HLTV scorebot server. The game with the specified `listid` will be automatically started if provided. If not provided, you must specify them using them using the `start()` method.

## Events

Events emit an object containing the parameters listed under each event.

### raw

Uses socket.io-wildcard to emit everything coming from HLTV server.
