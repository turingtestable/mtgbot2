# MTGBot2
In loving memory of MTGBot, who broke for reasons unknown.

This bot is as simple Slackbot that hangs out and looks for card names like `!Kird Ape` in your slack channel. When it sees one, the bot looks up the card and posts message to that channel with the card info. 

## Running locally
`git clone`

`npm install`

`set OAUTH_TOKEN=xxxxxxx`

`npm run prod`

Use an app like Postman to POST to `http://localhost:3000` with a raw body in the structure which Slack uses and the local server will post to the slack team/channel for you.
```
{
  "event": {
    "text": "!test,
    "channel": "bottesting"
  }
}
```

## Roadmap 
- Support rule lookups like "100.12"
- Orchestrate multiplayer drafts

## Syntax

!*cardname

!pack of *set-abbrev

!*rules-number (not yet implemented)

[card] [*characteristic=value] (not yet implemented)