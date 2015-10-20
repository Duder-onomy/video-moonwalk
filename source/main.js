var VideoInstance = require('./videoInstance.js');

module.exports = MikesMagicVideoParty;

window.MikesMagicVideoParty = MikesMagicVideoParty;

function MikesMagicVideoParty(videoTagForward, videoTagReverse, options) {
    var reversedOptions = {
            points :     generateReverseTimePoints(options.points)
        };

    this.videoTagForward = new VideoInstance(videoTagForward, options);
    this.videoTagReverse = new VideoInstance(videoTagReverse, reversedOptions);

    this.goToNext = goToNext.bind(this);
    this.goToPrevious = goToPrevious.bind(this);
    this.goToIndex = goToIndex.bind(this);
    this.skipToIndex = skipToIndex.bind(this);
    this.getCurrentIndex = getCurrentIndex.bind(this);

    return this;
}

function goToNext() {
    this.videoTagForward.goToNext();
    this.videoTagReverse.skipToIndex(this.videoTagForward.getCurrentIndex());
}

function goToPrevious() {
    this.videoTagReverse.goToPrevious();
    this.videoTagForward.skipToIndex(this.videoTagReverse.getCurrentIndex());
}

function goToIndex(index) {
    if(index === this.videoTagForward.getCurrentIndex()){
        return;
    } else if(index < this.videoTagForward.getCurrentIndex()){
        this.videoTagReverse.goToIndex(index);
        this.videoTagForward.skipToIndex(this.videoTagReverse.getCurrentIndex());
    } else{
        this.videoTagForward.goToIndex(index);
        this.videoTagReverse.skipToIndex(this.videoTagForward.getCurrentIndex());
    }
}

function skipToIndex(index){
    this.videoTagForward.skipToIndex(index);
    this.videoTagReverse.skipToIndex(this.videoTagForward.getCurrentIndex());
}

function getCurrentIndex() {
    this.videoTagReverse.skipToIndex(this.videoTagForward.getCurrentIndex());
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
