import ConsoleInput from "./ConsoleInput";
import "./Console.css";
import React from 'react';
import ConsoleScreen from "./ConsoleScreen";
import { useEffect, useState, useRef } from "react";
import LineData from "./Line/LineData";
import { TextCollection } from "./DefaultTexts/TextCollection";
import { observer } from "mobx-react-lite";
import LinesStore from "../../store/LinesStore";
import LoadingAnim from "../../js/LoadingAnim";
const Console = observer(() => {

  const [linesStore] = useState(() => new LinesStore());

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    LoadingAnim([
      ...LineData.ParseLines(TextCollection.TITLE),
      ...LineData.ParseLines(TextCollection.ABOUT),
    ], linesStore.add.bind(linesStore));
  }, [linesStore]);

  const ConsoleMouseHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    let selection = document.getSelection();
    if (selection?.anchorOffset === selection?.focusOffset && inputRef.current) {
      inputRef.current.scrollIntoView({ block: 'end' });
      inputRef.current.focus();
    }
  }

  return (
    <div className="console" onMouseUp={ConsoleMouseHandler}>
      <div className="console-container">
        <ConsoleScreen lines={linesStore.lines} />
        <ConsoleInput ref={inputRef} linesStore={linesStore} />
      </div>
    </div>
  );
});

export default Console;