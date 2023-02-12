import { createEditor, Element as SlateElement } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { useCallback, useMemo } from "preact/hooks";
import { Element, Leaf, Toolbar } from "../components/EditorComponents.tsx";
import { withHtml } from "../components/EditorHelpers.ts";
import { withHistory } from "slate-history";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdCode,
  MdOutlineLooksOne,
  MdOutlineLooksTwo,
  MdFormatQuote,
  MdFormatListNumbered,
  MdFormatListBulleted,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
} from "react-icons/md";
import { BlockButton, MarkButton } from "../components/EditorButtons.tsx";
import type { RenderElementProps, RenderLeafProps } from "slate-react";
import type { Descendant, Operation } from "slate";

export default function CreatePostIsland() {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  const editor = useMemo(
    () => withHtml(withReact(withHistory(createEditor()))),
    []
  );

  const handleContentChange = (data: Descendant[]) => {
    const isAstChange = editor.operations.some(
      (op: Operation) => "set_selection" !== op.type
    );
    if (isAstChange) {
      const content = JSON.stringify(data);
      console.log(content);
    }
  };

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <h1 class="text-4xl font-bold dark:text-gray-200">Create a new post</h1>
      <form method="POST" action="" class="mt-4 flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="title" class="dark:text-gray-200 text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            class="border-gray-300 border-2 rounded-md px-2 py-1"
          />

          <label for="content" class="dark:text-gray-200 text-gray-700">
            Content
          </label>
          <div className="flex flex-col h-full border border-gray-200 dark:border-gray-600 rounded-md">
            <Slate
              editor={editor}
              value={initialValue}
              onChange={(value) => handleContentChange(value)}
            >
              <Toolbar className="sm:top-0 sm:z-10 bg-white dark:bg-gray-600 p-4 text-2xl text-gray-900 dark:text-gray-100 flex-wrap">
                <MarkButton format="bold" icon={<MdFormatBold />} />
                <MarkButton format="italic" icon={<MdFormatItalic />} />
                <MarkButton format="underline" icon={<MdFormatUnderlined />} />
                <MarkButton format="code" icon={<MdCode />} />
                <BlockButton
                  format="heading-one"
                  icon={<MdOutlineLooksOne />}
                />
                <BlockButton
                  format="heading-two"
                  icon={<MdOutlineLooksTwo />}
                />
                <BlockButton format="block-quote" icon={<MdFormatQuote />} />
                <BlockButton
                  format="numbered-list"
                  icon={<MdFormatListNumbered />}
                />
                <BlockButton
                  format="bulleted-list"
                  icon={<MdFormatListBulleted />}
                />
                <BlockButton format="left" icon={<MdFormatAlignLeft />} />
                <BlockButton format="center" icon={<MdFormatAlignCenter />} />
                <BlockButton format="right" icon={<MdFormatAlignRight />} />
                <BlockButton format="justify" icon={<MdFormatAlignJustify />} />
              </Toolbar>
              <Editable
                className="bg-white dark:bg-gray-900 p-4 text-xl text-gray-900 dark:text-gray-100 min-h-[300px] max-h-96 sm:max-h-[600px] overflow-y-auto"
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                autoFocus
              />
            </Slate>
          </div>
          <button
            type="submit"
            class="px-2 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
