export const createUserQuery =
    `CREATE TABLE IF NOT EXISTS users (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            firstname VARCHAR(150) NOT NULL,
            lastname VARCHAR(150) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            city VARCHAR(50) NOT NULL,
            phone VARCHAR(20),
            introduction_text TEXT
    );`

export const createSocialMediaQuery =
    `CREATE TABLE IF NOT EXISTS social_media (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            user_id int,
            instagram_url VARCHAR(255),
            linkedin_url VARCHAR(255),
            portfolio_url VARCHAR(255),
            CONSTRAINT fk_user
                FOREIGN KEY (user_id)
                REFERENCES users(id)
                ON DELETE CASCADE
    );`

export const createImagesQuery =
    `CREATE TABLE IF NOT EXISTS image (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            image_url TEXT NOT NULL,
            upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_favorite boolean,
            CONSTRAINT fk_user 
                FOREIGN KEY (user_id) 
                REFERENCES users(id) 
                ON DELETE CASCADE
    );`

export const createCategoryQuery =
    `CREATE TABLE IF NOT EXISTS category (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL
    );`

export const createUserCategoryQuery =
    `CREATE TABLE IF NOT EXISTS user_category (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            category_id INT,
            user_id INT,
            CONSTRAINT fk_user 
                FOREIGN KEY (user_id) 
                REFERENCES users(id) 
                ON DELETE CASCADE,
            CONSTRAINT fk_category
                FOREIGN KEY (category_id)
                REFERENCES category(id)
                ON DELETE CASCADE
);`
