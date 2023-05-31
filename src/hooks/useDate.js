import { useState, useEffect } from "react";

export default function useDate(){

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        let id = setInterval(() => setDate(new Date()), 1000)
        return () => clearInterval(id);
    });

    return date;
}