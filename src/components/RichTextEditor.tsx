'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Extension } from '@tiptap/core';
import Color from '@tiptap/extension-color';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  //   Palette,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const TabIndent = Extension.create({
  name: 'tabIndent',

  addKeyboardShortcuts() {
    return {
      Tab: () => {
        return this.editor.commands.insertContent('    ');
      },
    };
  },
});

const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Start writing...',
  className = '',
}: RichTextEditorProps) => {
  const normalizeHtml = (html: string) => {
    if (!html) return html;
    let out = html;
    // Convert divs to paragraphs (common when pasting from Google Docs)
    out = out.replace(/<div([^>]*)>/gi, '<p$1>');
    out = out.replace(/<\/div>/gi, '</p>');
    // Convert sequences of two or more <br> into paragraph breaks
    out = out.replace(/(<br\s*\/?>\s*){2,}/gi, '</p><p>');
    // Replace empty paragraphs with a non-breaking space so they render
    out = out.replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '<p>&nbsp;</p>');
    // Trim leading/trailing whitespace
    out = out.trim();
    return out;
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline, Color, TabIndent],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const raw = editor.getHTML();
      onChange(normalizeHtml(raw));
    },
    editorProps: {
      attributes: {
        class: `max-w-none p-4 min-h-[200px] focus:outline-none text-white ${className}`,
      },
    },
  });

  if (!editor) {
    return null;
  }

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  return (
    <div className="border border-[#FFC300]/20 rounded-xl bg-[#1a1a1a] overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b border-[#FFC300]/10 bg-[#232323]">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive('bold')
              ? 'bg-[#FFC300]/20 text-[#FFC300]'
              : 'text-white hover:bg-[#FFC300]/10'
          }`}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive('italic')
              ? 'bg-[#FFC300]/20 text-[#FFC300]'
              : 'text-white hover:bg-[#FFC300]/10'
          }`}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive('underline')
              ? 'bg-[#FFC300]/20 text-[#FFC300]'
              : 'text-white hover:bg-[#FFC300]/10'
          }`}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-[#FFC300]/20 mx-1" />
        {/* <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => setColor('#FFC300')}
          className="h-8 w-8 p-0 text-white hover:bg-[#FFC300]/10"
          title="Yellow Text"
        >
          <Palette className="h-4 w-4" />
        </Button> */}
      </div>

      <EditorContent
        editor={editor}
        className="text-white"
        placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;
