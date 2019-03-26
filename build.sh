# copy all html files to the docs directory from source

find src -maxdepth 1 -name '*.html' -exec cp {} docs/ \;



elm make src/Main.elm --output=docs/main.js

cd src/flow-game
wasm-pack build

cd www
npm run build
