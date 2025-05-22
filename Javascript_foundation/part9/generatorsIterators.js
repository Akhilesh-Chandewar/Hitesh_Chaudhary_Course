function* numberGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

let gen = numberGenerator();
console.log(gen)
console.log(gen.next()); // { value: 0, done: false }
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }

console.log(numberGenerator())