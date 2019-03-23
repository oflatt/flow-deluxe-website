cp -f src/index.html dist/index.html


elm make src/Main.elm --output=dist/main.js

cd src/flow-game
wasm-pack build

cd www
npm run build
