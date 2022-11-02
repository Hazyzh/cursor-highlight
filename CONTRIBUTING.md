### Thanks for your interest in developing/contributing to Cursor Highlight!

---

This project was developed by `electron`.

The basic project structure was like this

```
.
├── electron                # electron related code, app config stuff.
├── src                     # Source files 
├── app_output              # electron build app output dir.
├── dist                    # webpage build files output dir.
├── LICENSE
└── README.md
```

#### Dependencies

1. This project need [node](https://nodejs.org/en/) environment.
2. clone the repo to local.
3. run `yarn install` in the root directory to install all dependencies.

#### Developing

* run `yarn dev` if your want testing the app in the web page.
* run `yarn start` if your want testing the app in electron build.

#### Produce local package

if you want build a personal package in local, run `yarn app:build`, after finished you can see the output package file in `app_output` directory.

### Contributing to [Cursor Highlight](https://github.com/Hazyzh/cursor-highlight)

Just follow the GitHub common contributing guide.