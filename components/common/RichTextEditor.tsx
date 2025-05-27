'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import DOMPurify from 'dompurify'
import clsx from 'clsx'
import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

const cModules = {
  toolbar: [
    // Font family and size
    [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],

    // Heading levels
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    // Text styles
    ['bold', 'italic', 'underline', 'strike'],

    // Subscript / superscript
    [{ script: 'sub' }, { script: 'super' }],

    // Blockquote and code
    ['blockquote', 'code-block'],

    // Lists and indentation
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],

    // Text alignment
    [{ align: [] }],

    // Text & background color
    [{ color: [] }, { background: [] }],

    // Media and link - add 'video'
    ['link', 'image', ],

    // Math formula (if enabled in Quill build)
    ['formula'],

    // Clear formatting
    ['clean'],
  ],
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'script',
  'blockquote',
  'code-block',
  'list',
  'indent',
  'align',
  'color',
  'background',
  'link',
  'image',
  'formula',
];



interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  disabled?: boolean
  modules?:any
}
export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  className,
  disabled,
  modules=cModules,
  placeholder = "Write your content here..."
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <div className="min-h-[300px] border p-4 rounded-md bg-gray-50">Loading editor...</div>

  return (
    <div className={clsx(' ',)}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        readOnly={disabled}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className={clsx(' ', className)}
      />
    </div>
  )
}


interface RichTextReadProps {
  content: string
  className?: string
}

// export const RichTextRead: React.FC<RichTextReadProps> = ({
//   content,
//   className,
// }) => {
//   return (
//     <div
//       className={clsx(
//         'prose prose-lg max-w-none prose-slate dark:prose-invert',
//         className
//       )}
//       dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
//     />
//   )
// }
// 'use client'

 

interface RichTextReadProps {
  content: string;
  className?: string;
}

export function RichTextRead({ content, className }: RichTextReadProps) {
  const [sanitized, setSanitized] = useState('');

  useEffect(() => {
    // DOMPurify only works in the browser
    if (typeof window !== 'undefined') {
      setSanitized(DOMPurify.sanitize(content));
    }
  }, [content]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
