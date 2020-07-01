//var sayHello = require('./greetings.js') ////this is old JS
import { sayHello } from './greetings.js'
//import { application } from '../stylesheets/application.scss'
import { application } from 'CssFolder/application.scss'
import $ from 'jquery-3.5.1.js'

sayHello()

$('body').append('<div style="background: yellow; padding: 20px;">Hello jQuery!</div>')