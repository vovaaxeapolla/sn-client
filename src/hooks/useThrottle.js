export default function useThrottle(callback, ms) {
    let isDone = true, savedThis = null, savedArgs = null;
    return function () {
        if (isDone) {
            isDone = false;
            callback.apply(this, arguments)
            setTimeout(() => {
                if(savedArgs){
                    callback.apply(savedThis, savedArgs)
                }
                isDone = true
            }, ms)
        }else{
            savedArgs = arguments
            savedThis = this
        }
    }
}