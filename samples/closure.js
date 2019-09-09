//=========================== 闭包实现单例 ============================
// 单例构造函数
function CreateSingleton(name) {
    this.name = name;
    this.getName();
};

// 获取实例的名字
CreateSingleton.prototype.getName = function () {
    console.log(this.name)
};

// 单例对象
var Singleton = (function () {
    var instance;
    return function (name) {
        if (!instance) {
            instance = new CreateSingleton(name);
        }
        return instance;
    }
})();

// 创建实例对象1
var a = new Singleton('a');
// 创建实例对象2
var b = new Singleton('b');

b.getName(); 