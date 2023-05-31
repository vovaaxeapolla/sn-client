import { useState, useEffect } from "react";
export default function useDrag(ref) {

    const [isClicked, setIsClicked] = useState(false);

    const [startPosition, setStartPosition] = useState({ shiftX: null, shiftY: null });

    const [position, setPosition] = useState({ left: null, top: null });

    function onMouseDown(e) {
        if (e.target === ref.current) {
            setIsClicked(true);
            setStartPosition(
                {
                    shiftX: e.clientX - ref.current.getBoundingClientRect().left,
                    shiftY: e.clientY - ref.current.getBoundingClientRect().top
                });
        }
    }

    function onMouseMove(e) {
        e.preventDefault();
        if (isClicked) {
            setPosition(
                {
                    left: e.pageX - startPosition.shiftX + 'px',
                    top: e.pageY - startPosition.shiftY + 'px'
                });
        }
    }

    function onMouseUp() {
        setIsClicked(false);
    }

    useEffect(() => {
        if (!ref.current)
            return;
        const node = ref.current;
        document.addEventListener('mouseup', onMouseUp)
        node.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mousemove', onMouseMove);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp)
            node.removeEventListener('mousedown', onMouseDown)
        }
    });

    return position;
}