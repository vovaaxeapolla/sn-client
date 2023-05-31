import { makeAutoObservable } from "mobx";
import LineData from "../components/Console/Line/LineData";

class LinesStore {

    lines: LineData[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    add(line: LineData) {
        if (Array.isArray(line)) {
            line.forEach((e, i) => {
                this.lines.push(e);
            });
        }
        else
            this.lines.push(line);
    }

    remove() {
        this.lines.pop();
    }

    clear() {
        this.lines = [];
    }
}

export default LinesStore;