# react-simplemap

The whole point of this project is to test publishing an npm module
called @map46/react-simplemap.

It's a React component that wraps OpenLayers and OpenStreetMap.
You can build it and run it standalone or publish it to npmjs.com.

There is an app on github that uses the module called brian32768/react-test.

There will be no more feature additions to make less simple maps because
that would not make sense. Go use the @map46/ol-react package instead!

## OpenLayers 6

When I started this project OpenLayers 6 was at Beta so there were more
steps here to use the beta, they have been removed. It's easy now. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. It should open in a browser, if it does not
open [http://localhost:1234](http://localhost:1234) to view it.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### Sample app

```JavaScript
import React from 'react'
import Map from '@map46/react-simple-map'
const MapApp = () => {
    const lat=46, lon=-122, zoom=8;
    return (
        <>
            <h1>a map, cha cha cha!</h2>
            <Map lat={lat} lon={lon} zoom={zoom}/>
        </>
    );
}
export const MapApp;
```

### Publishing

This will publish the contents of the src/map folder as a new release.
To install it for use in your own project, use "npm install @map46/react-simplemap".

```bash
# Save all changes to github
git push
# Move to master branch
git checkout master
# Merge changes from development branch
git merge dev
git commit -a
git push
```

I wrestled for an hour before finding I had to do this to make "npm version" work.

```bash
eval $(ssh-agent -s) && ssh-add "j:\.ssh\id_rsa_github_bwilsoncc"
```

or on the Mac,

```bash
eval $(ssh-agent -s) && ssh-add ~/.ssh/id_rsa_github
```

Update version in package.json (see below)

```bash
npm version minor
# or
npm version patch
```

Get the current version number from the npm version command and use it here, without the leading 'v'.

```bash
npm login
tasks/publish.sh 0.2.18
````

The script "publish.sh" will put the release contents in build/

Do NOT run "npm publish" in the top level folder. It will publish too much!
The tasks/publish command will run "npm build-package" and "npm publish" for you.
The script runs 'npm publish' after chdiring down into the build folder.

At this point do 'git status' and you will see you're not on a branch.
You need to do a 'git checkout master' to move back onto that branch or 'git checkout dev' to go back to work.
