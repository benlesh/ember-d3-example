import Ember from 'ember';

export default Ember.Component.extend({
	width: 500,

	height: 300,

	xMin: 0,

	xMax: 100,

	yMin: 0,

	yMax: 100,

	data: null,

	xTickCount: 10,

	yTickCount: 10,

	yAxisWidth: 30,

	xAxisHeight: 30,
	
	graphWidth: function(){
		return this.get('width') - this.get('yAxisWidth');
	}.property('width', 'yAxisWidth'),

	graphHeight: function() {
	  return this.get('height') - this.get('xAxisHeight');
	}.property('height', 'xAxisHeight'),

	xScale: function() {
		let xMin = this.get('xMin');
		let xMax = this.get('xMax');
		let graphWidth = this.get('graphWidth');
		return d3.scale.linear().
			domain([xMin, xMax]).
			range([0, graphWidth]);
	}.property('graphWidth', 'xMin', 'xMax'),

	yScale: function() {
		let yMin = this.get('yMin');
		let yMax = this.get('yMax');
		let graphHeight = this.get('graphHeight');
		return d3.scale.linear().
			domain([yMin, yMax]).
			range([0, graphHeight]);
	}.property('graphHeight', 'yMin', 'yMax'),

	lineFn: function(){
		let xScale = this.get('xScale');
		let yScale = this.get('yScale');
		return d3.svg.line().
			x(d => xScale(d.x)).y(d => yScale(d.y));
	}.property('xScale', 'yScale'),

	d: function(){
		let data = this.get('data');
		if(Array.isArray(data) && data.length > 0) {
			let lineFn = this.get('lineFn');
			return lineFn(data);
		} else {
			return 'M0,0'; // make SVG happy
		}
	}.property('lineFn', 'data.[]'),

	dataChanged: function(){
		let element = this.get('element');
		if(element) {
			d3.select(element).selectAll('.line')
				.transition()
				.duration(500)
				.attr('d', this.get('d'));
		}
	}.observes('data.[]').on('didInsertElement'),

	xAxisFn: function(){
		let xScale = this.get('xScale');
		return d3.svg.axis().scale(xScale);
	}.property('xScale'),

	yAxisFn: function(){
		let yScale = this.get('yScale');
		return d3.svg.axis().scale(yScale);
	}.property('yScale'),

	xAxisTicks: function(){
		let xScale = this.get('xScale');
		let graphHeight = this.get('graphHeight');
		let yAxisWidth = this.get('yAxisWidth');
		let tickCount = this.get('xTickCount');
		return xScale.
			ticks(tickCount).
			map(tick => ({
				value: tick,
				x: xScale(tick) + yAxisWidth,
				y: graphHeight + 5
			}));
	}.property('xScale', 'xTickCount', 'graphHeight', 'yAxisWidth'),

	yAxisTicks: function(){
		let yScale = this.get('yScale');
		let yAxisWidth = this.get('yAxisWidth');
		let tickCount = this.get('yTickCount');

		return yScale.
			ticks(tickCount).
			map(tick => ({
				value: tick,
				x: yAxisWidth - 5,
				y: yScale(tick)
			}));
	}.property('yScale', 'yTickCount', 'yAxisWidth'),

	lineTransform: function() {
		return 'translate(%@,0)'.fmt(this.get('yAxisWidth'));
	}.property('yAxisWidth'),

});