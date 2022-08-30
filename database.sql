create TABLE lists(
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

create TABLE tasks(
    id SERIAL,
    done BOOLEAN,
    name VARCHAR,
    description VARCHAR,
    dueDate DATE,
    list_id INTEGER,
    FOREIGN KEY (list_id) REFERENCES lists (id)
);

 