BookMyShow API Documentation

# AuthController

## POST /api/auth/login

Description: Logs in a user using email and password

Authorization: Not required

Request Body:

{  
"email": "<john@example.com>",  
"password": "password123"  
}

Response:

{  
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",  
"user": {  
"userId": 1,  
"name": "John Doe",  
"email": "<john@example.com>",  
"password": "hashed_password",  
"picture": "<https://example.com/john.jpg>",  
"isAdmin": false  
}  
}

## POST /api/auth/register

Description: Registers a new user

Authorization: Not required

Request Body:

{  
"name": "John Doe",  
"email": "<john@example.com>",  
"password": "password123",  
"picture": "<https://example.com/john.jpg>"  
}

Response:

{  
"userId": 1,  
"name": "John Doe",  
"email": "<john@example.com>",  
"password": "hashed_password",  
"picture": "<https://example.com/john.jpg>",  
"isAdmin": false  
}

## GET /api/users/{id}

Description: Fetch user details by user ID

Authorization: Admin required

Response:

{  
"userId": 1,  
"name": "John Doe",  
"email": "<john@example.com>",  
"password": "hashed_password",  
"picture": "<https://example.com/john.jpg>",  
"isAdmin": false  
}

## GET /api/users

Description: Fetch list of all users

Authorization: Admin required

Response:

\[  
{  
"userId": 1,  
"name": "John Doe",  
"email": "<john@example.com>",  
"password": "hashed_password",  
"picture": "<https://example.com/john.jpg>",  
"isAdmin": false  
},  
{  
"userId": 2,  
"name": "Jane Smith",  
"email": "<jane@example.com>",  
"password": "hashed_password",  
"picture": "<https://example.com/jane.jpg>",  
"isAdmin": true  
}  
\]

## PUT /api/toogleAdmin/{id}

Description: Toggle admin status for a user

Authorization: Admin required

Response:

{  
"userId": 1,  
"isAdmin": true  
}

## DELETE /api/delete/{id}

Description: Delete a user by ID

Authorization: Logged-in user

Response:

{  
"message": "User deleted successfully"  
}

# BookingController

## POST /api/ticket

Description: Book movie tickets

Authorization: Logged-in user

Request Body:

{  
"userId": 1,  
"showId": 2,  
"tickets": 3  
}

Response:

{  
"movieName": "Interstellar",  
"date": "2025-04-15",  
"time": "18:00",  
"cinemaHall": "Hall A",  
"seats": 3,  
"customerName": "John Doe"  
}

## GET /api/bookings

Description: Fetch all bookings

Authorization: Logged-in user

Response:

\[  
{  
"bookingId": 1,  
"userId": 1,  
"movieId": 2,  
"movieName": "Interstellar",  
"tickets": 3,  
"date": "2025-04-15",  
"time": "18:00",  
"cinemaHall": "Hall A"  
}  
\]

## GET /api/bookings/{id}

Description: Fetch bookings by user ID

Authorization: Logged-in user

Response:

\[  
{  
"bookingId": 1,  
"userId": 1,  
"movieId": 2,  
"movieName": "Interstellar",  
"tickets": 3,  
"date": "2025-04-15",  
"time": "18:00",  
"cinemaHall": "Hall A"  
}  
\]

# MovieController

## GET /api/movies

Description: Fetch all movies (optionally filter by genre)

Authorization: Logged-in user

Example: /api/movies?genre=Action

Response:

\[  
{  
"movieId": 1,  
"title": "Inception",  
"imageUrl": "<https://example.com/inception.jpg>",  
"genre": "Sci-Fi",  
"duration": 148,  
"description": "A thief who steals corporate secrets through dream-sharing."  
}  
\]

## GET /api/movies/{id}

Description: Get movie details by ID

Authorization: Logged-in user

Response:

{  
"movieId": 1,  
"title": "Inception",  
"imageUrl": "<https://example.com/inception.jpg>",  
"genre": "Sci-Fi",  
"duration": 148,  
"description": "A thief who steals corporate secrets through dream-sharing."  
}

## POST /api/movies/create

Description: Add a new movie

Authorization: Admin required

Request Body:

{  
"title": "Inception",  
"imageUrl": "<https://example.com/inception.jpg>",  
"genre": "Sci-Fi",  
"duration": 148,  
"description": "A thief who steals corporate secrets through dream-sharing."  
}

Response:

{  
"movieId": 1,  
"title": "Inception",  
"imageUrl": "<https://example.com/inception.jpg>",  
"genre": "Sci-Fi",  
"duration": 148,  
"description": "A thief who steals corporate secrets through dream-sharing."  
}

## PUT /api/movies/update/{id}

Description: Update movie details by ID

Authorization: Admin required

Request Body:

{  
"title": "Inception Updated",  
"imageUrl": "<https://example.com/inception-new.jpg>",  
"genre": "Thriller",  
"duration": 150,  
"description": "Updated description here."  
}

Response:

{  
"movieId": 1,  
"title": "Inception Updated",  
"imageUrl": "<https://example.com/inception-new.jpg>",  
"genre": "Thriller",  
"duration": 150,  
"description": "Updated description here."  
}

## DELETE /api/movies/delete/{id}

Description: Delete a movie by ID

Authorization: Admin required

Response:

{  
"message": "Movie deleted successfully"  
}

# SlotController

## POST /api/movies/slots/create

Description: Create a new slot for a movie

Authorization: Admin required

Request Body:

{  
"movieId": 1,  
"startTime": "2025-04-15T14:00:00",  
"endTime": "2025-04-15T16:00:00",  
"availableSeats": 100  
}

Response:

{  
"slotId": 1,  
"movieId": 1,  
"startTime": "2025-04-15T14:00:00",  
"endTime": "2025-04-15T16:00:00",  
"availableSeats": 100  
}

## GET /api/movies/slots/{movieId}

Description: Fetch all available slots for a movie by movie ID

Authorization: Logged-in user

Response:

\[  
{  
"slotId": 1,  
"movieId": 1,  
"startTime": "2025-04-15T14:00:00",  
"endTime": "2025-04-15T16:00:00",  
"availableSeats": 100  
},  
{  
"slotId": 2,  
"movieId": 1,  
"startTime": "2025-04-15T16:30:00",  
"endTime": "2025-04-15T18:30:00",  
"availableSeats": 50  
}  
\]

## GET /api/movies/slots/{slotId}

Description: Fetch details of a specific slot by slot ID

Authorization: Logged-in user

Response:

{

"slotId": 1,

"movieId": 1,

"startTime": "2025-04-15T14:00:00",

"endTime": "2025-04-15T16:00:00",

"availableSeats": 100

}

**PUT /api/movies/slots/update/{slotId}**

Description: Update a movie slot by slot ID  
Authorization: Admin required

Request Body:

{

"startTime": "2025-04-15T14:30:00",

"endTime": "2025-04-15T16:30:00",

"availableSeats": 120

}

Response:

{

"slotId": 1,

"movieId": 1,

"startTime": "2025-04-15T14:30:00",

"endTime": "2025-04-15T16:30:00",

"availableSeats": 120

}

**DELETE /api/movies/slot/delete/{slotId}**

Description: Delete a slot by slot ID  
Authorization: Admin required

Response:

{

"message": "Slot deleted successfully"

}
