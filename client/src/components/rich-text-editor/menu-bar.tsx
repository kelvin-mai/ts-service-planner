import { useState, type FC, MouseEvent } from 'react';
import type { Editor } from '@tiptap/react';
import { Button, ButtonGroup, IconButton, SvgIcon, Menu, MenuItem, Stack } from '@mui/material';
import {
  BoldSquare,
  Code02,
  CodeSquare01,
  CornerDownLeft,
  FlipBackward,
  FlipForward,
  ItalicSquare,
  Minus,
  StrikethroughSquare,
} from '@untitled-ui/icons-react';

type MenuBarProps = {
  editor: Editor;
};

type EditorTag =
  | {
      type: 'paragraph';
    }
  | {
      type: 'heading';
      level: any;
    };

const TagMenu: FC<MenuBarProps> = ({ editor }) => {
  const [el, setEl] = useState<HTMLElement | null>(null);
  const open = Boolean(el);
  const [tag, setTag] = useState<EditorTag>({ type: 'paragraph' });
  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setEl(e.currentTarget);
  };

  const setEditorTag = (t: EditorTag) => {
    setTag(t);
    if (t.type === 'heading') {
      editor.chain().focus().toggleHeading({ level: t.level });
    } else {
      editor.chain().focus().setParagraph().run();
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        color='inherit'
      >
        {tag.type === 'paragraph' ? 'Paragraph' : `Heading ${tag.level}`}
      </Button>
      <Menu
        open={open}
        onClose={() => setEl(null)}
        anchorEl={el}
      >
        <MenuItem onClick={() => setEditorTag({ type: 'paragraph' })}>Paragraph</MenuItem>
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <MenuItem
            key={level}
            onClick={() => setEditorTag({ type: 'heading', level })}
          >
            Heading {level}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export const MenuBar: FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <Stack
      direction='row'
      spacing={2}
    >
      <TagMenu editor={editor} />
      <ButtonGroup variant='contained'>
        <MiniMenuBar editor={editor} />
        {/* <button
          type='button'
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          clear marks
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          clear nodes
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          bullet list
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          ordered list
        </button> */}
        <IconButton
          type='button'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <SvgIcon>
            <Code02 />
          </SvgIcon>
        </IconButton>
        <IconButton
          type='button'
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <SvgIcon>
            <Minus />
          </SvgIcon>
        </IconButton>
        <IconButton
          type='button'
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          <SvgIcon>
            <CornerDownLeft />
          </SvgIcon>
        </IconButton>
        <IconButton
          type='button'
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <SvgIcon>
            <FlipForward />
          </SvgIcon>
        </IconButton>
        <IconButton
          type='button'
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <SvgIcon>
            <FlipBackward />
          </SvgIcon>
        </IconButton>
      </ButtonGroup>
    </Stack>
  );
};

export const MiniMenuBar: FC<MenuBarProps> = ({ editor }) => {
  return (
    <>
      <IconButton
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        color={editor.isActive('bold') ? 'primary' : 'default'}
      >
        <SvgIcon>
          <BoldSquare />
        </SvgIcon>
      </IconButton>
      <IconButton
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        color={editor.isActive('italic') ? 'primary' : 'default'}
      >
        <SvgIcon>
          <ItalicSquare />
        </SvgIcon>
      </IconButton>
      <IconButton
        type='button'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        color={editor.isActive('strike') ? 'primary' : 'default'}
      >
        <SvgIcon>
          <StrikethroughSquare />
        </SvgIcon>
      </IconButton>
      <IconButton
        type='button'
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
        color={editor.isActive('code') ? 'primary' : 'default'}
      >
        <SvgIcon>
          <CodeSquare01 />
        </SvgIcon>
      </IconButton>
    </>
  );
};
