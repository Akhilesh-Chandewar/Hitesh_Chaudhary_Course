const person = {
    name: "John",
    age: 30,
    greet: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

const greetFn = person.greet;
greetFn();

const boundGreetFn = person.greet.bind(person);
boundGreetFn();

person.greet.call({ name: "Jane" });
person.greet.apply({ name: "Jane" });