# engine

$ curl http://localhost:8080/api/v1
{"message":"hooray! welcome to our api!"}

Location:  /api/v1
Data:  {}
Method:  GET
Time:  1493497486551

# Data
| Route	                | HTTP Verb	    | Description                   |
|-----------------------|---------------|-------------------------------|
| /api/bears	        | GET	        | Get all the bears.            |
| /api/bears	        | POST	        | Create a bear.                |
| /api/bears/:bear_id	| GET	        | Get a single bear.            |
| /api/bears/:bear_id	| PUT	        | Update a bear with new info.  |
| /api/bears/:bear_id	| DELETE	    | Delete a bear.                |