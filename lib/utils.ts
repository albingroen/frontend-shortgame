export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function wait(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
