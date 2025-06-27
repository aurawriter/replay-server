# Replay Server
This is a replay server I built at `staraptorshowdown.com/replays` \
You will need to make some edits, but it should be pretty close to working out of the box

Everything assumes this folder is at the same level at the server and client

/var/www
 - replay-server
 - pokemon-showdown
 - pokemon-showdown-client

## Replay Runner
- Watches `pokemon-showdown/logs` folder and runs the script
- I recommend leaving this running in a tmux window
- By default, showdown logs only ladder games, id recommend logging challenges so this works better


## Replay Webpage
- Typescript webpage built with React/Mui
- Build this with `npm run build` and it should automatically populate in the correct location inside `pokemon-showdown-client/play.pokemonshowdown.com/replays`

## Replay Generator
- Make sure `pokemon-showdown-replays` is installed with `pip install pokemon-showdown-replays`
- Make sure you change `replay_embed_location` inside `generate_replays.py`


# Todo in the future
Fix the paths in readme
Export to clipboard
Replay Scouter
Sample nginx config
