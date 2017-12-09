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
        let materiasSegundo = materiasService.enSegundoCurso;
        
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
                    name: 'Brands',
                    colorByPoint: true,
                    data: arrHorasCasa
                }]
            };
        }
        
        init();
        drawChartEscuela();
        drawChartCasa();
    }
});