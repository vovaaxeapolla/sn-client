import { Constants } from "../DefaultTexts/Constants";
import { TextCollection } from "../DefaultTexts/TextCollection";
import LineData, { LineType } from "../Line/LineData";
import MathParser from "./MathParser";
import ConsoleStore from "../../../store/ConsoleStore";

interface CLIFunctionsArgs {
    store?: any;
    texts?: string[];
    flags?: string[];
    args?: string[];
}

const CLIFunctions = {
    clear: ({ store }: CLIFunctionsArgs) => store.clear(),
    wipe: () => ConsoleStore.setHistory([], -1),
    help: () => LineData.ParseLines(TextCollection.HELP),
    // todo: ({ store, texts, flags }: CLIFunctionsArgs) => {
    //     if (flags.includes('g')) {
    //         return LineData.ParseLines(<>{ localStorage.getItem(1) } < />);
    //     }
    //     if (flags.includes('s')) {
    //         localStorage.setItem();
    //     }
    //     localStorage.setItem(1, 2);
    //     return LineData.ParseLines(<>{ localStorage.getItem(1) } < />);
    // },
    // get: ({ args }: CLIFunctionsArgs) => {
    //     if (!args)
    //         return new LineData(LineType.ERROR, "Функция вызвана без аргументов");
    //     if (Constants[args[0]])
    //         return new LineData(LineType.TEXT, Constants[args[0]]);
    //     else
    //         return new LineData(LineType.ERROR, "Недопустимый аргумент для этой функции, используйте help, чтобы узнать больше");
    // },
    // set: ({ args, texts: CLIFunctionsArgs) => {
    //     function validURL(str) {
    //         var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    //             '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    //             '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    //             '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    //             '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    //             '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    //         return !!pattern.test(str);
    //     }
    //     if (args[0] === 'title') {
    //         document.title = texts[0];
    //     }
    //     if (args[0] === 'bg') {
    //         if (validURL(texts[0])) {
    //             document.documentElement.style.setProperty("--console-bg", `url('${texts[0]}')`);
    //         } else {
    //             document.documentElement.style.setProperty("--console-bg", `url(../img/main.jpg)`);
    //         }
    //     }
    // },
    // search: ({ texts }: CLIFunctionsArgs) => {
    //     window.open(`https://yandex.ru/search/?text=${texts[0]}`, 'blank');
    // },
    calc: ({ texts }: CLIFunctionsArgs) => {
        const Parser = new MathParser();
        if (texts) {
            let result = Parser.start(texts[0]);
            return new LineData(LineType.TEXT, result);
        }
    },
    NewYearTree: () => LineData.ParseLines(TextCollection.NEW_YEAR_TREE),
};
export default CLIFunctions;