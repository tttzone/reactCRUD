(function () {
    'use strict';
    angular
            .module('appUpload')
            .service('UploadService', function ($http) {
                var self = this;

                self.getUploadr = function () {
                    return $http({
                        method: 'GET',
                        url: 'api/upload',
                        headers: {
                            'Content-Type': 'application/json'

                        }
                    });
                };

                self.save = function (upload) {
                    return $http({
                        method: 'POST',
                        url: 'api/upload',
                        headers: {
                            'Content-Type': 'application/json'

                        },
                        data: upload
                    });
                };

                self.update = function (upload) {
                    return $http({
                        method: 'PUT',
                        url: 'api/upload/' + upload.idUpload,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: upload
                    });
                };

                self.delete = function (upload) {
                    return $http({
                        method: 'DELETE',
                        url: 'api/upload/' + upload.idUpload,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                };



            });
})();
