import Ember from 'ember';

export default Ember.ObjectController.extend({
	width: 400,

	height: 300,

	actions: {
		getNewData: function(){
			this.set('model.data', d3.range(100).map(n => ({ 
				x: n, 
				y: Math.floor(Math.random() * 100) 
			})));
		}
	}
});