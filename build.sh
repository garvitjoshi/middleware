#!/bin/bash -e

auth=$(curl -u${ARTIFACTORY_USER}:${ARTIFACTORY_API_TOKEN} https://artifactory.corp.adobe.com/artifactory/api/npm/auth)
export NPM_AUTH=$(echo "$auth" | grep "_auth" | awk -F " " '{print $3}')
export NPM_EMAIL=$(echo "$auth" | grep "email" | awk -F " " '{print $3}')

npm install

./node_modules/.bin/gulp build

if [ $TESSA2_API_KEY ]; then
  echo "TESSA2_API_KEY found in environment variable"
  npm run tessa-npm-plugin
fi

# remove extraneous packages that are not listed on the parent package's dependencies list
npm --no-progress --no-color prune --production
