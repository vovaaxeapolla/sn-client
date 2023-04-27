export default function readFiles(files: FileList, setState: Function) {
    let readers = [];
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        readers.push(new FileReader());
        readers[i].onload = function () {
            setState((p: string[]) => [...p, this.result as string]);
        }
        readers[i].readAsDataURL(file);
    }
}