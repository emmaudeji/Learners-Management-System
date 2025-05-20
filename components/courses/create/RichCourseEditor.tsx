'use client';

import { useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your course content here...</p>',
  });

  return <EditorContent editor={editor} />;
};

export default TiptapEditor;
