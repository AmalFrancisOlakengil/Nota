/* SQL schema for folders and notes tables */

CREATE TABLE IF NOT EXISTS folders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    folder_id INTEGER NOT NULL,

    status TEXT CHECK(status IN ('active', 'done', 'archived')) DEFAULT 'active',
    title TEXT NOT NULL,
    body TEXT,

    created_at TEXT NOT NULL,
    due_at TEXT,
    updated_at TEXT,

    notify INTEGER DEFAULT 0,

    FOREIGN KEY (folder_id)
        REFERENCES folders(id)
        ON DELETE CASCADE
);

