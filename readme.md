1) starting the server - "node index.mjs"

2) Adding the book - POST - http://localhost:4001/books - 
Add this in Postman Body - 
{
    "title": "The Title",
    "author": ["Abhijeet Pawar", "The Book Author"],
    "summary": "Summary will be updated soon. Thank You. ",
    "publication_date": "8-7-2008",
    "genre": ["Political", "Fantasy"]
}

3) Deleting the Book - DELETE - http://localhost:4001/books/:id - 
Add this in Params > Path Variable - id of your book

4) Getting all books - GET - http://localhost:4001/books

5) Getting Specific Book - GET - http://localhost:4001/books/:id - 
Add this in Params > Path Variable - id of your book

6) Updating Book Details - PUT - http://localhost:4001/books/:id - 
Add this in Params > Path Variable - id of your book
Also add this in Body - 
{
    "newContents": {
        "summary" : "Summary will be updated soon...."
    }
}

7) For Test Cases - Add Book - npx mocha tests/controllers_testcases/add_book.controller.test.mjs 
                  - Delete Book -  npx mocha tests/controllers_testcases/delete_book.controller.test.mjs
                  - Update Book - npx mocha tests/controllers_testcases/update_book.controller.test.mjs 
                  - Get specific Book - npx mocha tests/controllers_testcases/get_specific_book.controller.test.mjs
                  - Get all Books - npx mocha tests/controllers_testcases/get_all_book.controller.test.mjs 