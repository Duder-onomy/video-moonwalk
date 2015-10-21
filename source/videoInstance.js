var BB = require('bluebird');

module.exports = VideoInstance;

function VideoInstance(videoTag, options){
    // Throw Error if no video tag, and do simple validation on options.like, check for the index array.
    // only start after the video tag is fully loaded.
    // add tweening so the the ff and rr is smooth.
    this.videoTag = videoTag;

    this.options = options;

    this.currentIndex = 0;

    this.getCurrentIndex = getCurrentIndex.bind(this);
    this.goToNext = goToNext.bind(this);
    this.goToPrevious = goToPrevious.bind(this);
    this.goToIndex = goToIndex.bind(this);
    this.skipToIndex = skipToIndex.bind(this);
    this.setCurrentTime = setCurrentTime.bind(this);
    this.getCurrentTime = getCurrentTime.bind(this);


    this.skipToIndex(this.currentIndex);

    // console.log(this.options.points[this.currentIndex].timeIndex);

    return this;
}

function getCurrentIndex() {
    return this.currentIndex;
}

function goToNext() {
    return new BB(function(resolve, reject){
        if(this.currentIndex < this.options.points.length - 1) { // the next index is not the last index.
            animateToTimeIndex.call(this, this.options.points[this.currentIndex + 1].timeIndex)
                .then(resolve);
            this.currentIndex++;
        } else {
            reject();
        }
    }.bind(this));
}

function goToPrevious() {
    var self = this;
    return new BB(function(resolve,reject){
        self.goToIndex(self.currentIndex - 1)
            .then(resolve);
    });
}

function goToIndex(indexToGoTo) {
    var self = this;
    return new BB(function(resolve,reject){
        var timeIndexToGoTo = self.options.points[indexToGoTo].timeIndex;

        if(timeIndexToGoTo < self.videoTag.currentTime) {
            self.videoTag.currentTime = timeIndexToGoTo;
            self.currentIndex = indexToGoTo;
            resolve(timeIndexToGoTo);
        } else {
            animateToTimeIndex.call(self, timeIndexToGoTo)
                .then(resolve);
            self.currentIndex = indexToGoTo;
        }
    });

}

function skipToIndex(indexToSkipTo) {
    if(indexToSkipTo > this.currentIndex && indexToSkipTo !== this.options.points.length) { // index is greater than the current but not the last
        this.videoTag.currentTime = this.options.points[indexToSkipTo].timeIndex;
        this.currentIndex = indexToSkipTo;
    }

    if(indexToSkipTo < this.currentIndex && indexToSkipTo >= 0) { // index is less than the current but not the first
        this.videoTag.currentTime = this.options.points[indexToSkipTo].timeIndex;
        this.currentIndex = indexToSkipTo;
    }
}

function setCurrentTime(currentTimeToSet) {
    this.videoTag.currentTime = currentTimeToSet;
}

function getCurrentTime() {
    return this.videoTag.currentTime;
}

function animateToTimeIndex(timeIndex) {
    return new BB(function(resolve,reject){
        var self = this;

        if(timeIndex > self.videoTag.currentTime){
            this.animateToIndex = timeIndex;
            this.videoTag.play();
            window.cancelAnimationFrame(closureForward);
            window.requestAnimationFrame(closureForward);
        }

        function closureForward() {
            console.log('-----------');
            console.log(self.animateToIndex);
            if(self.animateToIndex <= self.videoTag.currentTime){
                self.videoTag.pause();
                window.cancelAnimationFrame(closureForward);
                resolve(self.videoTag.currentTime);
                return;
            } else {
                window.requestAnimationFrame(closureForward);
            }
        }
    }.bind(this));
}
