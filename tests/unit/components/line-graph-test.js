import { test, moduleFor } from 'ember-qunit';

moduleFor('component:line-graph', 'Component - line-graph', {
  setup: function () {},
  teardown: function () {}
});

test('it exists', function() {
  ok(this.subject());
});

test('graphWidth', function() {
	var subject = this.subject();
	subject.setProperties({
		width: 20,
		yAxisWidth: 5
	});

	equal(subject.get('graphWidth'), 15);
});

test('graphHeight', function() {
	var subject = this.subject();
	subject.setProperties({
		height: 20,
		xAxisHeight: 5
	});

	equal(subject.get('graphHeight'), 15);
});

test('xAxisTicks', function() {
	var subject = this.subject();

	subject.setProperties({
		xMin: 0,
		xMax: 100,
		width: 1000,
		xTickCount: 5,
		yAxisWidth: 0,
		graphHeight: 50
	});

	deepEqual(subject.get('xAxisTicks').map(t => t.value), [0, 20, 40, 60, 80, 100]);
	deepEqual(subject.get('xAxisTicks').map(t => t.x), [0, 200, 400, 600, 800, 1000]);
	deepEqual(subject.get('xAxisTicks').map(t => t.y), [55, 55, 55, 55, 55, 55]);
});