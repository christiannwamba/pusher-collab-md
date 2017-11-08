class App {
  constructor() {
    this.textSyncInstance = null;
    this.$ = $;
    this.setupTextSync();
  }

  setupTextSync() {
    this.textSyncInstance = new TextSync({
      instanceLocator: 'v1:us1:d50eab0e-8d45-4b90-bdbe-bb9ad02bf18c'
    });
    this.textSyncInstance.createEditor({
      docId: 'my-first-document',
      element: '.editor'
    }).then(this.handleTextSyncReady.bind(this));
  }

  updateEditorHeader() {
    $('.ql-formats').css({'display': 'none'});
    $('<span class="has-text-weight-semibold">Go markdown</span>').prependTo('.ql-toolbar');
  }

  handleTextSyncReady() {
    this.updateEditorHeader()
  }
}

(new App());