import $ from 'jquery'

export function sayHello() {//I put export befor 'function' so there`s no need to put that export{ sayHello } bellow
    let tool = 'webpack'
    alert(`Hello I am ${tool}, Im watching you!`)
    console.log('Can you find me?')

    $('body').append('<div style="background: #EEE;">Does jQuery exist here?</div>')
}

//module.exports = sayHello ////this is old JS
//export { sayHello }