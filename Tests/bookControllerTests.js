/*
Gulp Test

Test code voor bookcontroller
npm install gulp-mocha should sinon --save
     - Gulp is wat we gebruiken om onze mocha test te runnen.
     - should is een "assertion framework"
     - Sinon, onze mocking frame
*/

//Roep geinstalleerde dingen op
let should = require('should'),
    sinon = require('sinon');

describe('Book Controller Test;', function(){
    describe('Post', function(){                        //Describe post method of book controller
        it('Should not allow an empty title on post', function(){
            let Book = function(book){
                this.save = function(){};
            }
            let req = {                                             //Request has to contain a body with data
                body: {
                    author: 'Jon'
                }
            }

            let res = {
                //Spy keeps track of how many times something is called. 
                status: sinon.spy(),
                send: sinon.spy()
            }


            let bookController = require('../controllers/bookController')(Book);
            bookController.post(req,res);                                           //We versturen een req zonder titel

            //Check if status is called and with what. 
            res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0][0]);
            /*
                - 400 is een bad request die een true/false alleen terug kan geven
                - het antwoord zou true moeten zijn met het berricht ' bad status.
                - args is een array van elke keer dat de functie is opgeroepen 
                  & wat de argumenten waren toen het opgeroepen werd.
                
                - Conclusie; je krijgt een error-message dat zegt; "Dit is opgeroepen 
                met een slechte status, dit is wat de status was. 
            */

            res.send.calledWith('Title is required.').should.equal(true);
        })
    })
})