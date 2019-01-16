# Save in local JSON file

- Clone this project on your computer.
- Run `npm i`
- open the project in a terminal window
- Run `npm start`

This will start the server on http://localhost:8000/

- In Angular you can do a get request to http://localhost:8000/ to get the todo list
- You can add a todo by doing a post request to http://localhost:8000/add
- The object that you're posting to add a todo need to have a property with the word key as key. You'll find an example below.

```
{
    key: "firstKey",
    todo: "add a todo to the list"
}
```