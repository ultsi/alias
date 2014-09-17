'use strict';


angular.module('alias', ["Game", "Words"])

.controller("PageController", function(GameManager){
    this.game = GameManager;
    
    this.page = 0;
    this.maxPages = 10;
    this.isSet = function(page) {
        return this.page === page;
    };
    this.setPage = function(page) {
        this.page = page;
    };
    this.next = function(){
        this.page = this.page + 1 === this.maxPages ? this.page : this.page + 1;
    };
    this.prev = function(){
        console.log('moi');
        this.page = this.page === 0 ? this.page : this.page - 1;
    };
})
        
.controller("SetupController", function(GameManager){
    
    this.game = GameManager;
   
    this.done = function() {
        this.game.nextTurn();
    };
})

.controller("HelpController", ["GameManager", function(GameManager){
    this.game = GameManager;
    
    this.done = function() {
        this.game.currentState = "setup";
    };
}])

.controller("GameController", ["GameManager", "$interval", "WordsManager", 
function(GameManager, $interval, WordsManager){
    this.game = GameManager;
   
    this.cardImages = {
        false: "images/card.png",
        true: "images/empty.png"
    };
    
    this.currentWord = "";
    
    this.nextWord = function(){
        this.currentWord = WordsManager.takeRandomWord();
    };
    
    this.endOfTurn = function(guessed) {
        this.game.currentState = "endofturn";
        WordsManager.lastWord = this.currentWord;
        WordsManager.lastWordGuessed = guessed;
        this.currentWord = "";
    };
    
    this.clickSkip = function(){
        if(!this.game.isTurnLive()) return;
        WordsManager.skippedWords.push(this.currentWord);
        
        if(this.game.canEveryoneGuess()){
            this.endOfTurn(false);
        } else {
            this.nextWord();
        }
    };
    
    this.clickCorrect = function(){
        if(!this.game.isTurnLive()) return;
        if(this.game.canEveryoneGuess()){
            this.endOfTurn(true);
        } else {
            WordsManager.guessedWords.push(this.currentWord);
            this.nextWord();
        }
    };
    
    this.timeText = function(){
        if(this.game.canEveryoneGuess()){
            return "Aika loppui, kaikki tiimit saavat arvata!";
        } else {
            return roundTo(this.game.timeLeft(), 2);
        }
    };
    
    var stop;
    this.startTurn = function(){
        if ( angular.isDefined(stop) || this.game.timeUp() ) return;
        this.game.curtime = 0;
        this.game.guessing = true;
        var ctrl = this;
        
        stop = $interval(function() {
            ctrl.game.curtime = ctrl.game.curtime + 0.105;
            if(ctrl.game.curtime > ctrl.game.settings.timelimit){
                ctrl.stopTimer();
            }
        }, 105);
        this.nextWord();
    };
    
    this.stopTimer = function(){
        if ( angular.isDefined(stop) ){
            $interval.cancel(stop);
            this.game.curtime = -1;
            stop = undefined;
        }
    };
    
}])

.controller("EndofTurnController", ["GameManager", "WordsManager", function(gm, wm){
    this.game = gm;
    this.words = wm;
    
    this.fixAsSkipped = function(key, word){
        this.words.skippedWords.push(word);
        this.words.guessedWords.splice(key, 1);
    };
    
    this.fixAsGuessed = function(key, word){
        this.words.guessedWords.push(word);
        this.words.skippedWords.splice(key, 1);
    };
    
    this.wasLastWordGuessed = function(){
        return this.words.lastWordGuessed; 
    };
    
    this.toNextTurn = function(){
        // give points
        for(var i=0;i<this.words.guessedWords.length;i++){
            this.game.teams[this.game.currentTurn].points += 1;
        }
        
        this.words.guessedWords = [];
        this.words.skippedWords = [];
        // TODO: this.words.lastWordGuessed = false;
        // TODO: this.words.lastWord = "";
        
        this.game.nextTurn();
        
    };
    
}])

.directive("gameHelp", function(){
    return {
        restrict: 'A',
        templateUrl: "view/gamehelp.html",
        controller: "HelpController",
        controllerAs: "help"
    };
})
    
.directive("gameSetup", function(){
    return {
        restrict: 'A',
        templateUrl: "view/gamesetup.html",
        controller: "SetupController",
        controllerAs: "setup"
    };
})
        
.directive("gameMain", function(){
    return {
        restrict: 'A',
        templateUrl: "view/gamemain.html",
        controller: "GameController",
        controllerAs: "ctrl"
    };
})

.directive("gameEndofturn", function(){
    return {
        restrict: 'A',
        templateUrl: "view/gameendofturn.html",
        controller: "EndofTurnController",
        controllerAs: "eot"
    };
})

.directive("gamePointstable", function(){
    return {
        restrict: 'A',
        templateUrl: "view/gamepointstable.html",
        controller: "GameController",
        controllerAs: "ctrl"
    };
});
