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
    this.guessing = false;
    
    this.nextTurn = function(){
        this.curtime = -1;
        this.guessing = false;
        this.currentState = "main";
        this.currentTurn = (this.currentTurn + 1) % this.settings.teamcount;
    };
    
    this.winner = function(){
        var winner = -1;
        for(var i=0;i<this.settings.teamcount;i++){
            if(this.teams[i].points >= this.settings.pointlimit){
                winner = i;
                break;
            }
        }
        if(winner !== -1){
            return this.teams[winner];
        }
        return false;
    };
    
    this.toResults = function(){
        this.guessing = false;
        this.curtime = -1;
        this.currentState = "results";
    };
    
    this.timeUp = function(){
        return this.curtime <= 0 && this.guessing;
    };
    
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



