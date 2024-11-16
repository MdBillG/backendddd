const radius = [1, 2, 3, 4]

const area = function (radius) {
    let output = []
    for (let i = 0; i < radius.length; i++) {
        output.push(radius[i] * radius[i])
    }
    return output
}

// console.log(area(radius))

const sum = function (radius) {
    let output = []
    for (let i = 0; i < radius.length; i++) {
        output.push(radius[i] + radius[i])
    }
    return output
}

// console.log(sum(radius))

const product = function (radius) {
    let output = []
    for (let i = 0; i < radius.length; i++) {
        output.push(radius[i] - radius[i])
    }
    return output
}

// console.log(product(radius))


const sumLogic = function (radius) {
    return radius + radius

}


function commanFunction(radius, abc, sumLogic) {
    let output = []
    for (let i = 0; i < radius.length; i++) {
        if (abc === 'sum') {
            output.push(sumLogic(radius[i]))
        }
        else if (abc === 'product') {
            output.push(radius[i] * radius[i])
        }
    }
    return output
}
console.log(commanFunction(radius, 'sum', sumLogic))


console.log("sdas", radius.map(sumLogic))


const arr = [1, 2, 3, 4, 5, 6]