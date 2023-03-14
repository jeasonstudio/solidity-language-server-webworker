import { Context } from './context';
import { WebWorkerCompiler } from './compiler';

const ctx = new Context();

ctx.connection.onExit(() => {
  console.log('Solidity Language Server exit.');
});

// connection.onSignatureHelp();
// connection.onCompletion(onCompletion(serverState));
// connection.onDefinition(onDefinition(serverState));
// connection.onTypeDefinition(onTypeDefinition(serverState));
// connection.onReferences(onReferences(serverState));
// connection.onImplementation(onImplementation(serverState));
// connection.onRenameRequest(onRename(serverState));
// connection.onCodeAction(onCodeAction(serverState));
// connection.onHover(onHover(serverState));

// connection.onDidChangeWatchedFiles(() => {
//   documents.all().forEach((document) => validate(document));
// });

// fetch(
//   'https://binaries.soliditylang.org/bin/soljson-v0.8.19+commit.7dd6d404.js'
// ).then(async (response) => {
//   const blob = await response.blob();
//   console.log(11, blob);
// });

try {
  const compiler = new WebWorkerCompiler();

  const config = {
    language: 'Solidity',
    sources: {
      'test.sol': {
        content: 'contract Contract {}',
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  const res = JSON.parse(compiler.solc.compile(JSON.stringify(config)));
  console.log(22, res);
} catch (error) {
  console.error(error);
}

// https://binaries.soliditylang.org/bin/soljson-v0.8.19+commit.7dd6d404.js
// fetch('https://binaries.soliditylang.org/wasm/list.json')
//   .then((res) => res.json())
//   .then(console.log);

// Listen on the connection
ctx.listen();
