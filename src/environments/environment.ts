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
  thumborUrl: 'https://img.belisada.id/',
  elasticSearchUrl: 'https://elastic.belisada.id',
  chatUrl: 'https://chat0.belisada.id',
  socketUrl: 'https://chat0-websock.belisada.id',
  firebase: {
    apiKey: 'AIzaSyBIUJNYI-q2h2Bh1Drb7GvDuK7KDjx_e5o',
    authDomain: 'belisada-dev.firebaseapp.com',
    databaseURL: 'https://belisada-dev.firebaseio.com',
    projectId: 'belisada-dev',
    storageBucket: 'belisada-dev.appspot.com',
    messagingSenderId: '778701366310'
  },
  googleKey : {
    geoCodeApi: 'AIzaSyCuNBuV8wyDT2HZaUvzF0s6rWpBzfo1zq4'
  },
  ipay88: {
    MerchantKey: 'Drhl3e5KLy',
    MerchantCode: 'ID00869',
    Currency: 'IDR',
  }
};
