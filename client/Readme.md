A small [bones](http://github.com/developmentseed/bones) experiment that allows you to log in using twitter's oauth functionality.

uses [passport](https://github.com/jaredhanson/passport).

You need to create a settings.json in the root directory containing the following :

	{
	    "twitter_consumer_key": "get me from dev.twitter.com",
	    "twitter_consumer_secret": "get me from dev.twitter.com"
	}

Run the application with : 

	./index.js --config settings.json

