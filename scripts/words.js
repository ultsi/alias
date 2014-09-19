
angular.module("Words", [])
.service("WordsManager", ["$http", function($http){
    this.wordcollection = [];
    this.history = {
        guessed: 0,
        skipped: 0
    };
    
    
    this.skippedWords = [];
    this.guessedWords = [];
    this.lastWord = "";
    this.lastWordGuessed = false;
    
    this.takeRandomWord = function(){
        return this.wordcollection.splice(randomInt(0, this.wordcollection.length), 1)[0];
    };
    
    var wm = this;
    $http.get("data/words.json").
        success(function(data, status, headers, config){
            wm.wordcollection = data.words;
        }).
        error(function(data, status, headers, config){
            
        });
    
    this.initWordArrays = function() {
        this.history.guessed += this.guessedWords.length;
        this.history.skipped += this.skippedWords.length;
        this.skippedWords = [];
        this.guessedWords = [];
        this.lastWord = "";
        this.lastWordGuessed = false;
    };
    
}]);