export default function useDebounce(callback, ms){
    let isDone = true;
    return function(){
      if(isDone){
        isDone = false;
        callback.apply(this,arguments)
        setTimeout(() => isDone = true, ms);
    };
  }
}