var stories = [
    {
        'explanation': 'CitySensing'
    },
    {
        'explanation': 'Emergency events happen across the globe. During these events, more and more people are using social media such as Twitter to post information about what is happening.',
        'image': 'https://www.petmd.com/sites/default/files/types-of-hamsters.jpg'
    },
    {
        'explanation': 'Although we know that people use social media during these times, can we visualize how an event unfolds by tracking people\'s digital footprints?',
        'image': 'https://www.petmd.com/sites/default/files/types-of-hamsters.jpg'
    },
    {
        'explanation': 'We decided to follow the CitySensing paper and extended it to visualize a nationwide event. The event we chose was Hurricane Sandy, which occurred from October 22, 2012 to November 2, 2012.'
    },
    { 
        'explanation': 'Here is a map view.'
    },
    {
        'explanation': 'Here is a graph view.'
    }
]

function updateStory(storyNum, stories) {
    var currentStory = stories[storyNum];
    if (currentStory['explanation']) {
        $('#explanation').html(currentStory['explanation']);
    } else {
        $('#explanation').html('');
    }

    if (currentStory['image']) {
        $('#image').attr('src', currentStory['image']);
    } else {
        $('#image').attr('src', '');        
    }
}

let storyNum = 0;
updateStory(storyNum, stories);
$(document).on('keydown', function(event) {
    if(event.keyCode == 37) {
		event.preventDefault();
		if (storyNum < stories.length) {
			if (storyNum <= 0) {
				storyNum = 0;
			} else {
				storyNum--;
			}
    		updateStory(storyNum, stories);
    	}
    }
    else if(event.keyCode == 39) {
    	event.preventDefault();
    	if (storyNum < stories.length) {
			if (storyNum >= stories.length - 1) {
				storyNum = stories.length - 1;
			} else {
				storyNum++;
			}
    		updateStory(storyNum, stories);
    	}
    }
});