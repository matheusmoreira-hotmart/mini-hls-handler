# Player Uploader
Hotmart Player simple SDK for uploading new videos

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Npm or Yarn

### Installing
First of all, login on npm, as this is a private package

```
npm login

Username: hotmart
Password: *****
Email: front@hotmart.com.br
```

Proceed by actually installing the package

```
// Npm
npm install @hotmart/player-uploader

// Yarn
yarn add @hotmart/player-uploader
```

Import it on the project through require or import

```
import Uploader from '@hotmart/player-uploader'
```

Create an instance, passing the following params to the constructor:
* Config JSON
* Success callback handler
* Fail callback handler

```
this.Uploader = new Uploader(
  config,
  this.uploadSuccess,
  this.uploadFailed
);
```
You MUST provide the following properties on the Config JSON:
* **progressIntervalMS**: Time between progress updates
* **accessToken**: Current user access_token
* **isProduction**: Uploader enviroment

Now you should be able to upload a new video through the send method, using the following params:
* File
* Upload started callback handler
* Calculate progress callback handler

```
this.Uploader.send(file, this.uploadStarted, this.calculateProgress);
```

You should be able to cancel any upload in progress by using the command

```
this.Uploader.cancel(mediaId);
```

## Built With

* [EvaporateJS](https://github.com/TTLabs/EvaporateJS) - Amazon uploader
* [@hotmart/request](https://github.com/Hotmart-Org/request) - Hotmart's AJAX handler
* [crypto-js](https://github.com/brix/crypto-js) - Used to generate sha-256 hashes
* [SparkMD5](https://github.com/satazor/js-spark-md5) - Used to generate md5 hashes
* [Webpack](https://github.com/webpack/webpack) - Used to bundle and compress all the packages


## Authors
* **Matheus Elias R. Moreira** - *Initial work*