# Not another to do app

## Roadmap

v2.0.0 - Implement .NET backend with postgres db

v3.0.0 - Create desktop app with Tauri

## Front end

TBA

## Back end

auth controller

person controller

- GET - api/v1/person/id
- POST - api/v1/person
- DELETE - api/v1/person/id
- PATCH - api/v1/person/id

todo controller

- GET - api/v1/todo
- POST - api/v1/todo
- DELETE - api/v1/todo/id
- PATCH - api/v1/todo/id

group controller

- GET - api/v1/group
- POST - api/v1/group
- DELETE - api/v1/group/id
- DELETE - api/v1/group/id/todo
- PATCH - api/v1/group/id

## Database

person

- id
- email
- password (hashed)
- name
- radius
- theme
- color

todo table

- id
- group_id
- person_id
- title
- completed
- date_created
- date_updated
- active

group table

- id
- person_id
- title
- date_created
- date_updated
- active

## Testing

### e2e tests

These were all bugs at some point but now need to be either Integration tests or e2e tests.

- [ ] Deleting groups should put you back onto my day
- [ ] Close dialog when group is added
- [ ] Close panel when group selected
- [ ] Deleting completed to dos doesn't reset the group completed state in the side bar
- [ ] On new load My day group appears twice
- [ ] To dos aren't saved...
- [ ] Delete todos when deleting group
- [ ] Swapping groups should swap to dos
- [ ] Should be clear which group is active
- [ ] Groups aren't saving
- [ ] To dos aren't rounded
- [ ] Creating group should close panel and set active group
- [ ] Rename group doesn't work
- [ ] Delete group doesn't save
- [ ] Renaming and deleting group should close the dialog
- [ ] Swapping groups should clear the input
- [ ] Can create empty to do
