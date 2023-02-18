import { FC, useState } from "react";
import './Img.css';

interface ImgProps {
    url: string;
    alt: string;
}

const Img: FC<ImgProps> = ({ url, alt }) => {

    const [full, setFull] = useState<boolean>(false);

    return (
        <div className="img__wrapper"
            onClick={() => setFull(!full)}>
            <img className="img" src={url} alt={alt} />
            {full &&
                <div className="img__full">
                    <img className="img" src={url} alt={alt} />
                </div>}
        </div>
    );
}

export default Img;