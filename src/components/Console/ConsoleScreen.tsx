import React from "react";
import Line from "./Line/Line";
import { observer } from "mobx-react-lite";
import LineData from "./Line/LineData";

const ConsoleScreen = observer(({ lines }: { lines: LineData[] }) => {
    return (
        <div className="console-screen">
            {Array.isArray(lines) && lines.map((line, index) =>
                <Line type={line.type} key={index} {...line.props}>{line.children}</Line>
            )}
        </div>
    );
})

export default ConsoleScreen;