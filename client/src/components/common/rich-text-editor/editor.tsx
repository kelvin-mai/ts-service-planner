import type { FC } from 'react';
import { ButtonGroup, Divider, styled } from '@mui/material';
import { type Editor, EditorContent as TipTapEditorContent, FloatingMenu } from '@tiptap/react';

import { MenuBar, MiniMenuBar } from './menu-bar';

const EditorContent = styled(TipTapEditorContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  overflowY: 'hidden',
  '& .tiptap': {
    border: 1,
    borderStyle: 'solid',
    marginTop: theme.spacing(1),
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    height: 'auto',
    overflow: 'hidden',
    padding: theme.spacing(2),
    'ProseMirror-focused': {
      outline: 'none',
    },
    ':focused': {
      backgroundColor: 'transparent',
      borderColor: theme.palette.primary.main,
      boxShadow: `${theme.palette.primary.main} 0 0 0 2px`,
    },
    ':active': {
      backgroundColor: 'transparent',
      borderColor: theme.palette.primary.main,
      boxShadow: `${theme.palette.primary.main} 0 0 0 2px`,
    },
  },
}));
type RichTextEditorProps = {
  editor: Editor | null;
};

export const RichTextEditor: FC<RichTextEditorProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <MenuBar editor={editor} />
      <Divider />
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>
        <ButtonGroup variant='contained'>
          <MiniMenuBar editor={editor} />
        </ButtonGroup>
      </FloatingMenu>
    </>
  );
};
