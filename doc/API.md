# API

## 1. Discuss:

### 1.1 GET  Discuss/

Response sample:

```json

[
  {
        "_id": "634e34f762e1076ddadfb1c3",
        "title": "1post",
        "message": "postman",
        "creator": "Tom",
        "tags": [
            "google",
            "meta"
        ],
        "selectedFile": "0",
        "likeCount": 0,
        "createdAt": "2022-10-18T05:01:11.066Z",
        "__v": 0
    },
    {
        "_id": "634e351b1863ba9426420a2f",
        "title": "1post",
        "message": "postman",
        "creator": "Tom",
        "tags": [
            "google",
            "meta"
        ],
        "selectedFile": "0",
        "likeCount": 0,
        "createdAt": "2022-10-18T05:09:43.243Z",
        "__v": 0
    }
]
```



### 1.2 POST /discuss/create

Request sample:

```json
body: {
  "title":	 "1post",
  "message": "postman",
  "creator": "Tom",
  "tags": ["google", "meta"]
} 
```

Response sample:

```json
{
    "title": "1post",
    "message": "postman",
    "creator": "Tom",
    "tags": [
        "google",
        "meta"
    ],
    "selectedFile": "0",
    "likeCount": 0,
    "createdAt": "2022-10-18T06:10:23.159Z",
    "_id": "634e436ca113f2c5595d98ab",
    "__v": 0
}
```

### 1.3 GET /discuss/post/:id

Response sample:

```json
{
    "_id": "634e3971a54b12ace6894101",
    "title": "1post",
    "message": "postman",
    "creator": "Tom",
    "tags": [
        "google",
        "meta"
    ],
    "selectedFile": "0",
    "likeCount": 0,
    "createdAt": "2022-10-18T05:28:10.120Z",
    "__v": 0
}
```

### 1.4 PATCH /discuss/like/:id

Responce sample:

```json
{
    "_id": "634e3971a54b12ace6894101",
    "title": "1post",
    "message": "postman",
    "creator": "Tom",
    "tags": [
        "google",
        "meta"
    ],
    "selectedFile": "0",
    "likeCount": 2,
    "createdAt": "2022-10-18T05:28:10.120Z",
    "__v": 0
}
```

Error:

404: No post with id

### 1.5 DELETE /discuss/post/:id

respose:

```json
{
    "message": "Post deleted successfully."
}
```

### 1.6 PATCH discuss/update/:id

Request:

```json
{
    "title": "1post",
    "message": "postman",
    "creator": "Tom",
    "tags": ["google", "meta", "update"]
}
```

Response:

```json
{
    "creator": "Tom",
    "title": "1post",
    "message": "postman",
    "tags": [
        "google",
        "meta",
        "update"
    ],
    "_id": "635058bf8dc3b7af48409eed"
}
```



## 2 group

### 2.1 POST /group/create/ 

create group

Request:

```json
body:
{
    "groupName": "jobstation3",
    "owner": "1010011",
    "member": ["1010011", "00002", "00003"],
    "tags": ["google", "meta", "oose"]
}
```

Response:

```json
{
    "groupName": "jobstation3",
    "owner": "1010011",
    "member": [
        "1010011",
        "00002",
        "00003"
    ],
    "tags": [
        "google",
        "meta",
        "oose"
    ],
    "createdAt": "2022-10-19T02:30:20.982Z",
    "_id": "634f631b96e47c4fe8e87ae3",
    "__v": 0
}
```



### 2.2 GET /group/:id

Request sample:

`localhost:5001/group/634f51868707301d863e1584`

### 2.2 PATCH /group/:groupId/user/:userId

Request sample:

`localhost:5001/group/634f51868707301d863e1584/user/1111111111112`

