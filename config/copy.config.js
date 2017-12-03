const orgCopyConfig = require('@ionic/app-scripts/config/copy.config');

orgCopyConfig['Firebase'] = {
    src: 'node_modules/firebase/firebase.js',
    dest: 'www/'
};

orgCopyConfig['Angularfire2'] = {
    src: 'node_modules/angularfire2/angularfire2.js',
    dest: 'www/'
};

module.exports = orgCopyConfig;
