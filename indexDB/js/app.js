angular.module('myapp', ['idexDB.service'])
    .controller('mycontroller', ['$scope', 'mess', function ($scope, mess) {
        //启动数据库
        var init = mess.initDb();
        //获取数据
        var getData = function () {
            init.then(function () {
                mess.getAll().then(function (data) {
                    $scope.data = data;
                    var imgs = data.map(function (val, index) {
                        var url = window.URL.createObjectURL(val.file);
                        return url;
                    })
                    $scope.url = imgs;
                });
            })
        }
        getData();
        //执行图片上传的方法
        $scope.fileChanged = function (ele) {
            $scope.files = ele.files;
            $scope.$apply();
        }
        //添加数据
        $scope.add = function () {
            var name = $scope.name,
                tel = $scope.tel,
                file = $scope.files[0];
            mess.addDb(name, tel, file).then(function () {
                getData();
            });
        }
        //删除数据
        $scope.remove = function () {
            var id = $scope.id;
            mess.removeDb(id).then(function () {
                getData();
            })
        }
    }])