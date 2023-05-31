import React from "react";
import { useState } from "react";
import LoadingAnim from "../../js/LoadingAnim";
import LineData, { LineType } from "./Line/LineData";
import Parser from './Parser/CLIParser';
import ConsoleStore from "../../store/ConsoleStore";
import { observer } from "mobx-react-lite";
import LinesStore from "../../store/LinesStore";

interface ConsoleInputProps {
  linesStore: LinesStore
}


const ConsoleInput = React.forwardRef<HTMLInputElement, ConsoleInputProps>(({ linesStore }, reference) => {

  const ref = reference as React.RefObject<HTMLInputElement>

  const [inputValue, setInputValue] = useState("");

  const consoleParser = (value: string) => {
    linesStore.add(new LineData(LineType.TEXT, <><span className="dyer-green">{"Entered -> "}</span>{value}</>));
    let newLines = [];
    const ConsoleParser = new Parser(linesStore);
    let p = ConsoleParser.start(value);
    if (p) {
      if (Array.isArray(p)) {
        for (let i of p)
          newLines.push(i);
      } else {
        newLines.push(p);
      }
    }
    LoadingAnim(newLines, linesStore.add.bind(linesStore));
  }

  const ConsoleInputHandler = (event: React.ChangeEvent<HTMLInputElement> & React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.target.value) {
      ConsoleStore.setHistory(
        [...ConsoleStore.history.previous, inputValue],
        ConsoleStore.history.previous.length + 1
      );
      consoleParser(inputValue);
      setInputValue("");
      event.target.blur();
      event.target.focus();
      if (ref?.current)
        ref.current.scrollIntoView({ block: 'end' });
    }
    if (event.key === "ArrowDown") {
      if (ConsoleStore.history.previous.length > 0 && ConsoleStore.history.current - 1 >= 0) {
        ConsoleStore.setHistoryCurrent(ConsoleStore.history.current - 1);
        setInputValue(ConsoleStore.history.previous[ConsoleStore.history.current]);
      }
    }
    if (event.key === "ArrowUp") {
      if (ConsoleStore.history.previous.length > 0 && ConsoleStore.history.current + 1 < ConsoleStore.history.previous.length) {
        ConsoleStore.setHistoryCurrent(ConsoleStore.history.current + 1);
        setInputValue(ConsoleStore.history.previous[ConsoleStore.history.current]);
      }
    }
  }

  return (
    <div className="console-inputline">
      <span className="unselectable" style={{ display: 'flex', alignItems: 'center' }}>{">>"}</span>
      <input
        className="console-input"
        value={inputValue}
        ref={ref}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={ConsoleInputHandler}
        autoFocus
      />
    </div>
  );
})

export default observer(ConsoleInput);