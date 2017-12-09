'use strict';

resumen.component('resumen', {
    templateUrl: 'views/resumen/resumen.html',
//    template: 'I am content! <button type="button" class="btn btn-default" ng-click="open()">Open Modal</button>',
    controller: function($scope, $uibModal, $http, $location, materiasService) {
        var $ctrl = this;
        let materiasACursar = [];
        $scope.primeraSeleccion = true;
        $scope.numMaterias = 0;
        $scope.instrucciones = "Elige las materias que quisieras cursar el siguiente semestre.";
        $scope.btnTexto = "Terminar selección"
        $scope.tituloMateriasDisponibles = "Materias disponibles";
        $scope.tituloMateriasElegidas = "Materias elegidas";
        $scope.licenciaturas = [
            {id: '0', dato: 'Seleccione . . .'},
            {id: 'ICO', dato: 'Ingeniería en Computación'},
            {id: 'ICI', dato: 'Ingeniería Civil'},
            {id: 'ISES', dato: 'Ingeniería en Sistemas Energéticos Sustentables'},
            {id: 'IME', dato: 'Ingeniería Mecánica'},
        ];
        $scope.txtLicenciatura = '0';
        $scope.hide = true;
        $scope.trabaja = 0;
        $scope.horasTrabajo = 0;
        $scope.creditos = 0;
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
        $scope.materiasDisponibles = [];
        
        $scope.materiasElegidas = [];
        
        $scope.enviarDatosAlumno = function() {
            $http.get(`https://${$location.host()}/api/materias/division/${$scope.txtLicenciatura}`)
            .then(function(res) {
                if (res.data.success) {
                    $scope.materiasDisponibles = res.data.materias;
                    $scope.hide = false;
                } else {
                    console.log(res.data.msg);    
                }
            });
        }
        
        $scope.cambiaEstatusTrabaja = function() {
            $scope.trabaja;
        }
        
        $scope.updateCreditos = function() {
            if ($scope.primeraSeleccion) {
                checkSelect();
                $scope.creditos = 0;
                $scope.numMaterias = $scope.materiasElegidas.length;
                $scope.materiasElegidas.forEach(function(mat){
                   $scope.creditos += parseInt(mat.creditos);
                });   
            }
        }
        
        $scope.evaluar = function() {
            if ($scope.primeraSeleccion) {
                $scope.primeraSeleccion = false;
                $scope.tituloMateriasDisponibles = "Materias que cursarás";
                $scope.tituloMateriasElegidas = "Materias que llevarás en segundo curso";
                setLabelsHtml();
                $scope.instrucciones = "Elige las materias que llevarías en segundo curso (si no tienes haz click en 'Generar reporte')";
                $scope.btnTexto = "Generar reporte"
                $scope.materiasDisponibles = $scope.materiasElegidas;
                materiasACursar = $scope.materiasElegidas;
                $scope.materiasElegidas = [];
            } else {
                $ctrl.materias = [{materiasACursar:materiasACursar},{materiasSegundo:$scope.materiasElegidas}];
                materiasService.aCursar = materiasACursar;
                materiasService.enSegundoCurso = $scope.materiasElegidas;
                $location.path('/report');
/*                
                $uibModal.open({
                template: `<resultado materias="$ctrl.materias"></resultado>`,
                controller: function() {
                    this.materias = $ctrl.materias;
                },
                    controllerAs: '$ctrl'
                });
*/                
            }
        };
        
        
        
        function checkSelect(){
            if ($scope.materiasElegidas.length > 10)
                document.getElementById('bootstrap-duallistbox-nonselected-list_').disabled=true;
            else
                document.getElementById('bootstrap-duallistbox-nonselected-list_').disabled=false;
        }
        
        function setLabelsHtml() {
            var labels = document.getElementsByTagName('LABEL');
            for (var i = 0; i < labels.length; i++) {
                if (labels[i].htmlFor != '') {
                     var elem = document.getElementById(labels[i].htmlFor);
                     if (elem != null) {
                        if (elem.id == 'bootstrap-duallistbox-nonselected-list_')
                            labels[i].innerHTML = $scope.tituloMateriasDisponibles;
                        else if (elem.id == 'bootstrap-duallistbox-selected-list_')
                            labels[i].innerHTML = $scope.tituloMateriasElegidas;
                     }
                }
            }
        }
        
        angular.element(document).ready(function () {
            setLabelsHtml();
        });
    }
});