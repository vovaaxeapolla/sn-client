import { makeAutoObservable } from "mobx";

class ConsoleStore {

    version = "Version 14.01.2023"
    history: { previous: string[], current: number } = { previous: [], current: -1 }

    constructor() {
        makeAutoObservable(this);
    }

    setHistory(previous: string[], current: number) {
        this.history = { previous, current };
    }

    setHistoryPrevious(previous: string[]) {
        this.history = { previous: previous, current: this.history.current };
    }

    setHistoryCurrent(current: number) {
        this.history = { previous: this.history.previous, current: current };
    }
}

export default new ConsoleStore();