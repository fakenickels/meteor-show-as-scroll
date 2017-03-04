Package.describe({
  name: 'astrocoders:show-as-scroll',
  version: '0.0.5',
  summary: 'Infinite Scroll with collections',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');

  api.use([
    'ecmascript',
    'check',
    'astrocoders:infinite-scroll@0.0.2',
    'underscore',
    'reactive-var',
    'tracker'
  ]);

  api.addFiles('show-as-scroll.js', 'client');
  api.export('ShowAsScroll', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('astrocoders:show-as-scroll');
  api.addFiles('show-as-scroll-tests.js');
});
