import {
  BrowserMessageReader,
  BrowserMessageWriter,
  Connection,
  createConnection,
  InitializeResult,
  MarkupKind,
  TextDocuments,
  TextDocumentSyncKind,
} from 'vscode-languageserver/browser';
import { TextDocument } from 'vscode-languageserver-textdocument';

type FP<F extends (...args: any) => any> = Parameters<F>[0];

export class Context {
  // WebWorker connection
  public connection!: Connection;

  // Create a simple text document manager.
  public documents!: TextDocuments<TextDocument>;

  // constructor
  public constructor() {
    const messageReader = new BrowserMessageReader(self);
    const messageWriter = new BrowserMessageWriter(self);

    this.connection = createConnection(messageReader, messageWriter);
    this.documents = new TextDocuments(TextDocument);
    // Make the text document manager listen on the connection
    // for open, change and close text document events
    this.documents.listen(this.connection);

    // Lifecycle hooks
    this.connection.onInitialize(this.onInitialize);
    this.connection.onInitialized(this.onInitialized);

    // Command hooks
    this.connection.onSignatureHelp(this.onSignatureHelp);
    // this.connection.onCompletion(this.onCompletion);
    this.connection.onHover(this.onHover);
  }

  public listen() {
    this.connection.listen();
  }

  private onInitialize: FP<Connection['onInitialize']> = (params) => {
    console.log('Solidity Language Server initialize:', params);
    const result: InitializeResult = {
      serverInfo: {
        name: 'Solidity Language Server',
      },
      capabilities: {
        textDocumentSync: TextDocumentSyncKind.Incremental,
        // Tell the client that this server supports code completion.
        // completionProvider: {
        //   triggerCharacters: ['.', '/', '"', "'", '*'],
        // },
        // signatureHelpProvider: {
        //   triggerCharacters: ['(', ','],
        // },
        definitionProvider: false,
        typeDefinitionProvider: false,
        referencesProvider: false,
        implementationProvider: false,
        renameProvider: false,
        codeActionProvider: false,
        hoverProvider: true,

        workspace: {
          workspaceFolders: {
            supported: false,
            changeNotifications: false,
          },
        },
      },
    };
    return result;
  };

  private onInitialized: FP<Connection['onInitialized']> = () => {
    console.log('Solidity Language Server initialized.');
  };

  private onSignatureHelp: FP<Connection['onSignatureHelp']> = () => {
    return null;
  };

  // private onCompletion: FP<Connection['onCompletion']> = (params) => {
  //   return {};
  // };

  private onHover: FP<Connection['onHover']> = (params) => {
    console.log('onHover', params);
    return {
      // contents: {
      //   kind: MarkupKind.PlainText,
      //   // value: ['```solidity', 'hhh', '```'].join('\n'),
      //   value: ['demo'].join('\n'),
      // },
      contents: 'hello world',
    };
  };
}
