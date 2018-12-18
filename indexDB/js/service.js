angular.module('idexDB.service', [])
    .factory('mess', ['$q', function ($q) {
        const DB_NAME = 'person';
        const DB_VERSION = 1;
        const DB_STORE_NAME = 'pub';
        var db;
        return {
            //启动数据库
            initDb: function () {
                //open方法新建数据库,返回一个对象
                var req = indexedDB.open(DB_NAME, DB_VERSION);
                var defer = $q.defer();
                //成功执行的情况
                req.onsuccess = function () {
                    //this.result是一个数据库实例,复制给变量db,方便操作数据库
                    db = this.result;
                    defer.resolve();
                }
                //失败执行的情况
                req.onerror = function () {
                    console.error('启动失败');
                }
                //创建表,使用传入id作为key
                req.onupgradeneeded = function (evt) {
                    var store = evt.currentTarget.result.createObjectStore(DB_STORE_NAME, {
                        KeyPath: 'id',
                        autoIncrement: true
                    });
                    //建字段和索引,unique:true验证输入不能为空
                    store.createIndex('name', 'name', {
                        unique: true
                    });
                    store.createIndex('tel', 'tel');
                }
                return defer.promise;
            },
            //添加数据
            addDb: function (name, tel, file) {
                //判断数据库是否打开成功
                if (!db) {
                    console.error('没有开启数据库');
                    return;
                }
                //操作数据库,创建事务
                var tx = db.transaction(DB_STORE_NAME, 'readwrite'),
                    store = tx.objectStore(DB_STORE_NAME), //操作哪个对象
                    //接收数据添加
                    req = store.add({
                        name: name,
                        tel: tel,
                        file: file
                    }),
                    defer = $q.defer();
                //执行成功
                req.onsuccess = function () {
                    defer.resolve();
                    alert('留言成功');
                }
                //执行失败
                req.onerror = function () {
                    console.error('留言失败');
                }
                return defer.promise; //返回执行结果
            },
            //获取数据
            getAll: function () {
                var data = [],
                    defer = $q.defer();
                var Store = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
                var req = Store.openCursor();
                //执行成功
                req.onsuccess = function (evt) {
                    var cursor = evt.target.result;
                    if (cursor) { //如果有数据
                        data.push(cursor.value);
                        cursor.continue();
                    } else {
                        defer.resolve(data);
                    }
                }
                return defer.promise; //返回执行结果
            },
            //删除数据
            removeDb: function (id) {
                var id = Number(id);
                defer = $q.defer();
                var tx = db.transaction(DB_STORE_NAME, 'readwrite'),
                    store = tx.objectStore(DB_STORE_NAME), //操作哪个对象
                    req = store.get(id);
                //执行成功
                req.onsuccess = function (evt) {
                    var record = evt.target.result;
                    if (record) { //数据库里面有输入的id
                        req = store.delete(id);
                        req.onsuccess = function () {
                            defer.resolve();
                            alert('删除成功');
                        }
                        req.onerror = function () {
                            alert('删除失败');
                        }
                    } else { //没有获取到id
                        alert('没找到数据');
                    }
                }
                return defer.promise;
            }
        }
    }])