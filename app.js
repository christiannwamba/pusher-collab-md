class App {
  constructor() {
    this.textSyncInstance = null;
    this.$ = $;
    this.md = markdownit();
    this.setupTextSync();
  }

  setupTextSync() {
    this.textSyncInstance = new TextSync({
      instanceLocator: 'v1:us1:d50eab0e-8d45-4b90-bdbe-bb9ad02bf18c'
    });
    this.textSyncEditor = this.textSyncInstance.createEditor({
      docId: 'my-first-document',
      element: '.editor',
      // richText: false
    })
    this.textSyncEditor.then(this.handleTextSyncReady.bind(this));
  }
  
  handleTextSyncReady(editor) {
    console.log(editor);
    this.updateEditorHeader()
    this.startParsingInterval(editor);
  }

  updateEditorHeader() {
    $('.ql-formats').css({'display': 'none'});
    $('<span class="has-text-weight-semibold">Go markdown</span>').prependTo('.ql-toolbar');
  }

  startParsingInterval(editor) {
    setInterval(() => {
      this.parseMarkdown(editor);
    }, 3000)
  }

  parseMarkdown(editor) {
    const rawMdText = editor.getText();
    const parsedMdContent = this.md.render(rawMdText);
    console.log(parsedMdContent);
    $('.preview__content').html(parsedMdContent);
  }
}

(new App());