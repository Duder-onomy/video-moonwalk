var VideoInstance = require('./videoInstance.js'),
	BB = require('bluebird');

module.exports = VideoMoonwalk;

window.VideoMoonwalk = VideoMoonwalk;

function VideoMoonwalk(videoTagForward, videoTagReverse, options){

	var reversedOptions = {
		points : generateReverseTimePoints(options.points)
	};

	this.videoForwardInstance = new VideoInstance(videoTagForward, options);
	this.videoReverseInstance = new VideoInstance(videoTagReverse, reversedOptions);

	this.totalVideoTimeLength = options.points.slice(-1)[0].timeIndex;

	this.goToNext = goToNext.bind(this);
	this.goToPrevious = goToPrevious.bind(this);
	this.goToIndex = goToIndex.bind(this);
	this.skipToIndex = skipToIndex.bind(this);
	this.getCurrentIndex = getCurrentIndex.bind(this);
	this.getCurrentTime = getCurrentTime.bind(this);

	this.skipToIndex(0);

	return this;
}

function goToNext() {
	var self = this;

	return this.videoForwardInstance.goToNext()
		.then(function(currentTime){
			self.videoReverseInstance.skipToIndex(self.videoForwardInstance.getCurrentIndex());
			self.videoReverseInstance.setCurrentTime(self.totalVideoTimeLength - currentTime);
		})
		.catch(function() {});
}

function goToPrevious() {
	var self = this;

	return this.videoReverseInstance.goToPrevious()
		.then(function(currentTime){
			self.videoForwardInstance.skipToIndex(self.videoReverseInstance.getCurrentIndex());
			self.videoForwardInstance.setCurrentTime(self.totalVideoTimeLength - currentTime);
		})
		.catch(function() {});
}

function goToIndex(index) {
	var self = this;

	if(index === self.videoForwardInstance.getCurrentIndex()){
		return new BB.resolve();
	} else if(index < self.videoForwardInstance.getCurrentIndex()){
		return self.videoReverseInstance.goToIndex(index)
			.then(function(currentTime){
				self.videoForwardInstance.skipToIndex(self.videoReverseInstance.getCurrentIndex());
				self.videoForwardInstance.setCurrentTime(self.totalVideoTimeLength - currentTime);
			});
	} else {
		return self.videoForwardInstance.goToIndex(index)
			.then(function(currentTime){
				self.videoReverseInstance.skipToIndex(self.videoForwardInstance.getCurrentIndex());
				self.videoReverseInstance.setCurrentTime(self.totalVideoTimeLength - currentTime);
			});
	}
}

function skipToIndex(index){
	this.videoForwardInstance.skipToIndex(index);
	this.videoReverseInstance.skipToIndex(this.videoForwardInstance.getCurrentIndex());
}

function getCurrentIndex() {
	return this.videoForwardInstance.getCurrentIndex();
}

function getCurrentTime() {
	return this.videoForwardInstance.getCurrentTime();
}

function generateReverseTimePoints(points){
	var totalVideoTimeLength = points.slice(-1)[0].timeIndex,
		reverseTimePointsArray = [],
		remainderVideoTime;

	points.forEach(function(point,index){
		if(index === 0){
			reverseTimePointsArray[index] = {
				timeIndex : totalVideoTimeLength
			};
			remainderVideoTime = totalVideoTimeLength;
		} else {
			reverseTimePointsArray[index] = {
				timeIndex : totalVideoTimeLength - (points[index].timeIndex - points[index-1].timeIndex)
			};
			totalVideoTimeLength -= (points[index].timeIndex - points[index-1].timeIndex);
		}
	});
	return reverseTimePointsArray;
}