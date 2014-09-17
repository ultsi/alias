'use strict';

angular
.module("Game", [])
.service("GameManager", function() {
    this.teams = [];
    this.settings = {
        teamcount: 2,
        timelimit: 60,
        pointlimit: 25
    };
    this.curtime = -1;
    
    // initialize teams
    var temp = this;
    (function(){
        var i = 0;
        for (i = 0; i < 8; i++) {
            temp.teams[i] = {name: (i + 1).toString(), points: 0};
        }
    })();
    
    this.currentState = "help";
    this.currentTurn = 0;
    this.currentWord = "";
    this.guessing = false;
    
    this.timeLeft = function(){
        return this.settings.timelimit - this.curtime;
    };
    
    this.isCurrentState = function(state){
        return this.currentState === state;
    };
    
    this.currentTeamName = function(){
        return this.teams[this.currentTurn].name;
    };
    
    this.isTurnLive = function(){
        return this.guessing;
    };
    
    this.canEveryoneGuess = function(){
        return this.curtime < 0 && this.guessing === true;
    };
    
});



