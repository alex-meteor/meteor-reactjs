var meteorVersion = '1.1.0.2',
    reactVersion = '0.13.2';

Package.describe({
    name: 'hipertracker:reactjs',
    summary: 'ReactJS + addons + JSX (--harmony) for Meteor',
    version: '0.0.11',
    git: 'https://github.com/hipertracker/meteor-reactjs'
});

Package._transitional_registerBuildPlugin({
    name: 'compileJSX',
    use: [],
    sources: [
        'plugin/compile-jsx.js'
    ],
    npmDependencies: {
        'react': reactVersion,
        'react-tools': reactVersion
    }
});


Package.onTest(function (api) {
    api.use('tinytest');
    api.use('hipertracker:reactjs');
    api.addFiles('hipertracker:reactjs-tests.js');
});


Package.on_use(function (api) {
    api.versionsFrom(meteorVersion);

    // Standard distribution of React, same version as react-tools.
    api.add_files('vendor/react-' + reactVersion + '.js', 'client');

    // On the server, we use the modules that ship with react.
    api.add_files('src/require-packages.js', 'server');
    api.export('React', 'server');

    // Meteor-enabled components should include this mixin via
    // React.createClass({ mixins: [ReactMeteor.Mixin], ... }).
    api.add_files('src/ReactMeteor.js', ['server', 'client']);
    api.export('ReactMeteor', ['server', 'client'])
});


Npm.depends({
    'react': reactVersion
});