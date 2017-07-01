# HLTV Livescore

## Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Methods](#methods)
- [Events](#events)


## Introduction

This is a wrapper for [andrewda](https://github.com/andrewda)'s [hltv-scorebot](https://github.com/andrewda/hltv-livescore), v. 1.0.0.

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

## Methods

### Constructor([options])
- `options` - An optional object containing some of the following options
    - `listid` - The game's listid
    - `url` - The URL to listen on. Defaults to `http://scorebot2.hltv.org`
    - `port` - The port to listen on. Defaults to `10022`

Constructs a new `Livescore`. You will be automatically connected to the HLTV scorebot server. The game with the specified `listid` will be automatically started if provided. If not provided, you must specify them using them using the `start()` method.

## Events

Events emit an object containing the parameters listed under each event.

### raw

Uses socket.io-wildcard to emit everything coming from HLTV server.
