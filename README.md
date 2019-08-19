The whole point of this project is to test publishing an npm module
called @map46/react-simplemap.

It's a React component that wraps OpenLayers and OpenStreetMap.
You can build it and run it standalone or publish it to npmjs.com.

There is an app on github that uses the module called brian32768/react-test.

There will be no more feature additions to make less simple maps because
that would not make sense. Go use the @map46/ol-react package instead!

## OpenLayers 6 beta

Half the reason I needed to test the "npm publish" workflow
was to confirm whether I could use the beta version (6.x) of OpenLayers instead of
the packaged version (5.x).

If you already downloaded sources for ol-react and built them you have already
done these steps.
Download the latest release tarball, for example, as of 13-Aug-19,

``` wget https://github.com/openlayers/openlayers/archive/v6.0.0-beta.13.tar.gz```

Then you still have to do a separate build of OpenLayers,
```
cd openlayers-6.0.0-beta.13
npm install
npm run build-package
```
I added this in package.json "dependencies" to refer to the local version:

```"ol": "file:../openlayers-6.0.0-beta.13/build/ol"```

After adding the file: dependency, you must rerun "npm install". This will create
a symbolic link to the folder, and you should be able to see ol files in
node_modules/ol.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:1234](http://localhost:1234) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### Sample app

```
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

```
# Save all changes to github
git push
# Move to master branch
git checkout master
# Merge changes from development branch
git merge dev
git commit -a
git push
```

I had to wrestle for an hour before finding I had to do this to make "npm version" work.

    eval $(ssh-agent -s) && ssh-add "j:\.ssh\id_rsa_github_bwilsoncc"

or on the Mac,

    eval $(ssh-agent -s) && ssh-add ~/.ssh/id_rsa_github

Update version in package.json (see below)

    npm version minor
    # or
    npm version patch

Get the current version number from the npm version command and use it here, without the leading 'v'.

    npm login
    tasks/publish.sh 0.2.18

tasks/publish will put the release contents in build/

Do NOT run "npm publish" in the top level folder. It will publish too much!
The tasks/publish command will run "npm build-package" and "npm publish" for you.
The script runs 'npm publish' after chdir'ing down into the build folder.

At this point do 'git status' and you will see you're not on a branch.
You need to do a 'git checkout master' to move back onto that branch or 'git checkout dev' to go back to work.
