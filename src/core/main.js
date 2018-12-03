import '../tasks/tasks';

console.log('main.js');

class Foo {
    bar = 123;
}

console.log(new Foo().bar);

require('../tasks/tasks');
