# video-moonwalk
js library for scrolling through a video both forwards and backwards.

[![Build Status](https://travis-ci.org/mjmostachetti/video-moonwalk.svg?branch=master)](https://travis-ci.org/mjmostachetti/video-moonwalk)

# install

With [npm](http://npmjs.org) do:

```
npm install video-moonwalk
```

# API Usage

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

// Play forward video, move position of backwards video
VideoMoonwalk.goToNext();

// Play backwards video, move position of forwards video
VideoMoonwalk.goToPrevious();

// Play either the forwards or backwards video to the correct Index, depending on the timepoint
VideoMoonwalk.goToIndex(index)

// Skip the forwards and backwards videos to the correct time indexes
VideoMoonwalk.skipToIndex(0);)
```

# Live Examples

http://designworx.thinksolid.com/process





