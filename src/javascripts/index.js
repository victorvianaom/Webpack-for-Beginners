//var sayHello = require('./greetings.js') ////this is old JS
import { sayHello } from './greetings.js'
//import { application } from '../stylesheets/application.scss'
import { application } from 'CssFolder/application.scss'
import $ from 'jquery'
//import 'bootstrap/dist/css/bootstrap.css' // I imported in the aplication.scss file
import 'bootstrap' // this is the JS file, as the "main" in the package json of bootstrap determins
import 'jquery-ui'//I need to import jquery-ui before importing the widgets
//import 'jquery-ui/ui/widgets/draggable'
//import 'jquery-ui/ui/widgets/droppable'
import 'jquery-ui/ui/widgets/datepicker'
import Quill from 'quill'

var quill = new Quill('#editor', {
    theme: 'snow'
})

$('#datepicker').datepicker()
$('[data-toggle="tooltip"]').tooltip()

if (module.hot) {
    module.hot.accept(/*function (err) {
        console.log(err)
    }*/)
}

$('body').append('<div style="background: green; padding: 20px;">Hello jQuery!</div>')

sayHello()