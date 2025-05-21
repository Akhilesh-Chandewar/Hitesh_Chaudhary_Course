let computer = {
    cpu : 12
};

let lenovo = {
    screen : "HD",
    __proto__ : computer
};

let tomHardware = {}

console.log('computer', computer.__proto__);
console.log('lenovo', lenovo.__proto__);

const genericCar = {
    wheels: 4,
}

const tesla = {
    driver : "Ai"
}

Object.setPrototypeOf(tesla, genericCar);
console.log('tesla', tesla.wheels); // 4