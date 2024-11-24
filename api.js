let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

let a = []

for (let i = 0; i < numbers.length; i++) {
    // a.push(numbers[i] * 2)
    // console.log("objectssss", numbers[i])
}

// console.log("object", a)


for (let number of numbers) {
    // console.log("objezzzzzzzzzct", a.push(number * 0))
}

let object = { a: 1, b: 1, c: 1, d: 1202020202, e: 1 }

for (let key in object) {
    console.log("object", key, object[key])
}

