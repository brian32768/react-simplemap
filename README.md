
I shamelessly did the "npm run eject" step to get rid of the really elegant react-scripts
thing that bootstrapping created for me.

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

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

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
    tasks/publish.sh 0.2.18      ``this will put the release contents in build/
    git checkout master

Do NOT run "npm publish" in the top level folder. It will publish too much!
The tasks/publish command will run "npm build-package" and "npm publish" for you.
The script runs 'npm publish' after chdir'ing down into the build folder.

At this point do 'git status' and you will see you're not on a branch.
You need to do a 'git checkout master' to move back onto that branch or 'git checkout dev' to go back to work.
