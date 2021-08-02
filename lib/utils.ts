export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function wait(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
