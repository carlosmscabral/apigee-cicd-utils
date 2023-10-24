const fs = require('fs');
const YAML = require('YAML');

// spec is a parsed object from YAML
const addHostToSpec = function (spec, hostname, apiConfig) {
    if ("servers" in spec) {
        console.log(spec.servers);
        const uriExists = spec.servers.findIndex(url => url.url === hostname + '/' + apiConfig.apiBasePath);
        if (uriExists === -1) {
            spec.servers.push({ url: hostname });
        }
    } else {
        spec.servers = [];
        spec.servers.push({ url: hostname + '/' + apiConfig.apiBasePath });
    }

    return spec;
}

// spec is a parsed object from YAML
const updateSpecFromConfig = function (spec, apiConfig) {
    spec.info.title = apiConfig.proxyName;
    spec.info.description = apiConfig.apiDescription;
    spec.info.version = apiConfig.apiVersion;

    return spec;
}


const generateSpecObjectFromFile = function (openapiSpecLocation) {
    const file = fs.readFileSync(openapiSpecLocation, 'utf8');
    return YAML.parse(file);
}

// spec is a parsed object from YAML
const writeSpecObjectToFile = function (spec, openapiSpecLocation) {
    const parsedSpec = YAML.stringify(spec);
    fs.writeFileSync('./api/openapi.yaml', parsedSpec);
}

const adaptSpec = function (openapiSpecLocation, hostname, apiConfig) {
    let spec = generateSpecObjectFromFile(openapiSpecLocation);
    spec = updateSpecFromConfig(spec, apiConfig);
    spec = addHostToSpec(spec, hostname, apiConfig);
    writeSpecObjectToFile(spec, openapiSpecLocation);
}

module.exports = {
    adaptSpec
}