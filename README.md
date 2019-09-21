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
| password | string | yes      | no     | User's hashed password |
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
- In progress