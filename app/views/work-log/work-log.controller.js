(function () {
    'use strict';

    angular
        .module('focus-track')
        .controller('WorkLogController', WorkLogController);

    WorkLogController.$inject = ['$state', '$filter', 'WorkLogService', '$localStorage'];

    function WorkLogController($state, $filter, WorkLogService, $localStorage) {
        var vm = this;
        vm.worklogs = [];

        vm.logout = logout;
        vm.projects = seeProjects;

        activate();

        function activate() {
            getWorkLogs();
        }

        /**
         * Get all worklogs from Salesforce API
         */
        function getWorkLogs() {
            return WorkLogService.get().then(function (data) {
                    $(document).ready(function () {
                        $('#worklogs').DataTable({
                            data: data,
                            columns: [{
                                    data: "proyecto"
                                },
                                {
                                    data: "fase"
                                },
                                {
                                    data: "categoria"
                                },
                                {
                                    data: "fecha"
                                },
                                {
                                    data: "horas"
                                },
                                {
                                    data: "minutos"
                                },
                                {
                                    data: "comentario"
                                },
                                {
                                    data: "aprobado"
                                }
                            ],
                            columnDefs: [{
                                targets: 6,
                                render: function (data, type, row) {
                                    return data.substr(0, 30) + '…';
                                }
                            }],
                            "pageLength": 10,
                            "info": false,
                            "language": {
                                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                            }
                        });
                    });
                })
                .catch(function () {
                    alert("Error al cargar tus registros")
                });
        }

        function logout() {
            $localStorage.$reset();
            $state.go('login', vm.loginForm);
        }

        function seeProjects() {
            $state.go('project');
        }
    }
})();