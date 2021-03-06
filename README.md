## steam-status

### DEAD

    I will no longer be providing updates to this software.
    If you wish to view the same information in the proper manner visit the link below.

### [steamstat.us](https://steamstat.us)

*Note: There isn't much wrong with this code, just inefficent on RAM for the simple things that are happening.
If you like it, feel free to continue using it; there should be no problems in the future.*

[![license](https://img.shields.io/npm/l/express.svg)]() [![passing](https://img.shields.io/badge/build-passing-green.svg?style=flat)]() [![quality](https://img.shields.io/badge/quality-okay-green.svg?style=flat)]()

## Download

[Public Releases](https://github.com/thejordanprice/steam-status/releases)

This application is being built as a learning experiment.
Used: Electron, Node.js, HTML/CSS.

As of the latest revision, it is actually showing somewhat useful.

![Screenshot](http://i.imgur.com/0Vex9uN.png)

```
git clone 
cd [thatdirectory]
npm install
npm start
```

## Useful commands.

```
npm start
npm run build
npm run prerelease
npm run release
```

## If you want to dev on this project.

The application is split between two main folders...

`src` - this folder is intended for files which need to be transpiled or compiled (files which can't be used directly by Electron).

`app` - contains all static assets (put here images, css, html etc.) which don't need any pre-processing.

The build process compiles all stuff from the `src` folder and puts it into the `app` folder, so after the build has finished, your `app` folder contains the full, runnable application.

Treat `src` and `app` folders like two halves of one bigger thing.

The drawback of this design is that `app` folder contains some files which should be git-ignored and some which shouldn't (see `.gitignore` file). But thanks to this two-folders split development builds are much (much!) faster.

### License

MIT
