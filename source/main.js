var VideoInstance = require('./videoInstance.js'),
    BB = require('bluebird'),
    self = null;

module.exports = MikesMagicVideoParty;

window.MikesMagicVideoParty = MikesMagicVideoParty;

function MikesMagicVideoParty(videoTagForward, videoTagReverse, options) {
    var reversedOptions = {
            points :     generateReverseTimePoints(options.points)
        };



    this.videoForwardInstance = new VideoInstance(videoTagForward, options);
    this.videoReverseInstance = new VideoInstance(videoTagReverse, reversedOptions);

    this.totalVideoTimeLength = options.points.slice(-1)[0].timeIndex;

    this.goToNext = goToNext.bind(this);
    this.goToPrevious = goToPrevious.bind(this);
    this.goToIndex = goToIndex.bind(this);
    this.skipToIndex = skipToIndex.bind(this);
    this.getCurrentIndex = getCurrentIndex.bind(this);

    return this;
}

function goToNext() {
    self = this;
    this.videoForwardInstance.goToNext()
    .then(function(currentTime){
        self.videoReverseInstance.skipToIndex(self.videoForwardInstance.getCurrentIndex());
        self.videoReverseInstance.setCurrentTime(self.totalVideoTimeLength - currentTime);
    });
}

function goToPrevious() {
    self = this;
    this.videoReverseInstance.goToPrevious()
    .then(function(currentTime){
        self.videoForwardInstance.skipToIndex(self.videoReverseInstance.getCurrentIndex());
        self.videoForwardInstance.setCurrentTime(self.totalVideoTimeLength - currentTime);
    });
}

function goToIndex(index) {
    self = this;
    if(index === self.videoForwardInstance.getCurrentIndex()){
        return;
    } else if(index < self.videoForwardInstance.getCurrentIndex()){
        self.videoReverseInstance.goToIndex(index)
            .then(function(currentTime){
                console.log(currentTime);
                self.videoForwardInstance.skipToIndex(self.videoReverseInstance.getCurrentIndex());
                self.videoForwardInstance.setCurrentTime(self.totalVideoTimeLength - currentTime);
                console.log(self.videoReverseInstance.getCurrentTime());
                console.log(self.videoForwardInstance.getCurrentTime());
            });
        //

    } else {
        self.videoForwardInstance.goToIndex(index)
            .then(function(currentTime){
                console.log(currentTime);
                self.videoReverseInstance.skipToIndex(self.videoForwardInstance.getCurrentIndex());
                self.videoReverseInstance.setCurrentTime(self.totalVideoTimeLength - currentTime);
                console.log("time here");
                console.log('should be ', self.totalVideoTimeLength - currentTime);
                console.log(self.videoReverseInstance.getCurrentTime());
                console.log(self.videoForwardInstance.getCurrentTime());
            });
    }
}

function skipToIndex(index){
    this.videoForwardInstance.skipToIndex(index);
    this.videoReverseInstance.skipToIndex(this.videoForwardInstance.getCurrentIndex());
}

function getCurrentIndex() {
    this.videoReverseInstance.skipToIndex(this.videoForwardInstance.getCurrentIndex());
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
