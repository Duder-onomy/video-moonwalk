var TWEEN = require('tween.js');

module.exports = VideoFastForward;

window.VideoFastForwardFor = VideoFastForward;
window.VideoFastForwardRev = VideoFastForward;

function VideoFastForward(videoTag,options){
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

    this.goToIndex(this.currentIndex);

    return this;
}

function getCurrentIndex() {
    return this.currentIndex;
}

function goToNext() {
    console.log("goToNext");
    animateToTimeIndex.call(this, this.options.points[this.getCurrentIndex() + 1].timeIndex);
    this.currentIndex++;
}

function goToPrevious() {
    console.log("goToPrevious");
    // if already at the top
    if(this.getCurrentIndex === 0){
        return;
    }
    animateToTimeIndex.call(this, this.options.points[this.getCurrentIndex() - 1].timeIndex);
    this.currentIndex--;
}

function goToIndex(index) {
    console.log("goToIndex");
    var indexObj = this.options.points[index];
    this.currentIndex = index;
    this.videoTag.currentTime = indexObj.timeIndex;
}

function animateToTimeIndex(timeIndex) {
    var self = this;
    console.log(timeIndex);
    console.log("This is the current time: ",self.videoTag.currentTime);
    console.log("This is the current Index: ", self.currentIndex);

    if(timeIndex > self.videoTag.currentTime){
        console.log("Going forward.");
        console.log(self.videoTag);
        self.videoTag.play();
        window.requestAnimationFrame(closureForward);
    }

    function closureForward() {
        // start playing the video.
        // setup a RAF to check the current video time agains the time index
        console.log(timeIndex);
        console.log(self.videoTag.currentTime);

        if(timeIndex <= self.videoTag.currentTime){
            self.videoTag.pause();
            window.cancelAnimationFrame(closureForward);
            return;
        } else {
            window.requestAnimationFrame(closureForward);
        }
    }

    function reverse() {
        console.log("This is where I want to be: ",timeIndex);
        console.log(self.videoTag.currentTime);

        if((timeIndex + 0.1) >= self.videoTag.currentTime){
            //self.videoTag.pause();
            //window.cancelAnimationFrame(closureForward);
            return;
        } else{
            self.videoTag.currentTime -= 0.5;
            setTimeout(reverse,500);
        }
    }
}






/* This is the old way without having a video in reverse


function VideoFastForward(videoTag,options){
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

    this.goToIndex(this.currentIndex);

    return this;
}

function getCurrentIndex() {
    return this.currentIndex;
}

function goToNext() {
    console.log("goToNext");
    animateToTimeIndex.call(this, this.options.points[this.getCurrentIndex() + 1].timeIndex);
    this.currentIndex++;
}

function goToPrevious() {
    console.log("goToPrevious");
    // if already at the top
    if(this.getCurrentIndex === 0){
        return;
    }
    animateToTimeIndex.call(this, this.options.points[this.getCurrentIndex() - 1].timeIndex);
    this.currentIndex--;
}

function goToIndex(index) {
    console.log("goToIndex");
    var indexObj = this.options.points[index];
    this.currentIndex = index;
    this.videoTag.currentTime = indexObj.timeIndex;
}

function animateToTimeIndex(timeIndex) {
    var self = this;
    console.log(timeIndex);
    console.log("This is the current time: ",self.videoTag.currentTime);
    console.log("This is the current Index: ", self.currentIndex);

    if(timeIndex > self.videoTag.currentTime){
        console.log("Going forward.");
        self.videoTag.play();
        window.requestAnimationFrame(closureForward);
    }

    if(timeIndex < self.videoTag.currentTime){
        console.log("Going backward.");
        reverse();
    }

    function closureForward() {
        // start playing the video.
        // setup a RAF to check the current video time agains the time index
        console.log(timeIndex);
        console.log(self.videoTag.currentTime);

        if(timeIndex <= self.videoTag.currentTime){
            self.videoTag.pause();
            window.cancelAnimationFrame(closureForward);
            return;
        } else {
            window.requestAnimationFrame(closureForward);
        }
    }

    function reverse() {
        console.log("This is where I want to be: ",timeIndex);
        console.log(self.videoTag.currentTime);

        if((timeIndex + 0.1) >= self.videoTag.currentTime){
            //self.videoTag.pause();
            //window.cancelAnimationFrame(closureForward);
            return;
        } else{
            self.videoTag.currentTime -= 0.5;
            setTimeout(reverse,500);
        }
    }
}
*/
