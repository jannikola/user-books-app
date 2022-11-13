# user-books-app

### Steps

- Clone repo
- Run:

```sh
docker-compose up --build
```

### Note - run docker compose with --build flag only first time

### PgAdmin

Web based PgAdmin is on `localhost:8082` :

```sh
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
```

### Docs

Swagger docs is on `http://localhost:8080/api/v1/docs/`

### Note
    - database booksdb should be created manually
    - migrations will be executed automatically
    - after migrations are done db should be populated with initial data automatically (users, roles, permissions)
    - Initial Users:
        - u: admin1@email.com p: Password123 
        - u: admin2@email.com p: Password123 
        - u: author1@email.com p: Password123 
        - u: author2@email.com p: Password123 
