Working on creating an MVC for a video rental service, just the backend for now in node, express, and mongoose/mongo. 

I'm trying to create a genres.js route with basic CRUD operations that pulls from genresController.js. Testing using Postman

Current issues:
-any GET call to /api/genres returns the entire genres collection, despite there being a /api/genres and /api/genres/:name route with associated functions defined.
-POST call to /api/genres returns "CANNOT POST /api/genres 

Example:
Sending GET to localhost:3000/api/genres with no body returns entire genre collection (working as intended)
Sending GET to localhost:3000/api/genres with {"name":"Horror"} JSON body also returns entire genre collection. Plopped a console.log in the getGenre function and it's not even being called at all.


I feel like I'm missing something very simple here.