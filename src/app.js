const yargs = require("yargs");
const openapispec = require('./openapispec.js')
const config = require('config');

console.log(openapispec);
// console.log(yargs.argv);
yargs.usage("\nUsage: $0 [cmd] <args>").alias("h", "help");

yargs.command({
  command: 'adapt-openapi',
  describe: 'Adapts OpenAPI Spec',
  builder: {
    path: {
      type: "string",
      describe: "Path to OpenAPI Spec",
    },
    hostname: {
      type: "string",
      describe: "Hostname to add to the servers URL array",
    }
  },
  handler(argv) {
    openapispec.adaptSpec(argv.path, argv.hostname, config.get('apiConfig'))
  }
});
yargs.parse();

// const YAML = require('yaml')
// const fs = require('fs')
// const config = require('config');
// const handlebars = require('handlebars');
// const argv = require('yargs/yargs')(process.argv.slice(2)).argv

// const OPENAPI_LOCATION = './api/openapi.yaml'


// const initializeAPIHubConfigDev = function (apiConfig) {
//   const initialAPIHubConfig = `apiVersion: apigeeregistry/v1
// kind: API
// metadata:
//   name: {{proxyName}}
//   labels:
//     apihub-business-unit: banking-bu
//     apihub-lifecycle: develop
//     apihub-style: apihub-openapi
//     apihub-target-users: public
//     apihub-team: squadb
//   annotations:
//     apihub-primary-contact: carloscabral@google.com
//     apihub-primary-contact-description: Carlos Cabral
// data:
//   displayName: {{proxyName}}
//   description: {{apiDescription}}
//   recommendedVersion: {{apiVersion}}
//   versions:
//     - metadata:
//         name: {{apiVersion}}
//       data:
//         displayName: {{apiVersion}}
//         state: develop
//         primarySpec: openapi
//         specs:
//           - metadata:
//               name: openapi
//             data:
//               filename: openapi.yaml
//               mimeType: application/x.openapi+gzip;version=3.0.0
//               sourceURI: file://./openapi.yaml`

//   const template = handlebars.compile(initialAPIHubConfig);

//   return parsedAPIHubConfigString = template(apiConfig);
// }

// // spec is a parsed object from YAML
// const addHostToSpec = function (spec, hostname) {
//   if ("servers" in spec) {
//     const uriExists = spec.servers.findIndex(url => url.url === hostname);
//     if (uriExists === -1) {
//       spec.servers.push({ url: hostname });
//     }
//   } else {
//     spec.servers = [];
//     spec.servers.push({ url: hostname + '/' + config.get('apiConfig.apiBasePath') });
//   }

//   return spec;
// }

// // spec is a parsed object from YAML
// const updateSpecFromConfig = function (spec) {
//   spec.info.title = config.get('apiConfig.proxyName');
//   spec.info.description = config.get('apiConfig.apiDescription');
//   spec.info.version = config.get('apiConfig.apiVersion');

//   return spec;
// }

// // spec is the openapi spec read from file
// // hostname is received from command line arguments
// const specUpdates = function (openapiSpecLocation) {
//   const file = fs.readFileSync(openapiSpecLocation, 'utf8');
//   let parsedSpec = YAML.parse(file);
//   console.log(parsedSpec);
//   // parsedSpec = updateSpecFromConfig(parsedSpec); // configs
//   // parsedSpec = addHostToSpec(parsedSpec, hostname);

//   // return YAML.stringify(parsedSpec);
// }

// const file = fs.readFileSync(OPENAPI_LOCATION, 'utf8');
// const updatedSpec = specUpdates(file, argv.hostname);
// fs.writeFileSync('./api/openapi.yaml', updatedSpec);

// const updatedAPIHubFile = initializeAPIHubConfigDev(config.get('apiConfig'));
// fs.writeFileSync('./api/info.yaml', updatedAPIHubFile);


// // const title = YAML.parse(file).info.title;
// // console.log(title);
// // const description = YAML.parse(file).info.description;
// // console.log(description);

// // fs.copyFile('info-template.yaml', 'info-template-work.yaml', (err) => {
// //     if (err) throw err;
// //     console.log('info-template.yaml was copied to info-template-work.yaml');
// // });


// // let options = {
// //     files: './info-template-work.yaml',
// //     from: /API_NAME/g,
// //     to: title
// // };

// // try {
// //     const results = replace.sync(options);
// //     console.log('Replacement results:', results);
// // }
// // catch (error) {
// //     console.error('Error occurred:', error);
// // }

// // options = {
// //     files: './info-template-work.yaml',
// //     from: /API_DESCRIPTION/g,
// //     to: description
// // };

// // try {
// //     results = replace.sync(options);
// //     console.log('Replacement results:', results);
// // }
// // catch (error) {
// //     console.error('Error occurred:', error);
// // }

// // fs.copyFile('info-template-work.yaml', './api/info.yaml', (err) => {
// //     if (err) throw err;
// //     console.log('info-template-work.yaml was copied to ./api/info.yaml');
// // });

// // if (fs.existsSync('info-template-work.yaml')) {
// //     // The file exists, so you can proceed with deleting it
// //     try {
// //         fs.unlinkSync('info-template-work.yaml')
// //         console.log('File deleted successfully')
// //     } catch (err) {
// //         console.error(err)
// //     }
// // } else {
// //     console.log('File not found')
// // }