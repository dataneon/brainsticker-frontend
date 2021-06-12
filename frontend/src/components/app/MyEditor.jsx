import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

function MyEditor() {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

return (
    <Editor EditorState={editorState} onChange={setEditorState} />
    
)
}

// ReactDOM.render(<MyEditor />, document.getElementById('container'));

export default MyEditor;

