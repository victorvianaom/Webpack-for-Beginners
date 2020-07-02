//var sayHello = require('./greetings.js') ////this is old JS
import { sayHello } from './greetings.js'
//import { application } from '../stylesheets/application.scss'
import { application } from 'CssFolder/application.scss'
import $ from 'jquery-3.5.1.js'

if (module.hot) {
    module.hot.accept(/*function (err) {
        console.log(err)
    }*/)
}

sayHello()

$('body').append('<div style="background: white; padding: 20px;">Hello jQuery!</div>')