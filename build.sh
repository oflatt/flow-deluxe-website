# copy all html files to the dist directory from source

find src -maxdepth 1 -name '*.html' -exec cp {} dist/ \;



elm make src/Main.elm --output=dist/main.js

cd src/flow-game
wasm-pack build

cd www
npm run build
