import React, { forwardRef, useState, useEffect } from "react";

interface ContentEditableProps {
    className?: string
    placeholder?: string
    onKeyDown?: (e: React.KeyboardEvent) => any
}

function replaceCaret(element: HTMLElement, pos: number) {
    let isTargetFocused = document.activeElement === element;
    if (isTargetFocused) {
        let sel = window.getSelection();
        if (sel !== null) {
            let range = document.createRange();
            if (element.childNodes[0]) {
                range.setEnd(element.childNodes[0], pos);
            } else {
                range.setEnd(element, 0);
            }
            range.collapse();
            sel.removeAllRanges();
            sel.addRange(range);
        }
        element.focus();
    }
}

const ContentEditable = forwardRef<HTMLDivElement, ContentEditableProps>((
    { className, placeholder = '', onKeyDown }, reference) => {

    const ref = reference as React.MutableRefObject<HTMLDivElement | null>;

    const [caret, setCaret] = useState(0);

    useEffect(() => {
        if (ref?.current) {
            replaceCaret(ref.current, caret);
        }
    }, [ref.current?.textContent]);

    function clipboardHandler(e: React.ClipboardEvent, type: 'paste' | 'cut') {
        e.preventDefault();
        if (ref?.current) {
            const selection = document.getSelection();
            if (selection) {
                let oldRange = selection.getRangeAt(0);
                let anchor = oldRange.startOffset;
                let focus = oldRange.endOffset;
                let text = ref.current.textContent || '';
                if (type === 'cut')
                    navigator.clipboard.writeText(text.substring(anchor, focus));
                selection.deleteFromDocument();
                selection.removeAllRanges();
                text = ref.current.textContent || '';
                ref.current.textContent =
                    text.substring(0, anchor) +
                    (type === 'paste' ? e.clipboardData.getData('text/plain') : '') +
                    text.substring(anchor);
                let newCaret = anchor + (type === 'paste' ? e.clipboardData.getData('text/plain').length : 0);
                if (newCaret === caret) {
                    replaceCaret(ref.current, newCaret);
                } else {
                    setCaret(newCaret);
                }

            }
        }
    }

    function handlerInput(e: React.FormEvent) {
        e.preventDefault()
        const selection = document.getSelection();
        if (selection) {
            let range = selection.getRangeAt(0);
            setCaret(range.startOffset);
        }
    }



    return (
        <div
            suppressContentEditableWarning
            ref={ref}
            onCut={(e) => clipboardHandler(e, 'cut')}
            onPaste={(e) => clipboardHandler(e, 'paste')}
            onInput={handlerInput}
            onKeyDown={onKeyDown}
            className={className}
            contentEditable
            data-placeholder={placeholder}
        />
    );
});

export default ContentEditable;