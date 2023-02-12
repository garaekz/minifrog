import type { JSX } from "preact";
import { forwardRef, PropsWithChildren, Ref } from "preact/compat"
import {
  Editor,
  Transforms,
  Element as SlateElement,
} from "slate";
import type { BaseEditor } from "slate";
import { useSlate } from "slate-react";
import { Icon} from "../components/EditorComponents.tsx";
import type { BaseProps, OrNull, HtmlEditor, ListItemElement, ParagraphElement  } from "../libs/types.ts";
import type { BaseElement } from "slate";

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

export const Button = forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean
        reversed: boolean
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <span
      {...props}
      ref={ref}
      className={`cursor-pointer text-${reversed
        ? active
          ? 'white'
          : 'gray-500'
        : active
        ? 'black'
        : 'gray-200'} ${className || ''}`}
    />
  )
)

export const BlockButton = ({ format, icon }: { format: string; icon: JSX.Element }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export const MarkButton = ({ format, icon }: { format: string; icon: JSX.Element }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

interface BaseElementWithIndexSignature extends BaseElement {
  [key: string]: unknown;
}

const isBlockActive = (editor: HtmlEditor, format: string, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as BaseElementWithIndexSignature)[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor: HtmlEditor, format: string) => {
  const marks = Editor.marks(editor) as Record<string, null>;
  return marks ? marks[format] === true : false;
};

const toggleBlock = (editor: HtmlEditor, format: string) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type as string) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<ParagraphElement | ListItemElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<Element>(editor, newProperties);

  if (!isActive && isList) {
    const block: Element = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};


const toggleMark = (editor: BaseEditor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};