module.exports = {
  expanded: true,
  suites: ['ui/test/src/'],
  plugins: {
    istanbul: {
      dir: './ui/coverage',
      reporters: ['text', 'lcov'],
      include: [
        'ui/src/**/*.html'
      ],
      thresholds: {
        global: {
          statements: 100,
          functions: 100,
          branches: 100,
          lines: 100
        }
      },
      watermarks: {
        lines: [100, 100],
        statements: [100, 100],
        functions: [100, 100],
        branches: [100, 100]
      }
    },
    local: {
      browsers: ['chrome'],
    },
    sauce: {
      browsers: [{
        browserName: 'microsoftedge',
        platform: 'Windows 10',
        version: '',
      }, {
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11',
      }, {
        browserName: 'safari',
        platform: 'OS X 10.12',
        version: '10',
      }, {
        browserName: 'chrome',
        platform: 'Windows 10',
        version: '55.0',
      }, {
        browserName: 'firefox',
        platform: 'Windows 10',
        version: '50.0',
      }, {
        browserName: 'Safari',
        appiumVersion: '1.6.3',
        deviceName: 'iPhone Simulator',
        deviceOrientation: 'portrait',
        platformVersion: '10.0',
        platformName: 'iOS',
      }, {
        browserName: 'Browser',
        appiumVersion: '1.5.3',
        deviceName: 'Android Emulator',
        deviceOrientation: 'portrait',
        platformVersion: '5.1',
        platformName: 'Android',
      }],
    },
  },
};
