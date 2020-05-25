create table users (
id SERIAL primary key,
username VARCHAR(50) unique not null
);

create table temperatures (
id SERIAL primary key,
user_id SERIAL not null references users(id),
temperature INTEGER not null,
time TIMESTAMPTZ default NOW()
);