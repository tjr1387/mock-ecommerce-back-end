# Mock E-Commerce Back-End
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
This app is a small sample of using ORM, as it relates to an online shop. There are three interlinked, modeled objects (Products, Categories, Tags) which are primary, and a fourth object (ProductTag) which serves as a conduit to map the many-to-many relationship between Prodcuts and Tags. Five routes for each of the three objects have been created to demonstrate full CRUD (GET all, GET one, POST one, PUT one, DELETE one), and can be tested by using Insomnia (or a different API tool).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Tests](#tests)
- [Comments/Flaws](#commentsflaws)
- [License](#license)

## Installation

Packages needed are 'dotenv', 'express', 'mysql2' and 'sequelize'. It goes without saying you'll also need a SQL based DB.

## Usage

Once the dependencies have been installed, and the DB program has been synced with Express, create the the 'e-commerce' DB by running 'db/schema.sql'. Then run the file 'seeds/index.js' to seed the database you just created. This should be all you need to do prior to testing out the endpoints. Run the 'server.js' base level file so it starts listening, then using an API tool (Insomnia, Postman, et al.), you can start testing the routes. Each will fall under the path '/api' + '/{model_name}', where 'model_name' is one of: products, categories, tags. For the GET-all methods, that is all you need, and the response object should show everything in the respective table. The GET-one, PUT, and DELETE routes will need an additional level '/{id}' with the row (corresponding to its id) that is to be read/modified/deleted. If you use an id that doesn't exist, you'll received a JSON response telling you so. The POST route obviously doesn't need the id path layer in 'req.params', but like the PUT routes, does need to be properly formatted with appropriate column names. For the Category and Tag POST/PUT, you only need one field (the name), as those two tables are just a name and auto-ID. The Product's POST/PUT are much more complicated (so complicated that they were written for us!) as product has several columns. There is a commeneted out example of a correct request object to use when testing these routes, aptly inside the 'product-routes' file. To check whether your create/update/delete actions actually worked, you can use Workbench and query it, but I found it easier just to do a GET (or GET all) to see if the changes I made were reflected properly.

Link to video: https://drive.google.com/file/d/11nXoOeJyvw8CBdxRpNpfdMWGx7ErUmJJ/view

Screenshots (a GET all for each model):
![GET all products](./assets/images/GETallproducts.png?raw=true "Getting all products using the seeded data")
![GET all categories](./public/assets/images/GETallcategories.png?raw=true "Getting all categories using the seeded data")
![GET all tags](./public/assets/images/GETalltags.png?raw=true "Getting all tags using the seeded data")

## Credits

GitHub user 'andreasonny83' for a nice boilerplate '.gitignore' file, and as always, a few of our course exercises; great examples off of whcih to build!

## Tests

Because there is no front-end, use an API tool like Insomnia or Postman to test the endpoints. An example of a correctly structured request body for products' endpoints is commented out in the 'product-routes' file.

## Comments/Flaws

There is one big issue -- deleting a category fails if that category has any products. This is an 'onDelete' thing I've et to solve, but all the other methods+endpoints give a 200 back. Other than that, one small thing is the 'product_tag' object has a repeat of both foreign keys it contains. It has the two I made (product_id, tag_id) but also (productId, tagId) which the DB/query creates, which is basically a duplicate, because the values of the two keys I made correspond to their camel-cased versions. There is nothing 'breaking' about this that I can find, but it is superfluous and I'm pretty sure it has to do with _one_ configuration object field being missing/wrong in the models. The JSON response objects on all the GETs are hefty so it's hard to tell if everything is exactly the way it's supposed to be -- but it seems the values of all the critical fields/columns are correct.

## License

Covered under the MIT license.
