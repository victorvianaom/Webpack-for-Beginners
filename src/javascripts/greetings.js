function sayHello() {
    let tool = 'webpack'
    alert(`Hello I am ${tool}, Im watching you!`)
    console.log('Can you find me?')
}

//module.exports = sayHello ////this is old JS
export { sayHello }