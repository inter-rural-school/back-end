# Internation Rural School Report - Backend

Sections:
- [Tables](#tables)
- [API Endpoints](#api-endpoints)

## Tables
Tables Content:
- [Users](#Users)
- [Admins](#Admins)
- [Boards](#Boards)
- [Schools](#Schools)
- [Issues](#Issues)
- [Comments](#Comments)

### Users

| Name     | Type   | Required | Unique | Notes |
| -------- | ------ | -------- | ------ | ----- |
| id       | integer| yes      | yes    | User's id |
| username | string | yes      | yes    | User's username |
| password | string | yes     | no     | User's hashed password |
| name     | string | yes      | no     | User's name |
| email    | string | yes      | yes    | User's email |
| admin_id | integer| no       | yes    | If admin, give admin id |
| board_id | integer| no       | yes    | If board, give board id |

### Admins

| Name      | Type    | Required | Unique | Notes |
| --------- | ------  | -------- | ------ | ----- |
| id        | integer | yes      | yes    | Admin's id |
| user_id   | integer | yes      | yes    | User's id - connects to user's table |
| school_id | integer | yes      | yes    | School's id - connects to school's table |

### Boards

| Name      | Type    | Required | Unique | Notes |
| --------- | ------  | -------- | ------ | ----- |
| id        | integer | yes      | yes    | Board's id |
| user_id   | integer | yes      | yes    | User's id - connects to user's table |

### Schools

| Name        | Type    | Required | Unique | Notes |
| ----------- | ------  | -------- | ------ | ----- |
| id          | integer | yes      | yes    | School's id |
| school_name | integer | yes      | no     | User's id |
| location    | string  | no       | yes    | School's id |

### Issues

| Name              | Type    | Required | Unique | Notes |
| ----------------- | ------  | -------- | ------ | ----- |
| id                | integer | yes      | yes    | Issue's id |
| comment_id        | integer | yes      | yes    | comment's id |
| issue_title       | string  | yes      | no     | School issue title |
| issue_description | string  | yes      | no     | School issue descrption |
| issue_date        | date    | yes      | no     | date issue created |
| school_id         | integer | yes      | no     | School where issue is occuring |
| status            | string  | yes      | no     | Status of issue |

### Comments

| Name        | Type    | Required | Unique | Notes |
| ----------- | ------  | -------- | ------ | ----- |
| id          | integer | yes      | yes    | School's id |
| board_id    | integer | yes      | no     | board member that is making comment to issue |
| issue_id    | integer | yes      | yes    | issue board member is making comment on |
| comment     | string  | yes      | no     | comment by board member |

## API Endpoints
Endpoints Content:
- [Login](#Login)
- [Registration](#Registration)
- [Admin](#Admin)
- [Board](#Board)
- [School](#School)
- [Issue](#Issue)
- [Comment](#Comment)

### Login

Expects an object with this format as the request body:
```
{
  "username": "User1",   //string
  "password": "password" //string
}
```
If the username doesn't exist in the [`users`](#users) table or the password doesn't match, it will reject the request with a `401` HTTP status.

If successful, it will return a `201` HTTP status and will return a token:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTU4Mjk1NDg4LCJleHAiOjE1NTgzMDI2ODh9.Lwz-Wfyzto2JJOSJjRqalbonNSwhXSLmNyxMWH-aVRc"
}
```

### Registration

Expects an object with this format as the request body:

```
  --header "Content-Type: application/json"
  --data: 
{
	"first_name": "test3", //string
	"last_name": "test3", //string
	"email": "test3@test.com", //string
	"username": "test3", //string
	"password": "test3", //string
	"isBoardMember": True // boolean (will create board_id, if false will create admin_id)
}
```

- When setting isBoardMember to true, a board_id will be created, and if isBoardMember is false, a admin_id will be created.

If any of the required fields are missing, it will reject the request with a `400` HTTP status.

If successful, it will return with a `201` HTTP status.

### Admin
- Get list of all admins (regardless of school) and returns an array of admins with get request:
```
https://internationalrsr.herokuapp.com/admins

Returns an array of Admins:

[
  {
    "id": 1,
    "user_id": 3,
    "school_id": 2
  },
  {
    "id": 2,
    "user_id": 4,
    "school_id": null
  },
  {
    "id": 3,
    "user_id": 5,
    "school_id": null
  }
]
```

- Get info of admin by id with get request:
```
https://internationalrsr.herokuapp.com/admins/:id

Returns:

{
  "first_name": "test2",
  "last_name": "test2",
  "email": "test2@test.com",
  "username": "test2",
  "id": 1,
  "school_id": 2
}
```
- Edit admin school with put request (update school_id):
```
https://internationalrsr.herokuapp.com/admins/:id

Expects:

{
  "school_id": 2
}
```
This will update the school id of the user. Can change it from null (unassigned school at register) to a school that already exists. If school does not exist, then look at [School](#School) to create a new school.


### Board
- Get list of all board members with get request:
```
https://internationalrsr.herokuapp.com/boards
```
Returns an array of board member users:
```
[
  {
    "id": 1,
    "user_id": 1
  },
  {
    "id": 2,
    "user_id": 2
  }
]
```

- Get Board Member information with get request to specific board member id:
```
https://internationalrsr.herokuapp.com/boards/:id
```
Expect on return:
```
{
  "first_name": "test",
  "last_name": "test",
  "email": "test@test.com",
  "username": "test",
  "id": 1
}
```

### School
- Get list of schools with get:
```
https://internationalrsr.herokuapp.com/schools
```
Returns:
```
[
  {
    "id": 1,
    "school_name": "Test School",
    "location": "Test Location"
  },
  {
    "id": 2,
    "school_name": "Test School1",
    "location": "Test Location1"
  }
]
```

- Get a school with get:
```
https://internationalrsr.herokuapp.com/schools/:schoolid
```
where schoolid is the id of the school.
Returns:
```
{
  "id": 1,
  "school_name": "Test School",
  "location": "Test Location Test"
}
```
- Add a school with post:
```
https://internationalrsr.herokuapp.com/schools
```
Expects:
```
{
	"school_name": "school name",
	"location": "location"
}
```
This allows user to create a new school if it is not already listed.

- Edit a school with get:
```
https://internationalrsr.herokuapp.com/schools/:schoolid
```
Edit the specific school with schoolid.
Expects:
```
{
  "school_name": "Edited School Name",
  "location": "Edited Location"
}
```

- Delete a School:
```
https://internationalrsr.herokuapp.com/schools/:schoolid
```
Delete the specific school with schoolid (you will want to do this if the school no longer exists).

- Get School Staff with get request:
```
https://internationalrsr.herokuapp.com/schoolstaff/schoolid
```
Returns an array of staff members (admins) at the school:
```
[
  {
    "id": 1,
    "user_id": 3,
    "school_id": 2
  }
]
```

### Issue

### Comment
