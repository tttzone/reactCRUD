/*
 * Copyright 2017 Irman Juliansyah irmanjuliansyah@gmail.com.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


(function () {
    'use strict';
    angular
            .module('appUpload')
            .controller('UploadController', function (UploadService, $state, NgTableParams) {
                var self = this;
                self.form = {};



                //konfigurasi ng table
                self.createCustomConfigurationNgTable = function (data) {
                    var initialParams = {
                        count: 5
                    };
                    var initialSettings = {
                        counts: [],
                        paginationMaxBlocks: 13,
                        paginationMinBlocks: 2,
                        dataset: data
                    };
                    return new NgTableParams(initialParams, initialSettings);
                };

                (self.getUploads = function () {
                    UploadService.getUploads().then(function (res) {
                        self.configurationNgTable = self.createCustomConfigurationNgTable(res.data.content);
                    });

                })();



                self.newUpload = function () {
                    self.form = {};
                    self.isSave = true;
                };

                self.save = function (upload) {
                    upload.gambar = {};
                    upload.gambar = upload.file.base64;
                    delete gambar.file;
                    UploadService.save(upload).then(function (res) {
                        swal('Info', 'Data Tersimpan', 'success');
                        self.getUpload();
                        angular.element('#myModal').modal('toggle');
                    });

                };


                self.editUpload = function (upload) {
                    self.form = upload;
                    self.isSave = false;
                };

                self.updateUpload = function (upload) {

                    UploadService.updateUpload(upload).then(function (res) {
                        swal('Info', 'Data Berhasil Diupdate', 'success');
                        self.getUpload();
                        angular.element('#myModal').modal('toggle');
                    });

                };

                self.deleteUpload = function (id) {
                    swal({
                    title: "Warning",
                            text: "Anda Yakin Ingin Menghapus ?",
                            type: "warning",
                            closeOnConfirm: false,
                            closeOnCancel: true,
                            confirmButtonText: 'Hapus',
                            cancelButtonText: 'Batal',
                            type: "warning",
                            showCancelButton: true
                },
                        function () {
                            UploadService.deleteUpload({
                                idUpload: id
                            }).then(function (res) {
                                swal('Info', 'Data Berhasil Dihapus', 'success');
                                self.getUpload();
                            });

                        };

                self.showImage = function (image) {
                    self.image = image;
                    angular.element('#modal').modal('toggle');
                };

            });

        })();

