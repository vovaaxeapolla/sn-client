import React from "react";
import classes from './Line.module.css';
import { LineType } from './LineData';
import { observer } from "mobx-react-lite";

interface LineProps {
    type: LineType,
    children: React.ReactNode
    className: string
}

const Line = observer(({ type, children, className }: LineProps) => {
    function handler() {
        switch (type) {
            case LineType.TEXT:
                return <span className={classes.default}>{children}</span>;
            case LineType.BREAK:
                return (
                    <div className={classes.break + ' ' + className}>
                        ---{children ? " " : ""}{children}{children ? " " : ""}{"".padEnd(256, '-')}
                    </div>);
            case LineType.SPACE:
                return <></>;
            case LineType.ERROR:
                return <span className='dyer-red'>{children}</span>;
            default: return <span className='dyer-red'>Ошибка! Несуществующее определение строки!</span>;
        }
    }
    return (
        <pre className={classes.line}>
            {handler()}
        </pre>
    );
})

export default Line;