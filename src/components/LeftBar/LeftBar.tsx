import './LeftBar.css';
import { ReactNode } from 'react';

const LeftBar = ({ children }: { children?: ReactNode }) => {
    return (
        <div className="leftbar">
            {children}
        </div>
    )
}

export default LeftBar;