import { forwardRef, PropsWithChildren, Ref } from "preact/compat"
import { BaseProps, OrNull } from "../libs/types.ts"
import { jsx } from 'slate-hyperscript'
import { Transforms } from 'slate'


export const Icon = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <span
      {...props}
      ref={ref}
      className={``}
    />
  )
)

export const Menu = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={`relative flex gap-4 ${className}`}
    />
  )
)

export const Toolbar = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={className}
    />
  )
)

export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

export const Element = (props) => {
  const { attributes, children, element } = props

  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote className="p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-600">
          <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
            {children}
          </p>
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} className="space-y-1 list-disc list-inside" {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} className="text-4xl font-bold" {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} className="text-3xl font-bold" {...attributes}>
          {children}
        </h2>
      )
    case 'heading-three':
      return (
        <h3 style={style} className="text-2xl font-bold" {...attributes}>
          {children}
        </h3>
      )
    case 'heading-four':
      return (
        <h4 style={style} className="text-xl font-bold" {...attributes}>
          {children}
        </h4>
      )
    case 'heading-five':
      return (
        <h5 style={style} className="text-lg font-bold" {...attributes}>
          {children}
        </h5>
      )
    case 'heading-six':
      return (
        <h6 style={style} className="text-lg font-semibold" {...attributes}>
          {children}
        </h6>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} className="space-y-1 list-decimal list-inside" {...attributes}>
          {children}
        </ol>
      )
    case 'link':
      return (
        <a href={element.url} className="text-blue-500 hover:underline hover:text-blue-600 dark:hover:text-blue-400 dark:text-blue-300" {...attributes}>
          {children}
        </a>
      )
    case 'image':
      return <ImageElement {...props} />

    default:
      return (
        <p style={style} className="py-2" {...attributes}>
          {children}
        </p>
      )
  }
}

const ImageElement = ({ attributes, children, element }) => {
  return (
    <div {...attributes}>
      {children}
      <img
        src={element.url}
        className={`w-full ${element.align === 'center' ? 'mx-auto' : ''}`}
      />
    </div>
  )
}
