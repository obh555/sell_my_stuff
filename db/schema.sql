CREATE TABLE customer (
    id serial PRIMARY KEY,
    username text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    mobile text NOT NULL,
    created_at timestamp DEFAULT now(),
    modified_at timestamp
);

CREATE TABLE customer_address (
    id serial PRIMARY KEY,
    customer_id int references customer(id),
    address_line1 text NOT NULL,
    address_line2 text,
    city text NOT NULL,
    postal_code text NOT NULL,
    country text NOT NULL
);

CREATE TABLE product (
    id serial PRIMARY KEY,
    name text NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    category_id int references product_category(id),
    quantity int NOT NULL,
    price int NOT NULL,
    created_at timestamp DEFAULT now(),
    modified_at timestamp,
    deleted_at timestamp
);

CREATE TABLE product_category (
    id serial PRIMARY KEY,
    name text NOT NULL,
    created_at timestamp DEFAULT now(),
    modified_at timestamp,
    deleted_at timestamp
);

CREATE TABLE cart_item (
    id serial PRIMARY KEY,
    customer_id int references customer(id),
    content TEXT NOT NULL,
    created_at timestamp DEFAULT now(),
    modified_at timestamp
);

CREATE TABLE order_details (
    id serial PRIMARY KEY,
    customer_id int references customer(id),
    content TEXT NOT NULL,
    shipped Boolean,
    tracking_number TEXT,
    created_at timestamp DEFAULT now(),
    modified_at timestamp
);