'use strict';

resumen.component('resumen', {
    templateUrl: 'views/resumen/resumen.html',
//    template: 'I am content! <button type="button" class="btn btn-default" ng-click="open()">Open Modal</button>',
    controller: function($scope, $uibModal) {
        var $ctrl = this;
        $scope.hide = true;
        $scope.trabaja = 0;
        $scope.horasTrabajo = 0;
        $ctrl.usuario = "José Angel Gonzalez Guerrero";
        //var usuario =  "JoséAngelGonzalez+Guerrero";
        //$scope.usuario =  "José Angel Gonzalez Guerrero";
        $scope.horas = [
            {id: 0, dato: 'Seleccione...'},
            {id: 1, dato: '1'},
            {id: 2, dato: '2'},
            {id: 3, dato: '3'},
            {id: 4, dato: '4'},
            {id: 5, dato: '5'},
            {id: 6, dato: '6'},
            {id: 7, dato: '7'},
            {id: 8, dato: '8 o más'},
        ];
        $scope.materiasDisponibles = [
          {id: '1', name: 'Cálculo 2'},
          {id: '2', name: 'Probabilidad Y Estadística'},
          {id: '3', name: 'Ecuaciones diferenciales'}
        ];
        
        $scope.materiasElegidas = [];
        
        $scope.enviarNoCuenta = function() {
            $scope.hide = false;
        }
        
        $scope.cambiaEstatusTrabaja = function() {
            $scope.trabaja;
        }
        
        
        $scope.open = function() {
            console.log($scope.usuario);

            $uibModal.open({
                template: `<resultado usuario="$ctrl.usuario"></resultado>`,
                controller: function() {
                    this.usuario = $ctrl.usuario;
                },
                controllerAs: '$ctrl'
            });
        };
    }
});