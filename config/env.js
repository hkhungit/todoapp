// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

var REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  var processEnv = Object
    .keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = JSON.stringify(process.env[key]);
      return env;
    }, {
      'NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      FIREBASE_AUTH: JSON.stringify('todoapp-8589e.firebaseapp.com'),
      FIREBASE_DATABASE: JSON.stringify('https://todoapp-8589e.firebaseio.com'),
      FIREBASE_KEY: JSON.stringify('AIzaSyBTO2Q9K50C8tYjG0IujH66pFzb-Rwa_Ak'),
      'PUBLIC_URL': JSON.stringify(publicUrl)
    });
  return {'process.env': processEnv}
}

module.exports = getClientEnvironment