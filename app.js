class App {
  constructor() {
    // Initialize properties
    this.textSyncInstance = null;
    this.md = markdownit();
    // Prepare TextSync
    this.setupTextSync();
  }

  setupTextSync() {
    // Create an instance of TextSync
    this.textSyncInstance = new TextSync({
      // Unique ID to be shared among connected
      // clients
      instanceLocator: 'v1:us1:d50eab0e-8d45-4b90-bdbe-bb9ad02bf18c'
    });
    this.textSyncEditor = this.textSyncInstance.createEditor({
      // Serves as documents primary keu
      docId: 'my-first-document',
      // What element should I mount the editor?
      // Uses the CSS selector
      element: '.editor'
    })
    // The editor needs to be ready before
    // you can interact with it. It returns
    // a promise so you can pass a callback to
    // take care of resolving the promise
    this.textSyncEditor.then(this.handleTextSyncReady.bind(this));
  }
  
  handleTextSyncReady(editor) {
    console.log(editor.quill)
    // Update editor header with
    // different visuals
    this.updateEditorHeader()
    // Start an interval to parse the markdown file.
    // The promise resolves with a payload, `editor`.
    this.startParsingInterval(editor);
  }

  updateEditorHeader() {
    // Hide the text formatting controls
    // and add a simpler header
    const qlFormats = document.querySelectorAll('.ql-formats');
    const qlToolbar = document.querySelector('.ql-toolbar');
    qlFormats.forEach(qlFormat => qlFormat.style.display = 'none');
    qlToolbar.innerHTML = '<span class="has-text-weight-semibold">Go markdown</span>'
  }

  startParsingInterval(editor) {
    // An interval of 3 seconds
    setInterval(() => {
      // Parse markdown to HTML 
      // every 3 seconds
      this.parseMarkdown(editor);
    }, 3000)
  }

  parseMarkdown(editor) {
    // `editor.get` retrieves the current
    // text in the editor
    const rawMdText = editor.getText();
    // `md.render` parses the MD
    const parsedMdContent = this.md.render(rawMdText);
    // Replace the preview div with the parsed HTML
    const preview = document.querySelector('.preview__content');
    preview.innerHTML = parsedMdContent;
  }
}

// Start App
(new App());