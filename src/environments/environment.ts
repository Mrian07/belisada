// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrlSeller: 'https://seller0.belisada.id',
  domain: 'https://dev.belisada.id',
  apiUrl: 'https://api0.belisada.id/belisada',
  apiUrlMongo: 'https://api0.belisada.id/belisada-mongo',
  thumborUrl: 'https://image.belisada.id/',
  firebase: {
    apiKey: 'AIzaSyBIUJNYI-q2h2Bh1Drb7GvDuK7KDjx_e5o',
    authDomain: 'belisada-dev.firebaseapp.com',
    databaseURL: 'https://belisada-dev.firebaseio.com',
    projectId: 'belisada-dev',
    storageBucket: 'belisada-dev.appspot.com',
    messagingSenderId: '778701366310'
  },
  googleKey : {
    geoCodeApi: 'AIzaSyDLiyE2uJcoWGigiITTSBZbAZ0PmEm436s'
  }
  // imgUrl163x179: 'http://image.belisada.id:8888/unsafe/163x179',
};
