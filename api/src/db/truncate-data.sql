TRUNCATE TABLE public.user 
RESTART IDENTITY CASCADE;

TRUNCATE TABLE public.role_permission
RESTART IDENTITY;

TRUNCATE TABLE public.permission
RESTART IDENTITY CASCADE;

TRUNCATE TABLE public.role
RESTART IDENTITY CASCADE;