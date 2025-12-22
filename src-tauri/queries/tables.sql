/* Folders Table */
CREATE TABLE IF NOT EXISTS folders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_at TEXT DEFAULT (datetime('now'))
);

/* Notes Table */
CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    folder_id INTEGER NULL,   -- NULL = uncategorized (shows in All Notes)

    status TEXT CHECK(status IN ('pending', 'done', 'incomplete'))
           DEFAULT 'pending',

    title TEXT NOT NULL,
    body TEXT,

    difficulty INTEGER DEFAULT 1,   -- 1 (easy) → 5 (hard)
    priority_score REAL DEFAULT 0,  -- computed

    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT,
    due_at TEXT,

    notify INTEGER DEFAULT 0,       -- reminder on/off
    notify_at TEXT,                 -- reminder time

    FOREIGN KEY (folder_id)
        REFERENCES folders(id)
        ON DELETE SET NULL
);

/* Settings Table */
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

/* Completion History Table */
CREATE TABLE IF NOT EXISTS completion_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    note_id INTEGER NOT NULL,
    completed_at TEXT NOT NULL,
    was_late INTEGER DEFAULT 0,
    FOREIGN KEY (note_id) REFERENCES notes(id)
);

/* Note Dependencies Table */
CREATE TABLE IF NOT EXISTS note_dependencies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    note_id INTEGER NOT NULL,
    depends_on_note_id INTEGER NOT NULL,

    FOREIGN KEY (note_id) REFERENCES notes(id),
    FOREIGN KEY (depends_on_note_id) REFERENCES notes(id),

    UNIQUE(note_id, depends_on_note_id)
);

/* Full-Text Search Virtual Table for Notes */
CREATE VIRTUAL TABLE IF NOT EXISTS notes_fts
USING fts5(title, body, content='notes', content_rowid='id');

/* Triggers to keep notes_fts in sync with notes table */
CREATE TRIGGER IF NOT EXISTS notes_ai
AFTER INSERT ON notes BEGIN
  INSERT INTO notes_fts(rowid, title, body)
  VALUES (new.id, new.title, new.body);
END;

CREATE TRIGGER IF NOT EXISTS notes_au
AFTER UPDATE ON notes BEGIN
  UPDATE notes_fts
  SET title = new.title, body = new.body
  WHERE rowid = new.id;
END;

CREATE TRIGGER IF NOT EXISTS notes_ad
AFTER DELETE ON notes BEGIN
  DELETE FROM notes_fts WHERE rowid = old.id;
END;

