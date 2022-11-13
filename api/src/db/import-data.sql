INSERT INTO public.role ("type") 
VALUES 
    ('admin'),
    ('author');

INSERT INTO public.permission ("type") 
VALUES 
    ('ADD_USERS'),
    ('REMOVE_USERS'),
    ('DEACTIVATE_USERS'),
    ('EDIT_USERS'),
    ('ADD_BOOKS'),
    ('EDIT_BOOKS'),
    ('REMOVE_BOOKS');

INSERT INTO public.role_permission ("roleId", "permissionId") 
VALUES 
    (1,1),
    (1,2),
    (1,3),
    (1,4),
    (1,5),
    (1,6),
    (1,7);

INSERT INTO public.user ("roleId", "email", "password", "first_name", "last_name") 
VALUES 
    (1,'admin1@email.com', '$2b$10$CBdaHcZcJcoBcNdO8GUUAuMEGt7HA0e3gGj4nJjH/zjyO.yI3epS2', 'Admin1', 'Admin1'),
    (1,'admin2@email.com', '$2b$10$CBdaHcZcJcoBcNdO8GUUAuMEGt7HA0e3gGj4nJjH/zjyO.yI3epS2', 'Admin2', 'Admin2'),
    (2,'author1@email.com', '$2b$10$CBdaHcZcJcoBcNdO8GUUAuMEGt7HA0e3gGj4nJjH/zjyO.yI3epS2', 'Author1', 'Author1'),
    (2,'author2@email.com', '$2b$10$CBdaHcZcJcoBcNdO8GUUAuMEGt7HA0e3gGj4nJjH/zjyO.yI3epS2', 'Author2', 'Author2');