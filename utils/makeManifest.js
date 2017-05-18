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
                    register: "hapi-auth-jwt2"
                }
            },
            {
                plugin: {
                    register: "./security"
                }
            },
            {
                plugin: {
                    register: "nes",
                    options: {
                        auth: {
                            type: "direct",
                            route: "jwtDevice"
                        }
                    }
                }
            },
            {
                plugin: {
                    register: "inert",
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
