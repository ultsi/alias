
angular.module("Words", [])
.service("WordsManager", ["$http", function($http){
    this.wordcollection = [];
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
    
    this.skippedWords = [];
    this.guessedWords = [];
    this.lastWord = "";
    this.lastWordGuessed = false;
    
}]);