//=============================== 原型链 ================================
//Animal的构造函数
function Animal(name = 'Animal') {
    this.name = name; // 属性
    this.sleep = function () { // 实例方法
        console.log(`${this.name}正在睡觉`);
    }
}

Animal.prototype.eat = function (food = 'food') { // 原型方法
    console.log(`${this.name}正在吃${food}`);
};

let Cat = function (name = 'cat') {
    Animal.call(this, name);
}

//利用一个没有实例方法的类进行原型链的构建
function inherit(child, parent) {
    let Super = function () { };
    Super.prototype = parent.prototype;
    child.prototype = new Super();
    child.prototype.constructor = child;
}
inherit(Cat, Animal);

Cat.prototype.play = function () {
    console.log(`${this.name}要求一起玩耍！`);
} // 继续在Cat.prototype 即 new Super()对象上定义方法

let cat = new Cat("Kitty");
cat.eat('fish'); //Kitty正在吃fish
cat.sleep(); //Kitty正在睡觉
cat.play();  // Kitty要求一起玩耍！

// 实例的__proto__属性（原型）等于其构造函数的prototype属性。
console.log(cat.__proto__, Cat.__proto__); // Cat.prototype, Function.prototype
console.log(cat instanceof Animal); //true
console.log(cat instanceof Cat); //true
