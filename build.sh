
# clear the docs folder
echo "--------- clearing docs"
rm -rf docs/*

# copy all html files to the docs directory from source
echo "--------- copying html files"
find src -maxdepth 1 -name '*.html' -exec cp {} docs/ \;


echo "--------- copying assets and cname"
cd src
cp -rf assets/ ../docs/assets
cp CNAME ../docs/CNAME
cd ..

echo "--------- elm make and output main.js in docs folder"
elm make src/Main.elm --output=docs/main.js

echo "--------- wasm-pack build in flow-game"
cd src/flow-game
wasm-pack build


echo "--------- packaging www folder with npm run build"
cd www
npm run build
