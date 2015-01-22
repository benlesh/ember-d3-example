import Ember from 'ember';

export default Ember.Route.extend({
	model: () => {
		return {
			data: d3.range(100).map(n => ({ x: n, y: Math.floor(Math.random() * 100) }))
		};
	}
});