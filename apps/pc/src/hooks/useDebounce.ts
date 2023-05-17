type FnReturnValueType = any
type FnType = (...arg: any[]) => FnReturnValueType

const debounce = (fn: FnType, ms: number) => {
  let timer: any;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, ms)
  }
}

const useDebounce = (fn: FnType, ms: number) => {
  return debounce(fn, ms)
}

export default useDebounce;

