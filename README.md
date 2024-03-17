# weather-app-nextjs

#database model
CREATE TABLE users (
id BIGSERIAL PRIMARY KEY NOT NULL,
first_name VARCHAR(200) NOT NULL,
last_name VARCHAR(200) NOT NULL,
email VARCHAR(250) NOT NULL,
username VARCHAR(200) NOT NULL,
password VARCHAR(200) NOT NULL,
is_blocked BOOLEAN NOT NULL DEFAULT false,
login_attempts INTEGER DEFAULT 0,
img_name VARCHAR(200),
img_url VARCHAR(2000)
);
