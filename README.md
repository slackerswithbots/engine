# engine

$ curl http://localhost:8080/api/v1
{"message":"hooray! welcome to our api!"}

Location:  /api/v1
Data:  {}
Method:  GET
Time:  1493497486551

# Data
| Route	                        | HTTP Verb	    | Description                    |
|-------------------------------|---------------|--------------------------------|
| /api/v1/activities            | GET	        | Get all the activities         |
| /api/v1/activities            | POST	        | Create a event.                |
| /api/v1/activities/:event_id	| GET	        | Get a single event.            |
| /api/v1/activities/:event_id	| PUT	        | Update a event with new info.  |
| /api/v1/activities/:event_id	| DELETE	    | Delete a event.                |

{
    "_id" : ObjectId("590514a4b31ff01367da41ec"),
    "eventName" : "rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor",
    "eventType" : "felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices",
    "eventCategory" : "vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia",
    "long" : "114.45541",
    "lat" : "27.92751",
    "dateTime" : "4/30/2017",
    "description" : "id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat"
}