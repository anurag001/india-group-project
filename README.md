## india-group-project

# Feeds end point

1. For searching with headlin string
GET
https://localhost:8080/feeds/headline?search=<search>

2. For other filters with pagination
GET
https://localhost:8080/feeds/10/1

3. For other filters with pagination + Sorting
GET
https://localhost:8080/feeds/10/1?author=<name>&category=<>&order_by=1
https://localhost:8080/feeds?author=<name>&category=<>&order_by=-1

# Users end point

1. For getting user with specific id
GET
https://localhost:8080/users/<id>

2. For creating User
POST
https://localhost:8080/users/

3. For updating user
PUT
https://localhost:8080/users/<id>



