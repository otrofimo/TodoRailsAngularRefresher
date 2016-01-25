// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var todo = angular.module('todo', [
  'restangular',
  'ui.router'
  ]);

todo.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/index.html',
      controller: 'TasksController'
    })
    .state('show', {
      url: '/tasks/:id',
      templateUrl: '/show.html',
      controller: 'ShowTaskController'
    })
});

todo.config(function(RestangularProvider){
  RestangularProvider.setRequestSuffix(".json")
})
.config(function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
});

todo.controller('TasksController', function($scope, TasksService) {
  var self = this;
  $scope.tasks = [];
  $scope.newTodo = {title: '', description: ''};
  loadTasks();

  $scope.submit = function() {
    TasksService.createTask($scope.newTodo).then( function() { 
      loadTasks();
      clearTaskForm(); 
    });
  };

  function loadTasks() {
    TasksService.getAllTasks().then(
      function(res) { $scope.tasks = res; },
      function(err) { console.log(err); }
    );
  }

  function clearTaskForm() {
    $scope.newTodo = {}
  }
});

todo.controller('ShowTaskController', 
  function($scope, $stateParams, TasksService) {
    TasksService.getTask($stateParams.id).then(function(res) {
      console.log(res);
      $scope.currentTask = res;
    })
  }
)

todo.service('TasksService', function(Restangular) {
  var base = Restangular.all('tasks');

  this.getAllTasks = function() {
    return base.getList();
  };

  this.getTask = function(id) {
    return base.one(id).get();
  };

  this.createTask = function(task) {
    return base.post(task);
  };
});

todo.directive('task', function() {
  return {
    restrict: 'E',
    scope: { myTask: '=' },
    templateUrl: '/task.html',
    controller: TaskController
  };

  function TaskController($scope) {

  }
});
