import type { FC } from 'react';
import type { Editor } from '@tiptap/react';
import {
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonStrikethrough,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditorProvider,
  RichTextField,
} from 'mui-tiptap';

type RichTextEditorProps = {
  editor: Editor | null;
};

export const RichTextEditor: FC<RichTextEditorProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <RichTextEditorProvider editor={editor}>
      <RichTextField
        controls={
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuButtonStrikethrough />
            <MenuButtonOrderedList />
            <MenuButtonBulletedList />
            <MenuButtonCode />
            <MenuButtonCodeBlock />
            <MenuDivider />
            <MenuButtonRedo />
            <MenuButtonUndo />
          </MenuControlsContainer>
        }
      />
    </RichTextEditorProvider>
  );
};
