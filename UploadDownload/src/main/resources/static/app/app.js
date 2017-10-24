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

(function() {
  'use strict';
  angular
    .module('appUpload', [
      'ui.router',
      'LocalStorageModule',
      'oc.lazyLoad',
      'angular-loading-bar',
      'ngTable',
      'ngSanitize',
      'ngMask',
      'ui.select',
      'base64',
      '720kb.datepicker',
      'ngBootstrap',
      'ui.bootstrap',
      'naif.base64'
    ])
    .config(['$qProvider', '$httpProvider', '$stateProvider', 'localStorageServiceProvider', '$urlRouterProvider', 'cfpLoadingBarProvider',
      function($qProvider, $httpProvider, $stateProvider, localStorageServiceProvider, $urlRouterProvider, cfpLoadingBarProvider) {
        localStorageServiceProvider.setPrefix('appUpload');
        cfpLoadingBarProvider.includeSpinner = true;
        $urlRouterProvider.otherwise('/home/dashboard');
        $qProvider.errorOnUnhandledRejections(false);

        $stateProvider
          .state('index', {
            abstract: true,
            url: '',
            views: {
              'lazyLoadView': {
                templateUrl: 'app/templates/index.html'
              }
            }
           
          })
          .state('index.home', {
            url: '/home',
            views: {
              'lazyLoadView': {
                template: '<ng-home></ng-home>'
              }
            },
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'app/directives/ng.home.js',
                  'app/controllers/home.controller.js'
                ]);
              }]
            }
            
          })
          .state('index.home.dashboard', {
            url: '/dashboard',
            views: {
              'lazyLoadView': {
                template: '<ng-dashboard></ng-dashboard>'
              }
            },
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'app/directives/ng.dashboard.js',
                  'app/services/upload.service.js',               
                  'app/controllers/dashboard.controller.js'
                ]);
              }]
            }
           
          })
          .state('index.home.upload', {
            url: '/upload',
            views: {
              'lazyLoadView': {
                template: '<ng-upload></ng-upload>'
              }
            },
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'app/directives/ng.upload.js', 
                  'app/services/upload.service.js',
                  'app/controllers/upload.controller.js'
                ]);
              }]
            }
      
          });
          
      }
    ]);
    
})();
