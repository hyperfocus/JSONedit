'use strict';

var app = angular.module('exampleApp', ['JSONedit']);

function EnvKey(json,env)
{
  for (let keyName in json) {
      json[env+"_"+keyName] = json[keyName];
      delete json[keyName];
  }
  return json 

}

function MainViewCtrl($scope, $filter) {

    // example JSON
    $scope.jsonData = EnvKey({
        Name: "Joe", "Last Name": "Miller", Address: {Street: "Neverland 42"}, Hobbies: ["doing stuff", "dreaming"]
    },"DEV");

    $scope.jsonData2 = {
        Name: "Scott", "Last Name": "Miller", "Phone": "732-597-6798"
    };

    $scope.jsonData3 = {
        Name: "Scott", "Last Name": "Tully", "Phone": "732-597-6798"
    };

    $scope.jsonData4 = {
        Global: "Testing" 
    };

    $.extend( true, $scope.jsonData, $scope.jsonData2,$scope.jsonData3,$scope.jsonData4 );

    $scope.$watch('jsonData', function(json) {
        $scope.jsonString = $filter('json')(json);
    }, true);
    $scope.$watch('jsonString', function(json) {
        try {
            $scope.jsonData = JSON.parse(json);
            $scope.wellFormed = true;
        } catch(e) {
            $scope.wellFormed = false;
        }
    }, true);
}
