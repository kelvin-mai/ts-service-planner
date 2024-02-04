import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Converter } from 'showdown';

const converter = new Converter();

export const useRichTextEditor = (content: string) => {
  const initial = converter.makeHtml(content);
  const editor = useEditor({
    content: initial,
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        className: 'force-no-outline',
      },
    },
  });

  return {
    editor,
    getInitial: () => initial,
    getContent: () => converter.makeMarkdown(editor?.getHTML() || ''),
  };
};
