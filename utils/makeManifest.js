module.exports = function makeManifest(config) {
  const manifest = {
    server: {
      app: {}
    },
    connections: [
      {
        host: config.host ? config.host : "localhost",
        port: config.port ? config.port : 8080
      }
    ],
    registrations: [
      {
        plugin: {
          register: "nes"
        }
      },
      {
        plugin: {
          register: "inert"
        }
      }
    ]
  };

  if (config.core_modules && config.core_modules.length > 0) {
    config.core_modules.map(m => manifest.registrations.push({
      plugin: {register: `./${m}`}
    }));
  }

  return manifest;
};
