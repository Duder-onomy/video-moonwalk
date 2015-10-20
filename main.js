// module.exports = VideoFastForward;
//
// window.VideoFastForward = VideoFastForward;
//
// function VideoFastForward(videoTag, options){
//     // Throw Error if no video tag, and do simple validation on options.like, check for the index array.
//     // only start after the video tag is fully loaded.
//     // add tweening so the the ff and rr is smooth.
//     this.videoTag = videoTag;
//
//     this.options = options;
//
//     this.currentIndex = 0;
//
//     this.getCurrentIndex = getCurrentIndex.bind(this);
//     this.goToNext = goToNext.bind(this);
//     this.goToPrevious = goToPrevious.bind(this);
//     this.goToIndex = goToIndex.bind(this);
//     this.skipToIndex = skipToIndex.bind(this);
//
//     this.skipToIndex(this.currentIndex);
//
//     console.log(this.options.points[this.currentIndex].timeIndex);
//
//     return this;
// }
//
// function getCurrentIndex() {
//     return this.currentIndex;
// }
//
// function goToNext() {
//     if(this.currentIndex < this.options.points.length - 1) { // the next index is not the last index.
//         animateToTimeIndex.call(this, this.options.points[this.currentIndex + 1].timeIndex);
//         this.currentIndex++;
//     }
// }
//
// function goToPrevious() {
//     this.goToIndex(this.currentIndex - 1);
// }
//
// function goToIndex(indexToGoTo) {
//     var timeIndexToGoTo = this.options.points[indexToGoTo].timeIndex;
//
//     if(timeIndexToGoTo < this.videoTag.currentTime) {
//         this.videoTag.currentTime = timeIndexToGoTo;
//         this.currentIndex = indexToGoTo;
//     } else {
//         animateToTimeIndex.call(this, timeIndexToGoTo);
//         this.currentIndex = indexToGoTo;
//     }
//
//     // if(indexToGoTo > this.currentIndex && indexToGoTo !== this.options.points.length) { // index is greater than the current but not the last
//     //     animateToTimeIndex.call(this, timeIndexToGoTo);
//     //     this.currentIndex = indexToGoTo;
//     // }
//     //
//     // if(indexToGoTo < this.currentIndex && indexToGoTo >= 0) { // index is less than the current but not the first
//     //     this.videoTag.currentTime = timeIndexToGoTo;
//     //     this.currentIndex = indexToGoTo;
//     // }
// }
//
// function skipToIndex(indexToSkipTo) {
//     if(indexToSkipTo > this.currentIndex && indexToSkipTo !== this.options.points.length) { // index is greater than the current but not the last
//         this.videoTag.currentTime = this.options.points[indexToSkipTo].timeIndex;
//         this.currentIndex = indexToSkipTo;
//     }
//
//     if(indexToSkipTo < this.currentIndex && indexToSkipTo >= 0) { // index is less than the current but not the first
//         this.videoTag.currentTime = this.options.points[indexToSkipTo].timeIndex;
//         this.currentIndex = indexToSkipTo;
//     }
// }
//
// function animateToTimeIndex(timeIndex) {
//     var self = this;
//
//     if(timeIndex > self.videoTag.currentTime){
//         this.animateToIndex = timeIndex;
//         this.videoTag.play();
//         window.cancelAnimationFrame(closureForward);
//         window.requestAnimationFrame(closureForward);
//     }
//
//     function closureForward() {
//         console.log('-----------');
//         console.log(self.animateToIndex);
//         if(self.animateToIndex <= self.videoTag.currentTime){
//             self.videoTag.pause();
//             window.cancelAnimationFrame(closureForward);
//             return;
//         } else {
//             window.requestAnimationFrame(closureForward);
//         }
//     }
// }
