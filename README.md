# Campus Share :rabbit2: 
Welcome to Campus Share! Here's what we have documented:  
- [X] Dependencies
- [X] Development Environment Setup
- [X] Running the Application
- [ ] Testing
- [X] Debugging

## Dependencies
* [node.js](https://nodejs.org/en/)
* Your preferred IDE (we :blue_heart: [VS Code](https://code.visualstudio.com/Download)) 
* Git BASH/GUI (we recommend [GitHub Desktop](https://desktop.github.com/)) 

## Set Up Your Development Environment!
1. Clone this repo locally  
Command line:  
```
git clone https://github.com/faqima01/SeniorProjectFrontend.git
```
2. Install dependencies:  
Command line:  
```
npm install
```  
:warning:  
If you recieve an error as described below in the debugging section, check out [npm-install-all](https://www.npmjs.com/package/npm-install-all) as an alternate method.

## Running the Application
Start command:  
```
npm start
```
Tip: you can install [nodemon](https://nodemon.io/) to automatically reload the app to reflect changes!  

## Testing
:construction_worker: Under construction!

## Debugging
### Installing dependencies
:bulb:  
If you recieve a variation on the following error:  
```
could not find module "XXX"
```  
try running the following command:  
```
npm install "XXX"
```  
replacing "XXX" with the module name.  

Contact us with any questions, comments, concerns, or feedback!

## Backend APIs for Database (CRUD) Operations

### Security of App Keys
We have a number of API and Secret Access Keys. These are defined as environment variables; make sure when developing locally, you have a .env file with these variables. If you add any to the application, you will need to add these as environment variables on AWS Amplify as well. This is done by adding the variables directly in the build settings.

### 'Select' API

* **Purpose:** This API serves the 'Select' operations on the database. 
* **URL:** https://h1xqnteg60.execute-api.us-east-2.amazonaws.com/SelectProd
* **Method:** GET
* **Parameters:** 
    
    _Note:_ Ignore the square brackets
    1. `table=[tablename]`: specify the table(s) name here
    2. `field=[fieldname]`: specify the field(s) name here
    3. `condition=[fieldname=value]`(optional): specify the condition that follows the MySQL where clause. If the value is string, it must be enclosed in '' single quotes. 
* **How to use:**
    * Append your desired API call (as listed below) to the above URL and you will get the JSON that will contain your answer, for example: https://h1xqnteg60.execute-api.us-east-2.amazonaws.com/SelectProd?table=Textbooks&field=book_author will return book_author fields from Textbooks table
    * Remember that all parameters and values are case-sensitive, e.g. table=textbooks will give error because textbooks must be Textbooks
    * As you can see below, if you want to call multiple fields and/or multiple tables and/or multiple multiple conditions, just separate them with , (comma) as you would in SQL clauses

* **Example API Calls:**
    * Querying one field in one table: ```?table=Textbooks&field=book_author```
    * Querying multiple fields in one table: ```?table=Textbooks&field=book_author,book_id```
    * Querying all fields in one table: ```?table=Textbooks&field=*```
    * Querying multiple tables: ```?table=Textbooks,Users&field=Textbooks.owner```
    * Querying a field with a condition: ```?table=Textbooks&field=*&condition=book_id=24```
    * Querying a field with multiple conditions: ```?table=Textbooks&field=*&condition=book_author=Example Artist, course=CS150```

### 'Delete' API

* **Purpose:** This API serves the 'Delete' operations on the database. 
* **URL:** https://a2cisw63pb.execute-api.us-east-2.amazonaws.com/Prod
* **Method:** GET
* **Parameters:** 
    
    _Note:_ Ignore the square brackets
    1. `table=[tablename]`: specify the table(s) name here
    2. `condition=[fieldname=valuename]`: specify the condition here. If the value is string, it must be enclosed in '' single quotes. An example condition: book_id=4 will ensure that book with id #4 will be deleted.

* **How to use:**
    * Append your desired API call (as listed below) to the above URL and you will get the JSON that will contain your answer, for example: https://a2cisw63pb.execute-api.us-east-2.amazonaws.com/Prod?table=Misc&condition=item_id=4 will delete the record with id#4 from Misc table 
    * Remember that all parameters and values are case-sensitive, e.g. table=textbooks will give error because textbooks must be Textbooks
    * As you can see below, if you want to call multiple fields and/or multiple tables and/or multiple multiple conditions, just separate them with , (comma) as you would in SQL clauses

* **Example API Calls:**
    * Delete the record(s) with a condition from a table: ```?table=Textbooks&condition=book_id=3```
    * Delete the record(s) with multiple conditions from a table: ```?table=Textbooks&condition=book_author='Sample Author' AND book_category='Sample Category'```

### 'Insert' API

* **Purpose:** This API serves the 'Insert' operations on the database. 
* **URL:** https://00tyqs4c74.execute-api.us-east-2.amazonaws.com/Prod
* **Method:** GET
* **Parameters:** 
    
    _Note:_ Ignore the square brackets
    1. `table=[tablename]`: specify the table(s) name here
    2. `field=[fieldname]`: specify the field(s) for which you want to insert values
    3. `value=[valuename]`: specify the value(s) for the above field(s). If the value is string, make sure it is enclosed in ''. Also, there are more than one value, separate them with , (comma)

* **How to use:**
    * Append your desired API call (as listed below) to the above URL and you will get the JSON that will contain your answer, for example: https://00tyqs4c74.execute-api.us-east-2.amazonaws.com/Prod?table=Misc&field=item_name&value=testItem3 will insert a record with testItem3 for item_name field into Misc table 
    * Remember that all parameters and values are case-sensitive, e.g. table=textbooks will give error because textbooks must be Textbooks
    * As you can see below, if you want to call multiple fields and/or multiple tables and/or multiple multiple conditions, just separate them with , (comma) as you would in SQL clauses

* **Example API Calls:**
    * Insert a record into a table with a field and its value: ```?table=Textbooks&field=book_name&value='The Alchemist'```
    * Insert a record into a table with multiple fields, with their corresponding values: ```?table=Textbooks&field=book_name, book_author&value='The Alchemist', 'Paulo Coelho'``` 

### 'Update' API

* **Purpose:** This API serves the 'Delete' operations on the database. 
* **URL:** https://qa1gniaexi.execute-api.us-east-2.amazonaws.com/Prod
* **Method:** GET
* **Parameters:** 
    
    _Note:_ Ignore the square brackets
    1. `table=[tablename]`: specify the table(s) name here
    2. `field=[fieldname]`: specify the field(s) for which you want to update their values
    3. `value=[valuename]`: specify the updated value(s) for the above field(s). If the value is string, make sure it is enclosed in ''. Also, there are more than one value, separate them with , (comma)
    4. `condition=[fieldname=valuename]`: specify the condition here that will specify the record that should be updated, e.g. book_id=4 for updating the book with id #4


* **How to use:**
    * Append your desired API call (as listed below) to the above URL and you will get the JSON that will contain your answer, for example: https://qa1gniaexi.execute-api.us-east-2.amazonaws.com/Prod?table=Misc&field=item_name&value='NewValue'&condition=item_id=1 will update a record with id #1 with new value for its item_name field Misc table 
    * Remember that all parameters and values are case-sensitive, e.g. table=textbooks will give error because textbooks must be Textbooks

* **Example API Calls:**
    * Update a record with a new value for its field into a table: ```?table=Misc&field=item_name&value=ThisItem&condition=item_id=1```