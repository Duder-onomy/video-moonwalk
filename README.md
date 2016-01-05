# video-moonwalk

#### Purpose

This library was built to solve the problem of playing a movie forwards and backwards, to predefined time-points.
In my example below you can scroll and click through sections within in a movie.

[![Build Status](https://travis-ci.org/mjmostachetti/video-moonwalk.svg?branch=master)](https://travis-ci.org/mjmostachetti/video-moonwalk)

# Install

With [npm](http://npmjs.org) do:

```
npm install video-moonwalk
```

# API Usage
#### Initialize
```
// Initialize VideoMoonwalk
VideoMoonwalk = new VideoMoonwalk(videoTagForwards,videoTagBackwards, options);

// the options argument should look something like this :
options = {
    points : [
        {
            timeIndex : 0 // always zero
        },
        {
            timeIndex : 4
        },
        {
            timeIndex : 6
        },
        {
            timeIndex : 12
        },
        {
            timeIndex : 16.65 // total movie length
        }
    ]
}
```
#### .goToNext()
```
// Play forward video, move position of backwards video
VideoMoonwalk.goToNext()
```
#### .goToPrevious
```
// Play backwards video, move position of forwards video
VideoMoonwalk.goToPrevious()
```
#### .goToIndex(index)
```
// Play either the forwards or backwards video to the correct index,
// depending on the current time-point
VideoMoonwalk.goToIndex(index)
```
#### .skipToIndex(index)
```
// Skip the forwards and backwards videos to the correct time indexes
VideoMoonwalk.skipToIndex(0)
```
#### .getCurrentIndex()
```
// Get index of forward movie
VideoMoonwalk.getCurrentIndex()
```
#### . getCurrentTime()
```
// Get current time(in seconds) of the forward video
VideoMoonwalk.getCurrentTime()
```

# Live Examples

http://designworx.thinksolid.com/process

Checkout the demo directory above for a simple visualization.





