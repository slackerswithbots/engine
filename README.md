# engine

$ curl http://localhost:8080/api/v1
{"message":"hooray! welcome to our api!"}

Location:  /api/v1
Data:  {}
Method:  GET
Time:  1493497486551

# Data
| Route	                    | HTTP Verb	    | Description                    |
|---------------------------|---------------|--------------------------------|
| /api/v1/events	        | GET	        | Get all the events.            |
| /api/v1/events	        | POST	        | Create a event.                |
| /api/v1/events/:event_id	| GET	        | Get a single event.            |
| /api/v1/events/:event_id	| PUT	        | Update a event with new info.  |
| /api/v1/events/:event_id	| DELETE	    | Delete a event.                |