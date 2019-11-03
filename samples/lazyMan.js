// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan(“Hank”)输出:
// Hi! This is Hank!

// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper


var LazyMan = function (name) {
    const queue = [];
    const LazyMan = {
        say() {
            queue.push(() => {
                console.log(`Hi! This is ${name}!`);
                this.next();
            });

            return this;
        },

        sleep(delay) {
            queue.push(() => {
                setTimeout(() => {
                    console.log(`Sleep ${delay / 1000} seconds`);
                }, delay);
                this.next();
            });

            return this;
        },

        eat(sth) {
            queue.push(() => {
                console.log(`Eat ${sth}`);
                this.next();
            });

            return this;
        },

        sleepFirst(delay) {
            queue.unshift(() => {
                setTimeout(() => {
                    console.log(`Sleep first ${delay / 1000} seconds`);
                    this.next();
                }, delay);
            });
            return this;
        },

        next() {
            const fn = queue.shift();
            fn && fn();
        }
    }

    LazyMan.say();
    setTimeout(() => {
        LazyMan.next();
    });
    return LazyMan;
}

LazyMan("hank").eat("goaza").sleep(1000).eat("boost").sleepFirst(500);

