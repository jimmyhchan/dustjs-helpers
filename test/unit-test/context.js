var test = require('tape'),
    dust = require('../../lib/dust-helpers');


test('Context should behave correctly', function(t){
  var context = dust.makeBase({global1: 'hello'});
  context = context.push({head2:2});
  context = context.push({head1:1});
  context = context.push({head0:0});

  t.ok(dust);
  t.equal(context.stack.head.head0, 0);
  t.equal(context.stack.tail.head.head1, 1);
  t.equal(context.stack.tail.tail.head.head2, 2);


  // test popping off a head
  var headlessContext = context.rebase();
  headlessContext.stack = context.stack.tail;
  t.equal(headlessContext.stack.head.head1, 1);
  t.equal(headlessContext.stack.tail.head.head2, 2);

  // test push on a new head
  headlessContext.push({head0:0});
  t.equal(context.stack.head.head0, 0);
  t.equal(context.stack.tail.head.head1, 1);
  t.equal(context.stack.tail.tail.head.head2, 2);

  t.end();

});
