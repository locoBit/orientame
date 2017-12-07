'use strict';

resultado.component('resultado', {
    templateUrl: 'views/resultado/resultado.html',
    bindings: {
        materias: "<"
    },
    
/*
    template: `<div class="modal-body"><div>{{$ctrl.greeting}}</div> 
    <label>Name To Edit</label> <input ng-model="$ctrl.modalData.name"><br>
    <label>Value To Edit</label> <input ng-model="$ctrl.modalData.value"><br>
    <button class="btn btn-warning" type="button" ng-click="$ctrl.handleClose()">Close Modal</button>
    <button class="btn btn-warning" type="button" ng-click="$ctrl.handleDismiss()">Dimiss Modal</button>
    </div>`,
*/
/*
    bindings: {
      modalInstance: "<",
      resolve: "<"
    },
*/
    controller: function($scope) {
        $scope.materiasACursar = this.materias[0];
        $scope.materiasSegundo = this.materias[1];
    }
});