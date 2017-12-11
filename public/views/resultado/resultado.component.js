'use strict';

resultado.component('resultado', {
    templateUrl: 'views/resultado/resultado.html',
    controller: function($scope, materiasService) {
        let $ctrl = this;
        
        let arrTeoricas  = [];
        let arrPracticas = [];
        let arrCreditos  = [];
        let arrNombres   = [];
        let arrHorasCasa = [];
        let horasEscuela = 0;
        let horasCasa    = 0;
        
        let materiasACursar = materiasService.aCursar;
        $scope.materiasSegundo = materiasService.enSegundoCurso;
        let horasTrabajo    = materiasService.horasTrabajo;
        $scope.horasLibres  = 0;
        
        $scope.icon = "";
        $scope.colorWidget = "";
        $scope.recomendacion = "";
        
        let init = function() {
            materiasACursar.forEach(function(materia) {
                arrTeoricas.push(parseInt(materia.ht));
                arrPracticas.push(parseInt(materia.hp));
                arrCreditos.push(parseInt(materia.creditos));
                arrNombres.push(materia.nombre);
                horasEscuela += parseInt(materia.hp) + parseInt(materia.ht);
                horasCasa += parseInt(materia.creditos) - ( parseInt(materia.hp) + parseInt(materia.ht) );
                let hc = parseInt(materia.creditos) - ( parseInt(materia.hp) + parseInt(materia.ht) );
                arrHorasCasa.push({
                    name: materia.nombre,
                    y: hc,
                    drilldown: materia.nombre
                });
            });
        }
        
        let drawChartEscuela = function() {

            $ctrl.chartConfigEscuela = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: `Horas que estarás en la escuela por semana: ${horasEscuela}`
                },
                xAxis: {
                    categories: arrNombres
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Horas a la semana por materia'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -30,
                    verticalAlign: 'top',
                    y: 25,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                series: [{
                    name: 'Horas teóricas',
                    data: arrTeoricas
                }, {
                    name: 'Horas prácticas',
                    data: arrPracticas
                }]
            };
        }
        
        let drawChartCasa = function() {
            
            $ctrl.chartConfigCasa = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: `Horas que deberías estudiar en casa por semana: ${horasCasa}`
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Horas a la semana por materia'
                    }
            
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y}'
                        }
                    }
                },
            
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> horas<br/>'
                },
            
                series: [{
                    name: 'Hotas',
                    colorByPoint: true,
                    data: arrHorasCasa
                }]
            };
        }
        
        let drawChartPie = function () {
            
            $scope.horasLibres = 168 - ( horasCasa + horasEscuela + horasTrabajo );
            
            $ctrl.chartConfigPie = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Distribución de horas a la semana'
                },
                subtitle: {
                    text: 'La semana tiene 168 horas en total'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y}',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Horas',
                    colorByPoint: true,
                    data: [{
                        name: 'En la escuela',
                        y: horasEscuela
                    }, {
                        name: 'Estudio en casa',
                        y: horasCasa
                    }, {
                        name: 'En el trabajo',
                        y: horasTrabajo
                    }, {
                        name: 'Tiempo libre',
                        y: $scope.horasLibres,
                        sliced: true,
                        selected: true
                    }]
                }]
            }
        };
        
        let setRecomendacion = function() {
            
            if ( ($scope.materiasSegundo.length >= 2 && $scope.horasLibres < 110) ||
                ($scope.horasLibres < 110) ||
                ($scope.materiasSegundo.length > 3) ) {
                $scope.icon = "fa-frown-o";
                $scope.colorWidget = "red-bg";
                $scope.recomendacion = "Tienes una sobrecarga de trabajo";
            } else if ( ($scope.materiasSegundo.length > 0 && $scope.horasLibres < 120) ||
                ($scope.horasLibres < 120) ||
                ($scope.materiasSegundo.length > 0) ) {
                $scope.icon = "fa-meh-o";
                $scope.colorWidget = "yellow-bg";
                $scope.recomendacion = "Parece que tendrás un semestre dificil";
            } else {
                $scope.icon = "fa-smile-o";
                $scope.colorWidget = "navy-bg";
                $scope.recomendacion = "Mucho éxito en tu semestre";
            }
            
        };
        
        init();
        drawChartEscuela();
        drawChartCasa();
        drawChartPie();
        setRecomendacion();
    }
});