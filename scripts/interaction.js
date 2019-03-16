var stories = [
    {
        'title': 'CitySensing: Fusing City Data for Visual Storytelling </br><font size="2">Please use left and right arrow keys.</font>'
    },
    {
        'explanation': 'Emergency events happen across the globe. During these events, more and more people are using social media such as Twitter to post information about what is happening.',
        'image': './img/twitter.png'
    },
    {
        'title': 'Although we know that people use social media during these times, can we visualize how an event unfolds by tracking people\'s digital footprints?'
    },
    {
        'title': 'We decided to follow the CitySensing paper and extended it to visualize a nationwide event. The event we chose was Hurricane Sandy, which occurred from October 22, 2012 to November 2, 2012. We focused on the tweets that occurred in the United States during this time.'
    },
    { 
        'explanation': 'We created a map view of the United States and plotted where the tweets came from using a dot.',
        'image': './img/mapview.png'
    },
    {
        'explanation': 'We have a slider to allow people to step through the different days when the hurricane was hitting the United States. Clicking "PLAY" will show an animation of tweets throughout the duration of the hurricane.',
        'image': './img/mapview.png'
    },
    {
        'explanation': 'Clicking into a state zooms into the state. Here we have zoomed into the state of New York.',
        'image': './img/zoom.PNG'
    },
    {
        'explanation': 'We used sentiment analysis to show the nouns that were used in the tweets.',
        'image': './img/wordcloud.PNG'
    },
    {
        'explanation': 'We created this graph view showing which Twitter users used certain hashtags. Users are shown in gray while hashtags are shown in red.',
        'image': './img/graph.png'
    },
    {
        'explanation': 'Hovering over each of the dots shows either the username or the hashtag. Clicking on a dot shows the correlation to the other ones. For example, clicking on a user, you can see if it used a certain hashtag. Clicking on a hashtag shows which users used that hashtag. Here, we see which users have used the hashtag #HurricaneSandy.',
        'image': './img/graphexample.png'
    },
    {
        'title': 'We chose the most popular hashtags to visualize and see they mainly revolve around the name of the hurricane.'
    }, 
    {
        'explanation': 'We also graphed the peak wind speeds of the hurricane during its lifetime.',
        'image': './img/windspeed.png'
    },
    {
        'explanation': 'We see as we step through time, more tweets begin to show, with a cluster forming in the Northeastern part of the United States, where the hurricane was hitting.',
        'image': './img/map1.png'
    },
    {
        'explanation': 'We see as we step through time, more tweets begin to show, with a cluster forming in the Northeastern part of the United States, where the hurricane was hitting.',
        'image': './img/map2.png'
    },
    {
        'explanation': 'We see as we step through time, more tweets begin to show, with a cluster forming in the Northeastern part of the United States, where the hurricane was hitting.',
        'image': './img/map3.png'
    },
    {
        'explanation': 'We see as we step through time, more tweets begin to show, with a cluster forming in the Northeastern part of the United States, where the hurricane was hitting.',
        'image': './img/map4.png'
    },
    {
        'explanation': 'We see as we step through time, more tweets begin to show, with a cluster forming in the Northeastern part of the United States, where the hurricane was hitting.',
        'image': './img/map5.png'
    },
    {
        'explanation': 'We see as we step through time, more tweets begin to show, with a cluster forming in the Northeastern part of the United States, where the hurricane was hitting.',
        'image': './img/map6.png'
    },
    {
        'explanation': 'We see as we step through time, more tweets begin to show, with a cluster forming in the Northeastern part of the United States, where the hurricane was hitting.',
        'image': './img/map7.png'
    },
    {
        'title': 'We see from the tweets, more tweets begin to appear from October 28, 2012, to October 29, 2012, the peak time of the hurricane.'
    },
    {
        'explanation': 'This correlates well with the wind speeds, as we see that the peak wind speed was on October 29, 2012.',
        'image': './img/windspeed.PNG'
    },
    {
        'explanation': 'We even see tweets that reflect the danger of the hurricane during this time.',
        'image': './img/mphexample.png'
    },
    {
        'explanation': 'Here we see a tweet on October 30, 2012, detailing winds of the hurricane to be greater than 60 miles per hour, correlating well with the line graph of windspeed.',
        'image': './img/mphexample.png'
    },
    {
        'explanation': 'We see tweets corresponding to articles published after the hurricane.',
        'image': './img/nytimes.png'
    },
    {
        'explanation': 'We see people worried and emotional over the hurricane.',
        'image': './img/emotionexample.png'
    },
    {
        'title': 'From our visualization, we see stories of people\'s lives appear and see how the hurricane affected them.'
    },
    {
        'title': 'Please explore our visualization on the next slide. </br> <font size=2>NOTE: Once you go to the next slide, you cannot come back to the storyline.</font>'
    }
]

function updateStory(storyNum, stories) {
    var currentStory = stories[storyNum];
    if (currentStory['title']) {
        hideExplanation();
        showTitle();
        $('#title').html(currentStory['title']);
    } else {
        $('#title').html('');
    }
    if (currentStory['explanation']) {
        hideTitle();
        showExplanation();
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
        if (storyNum == stories.length) {
            window.location.replace("./story.html")
            updateStory(storyNum, stories);
        }
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
                window.location.replace("./index.html");
                // storyNum = stories.length - 1;
			} else {
				storyNum++;
			}
    		updateStory(storyNum, stories);
    	}
    }
});

function hideExplanation() {
    $("#story").addClass("hide");
}

function showExplanation() {
    $("#story").removeClass("hide");
}

function hideTitle() {
    $("#title-div").removeClass("flex");
    $("#title-div-2").removeClass("flex");
    $("#title-div").addClass("hide");
    $("#title-div-2").addClass("hide");
    $("#title").addClass("hide");
}

function showTitle() {
    $("#title-div").removeClass("hide");
    $("#title-div-2").removeClass("hide");
    $("#title").removeClass("hide");
    $("#title-div").addClass("flex");
    $("#title-div-2").addClass("flex");
}