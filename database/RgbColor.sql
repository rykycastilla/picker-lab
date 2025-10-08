CREATE TABLE IF NOT EXISTS RgbColor (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    red INT NOT NULL,
    green INT NOT NULL,
    blue INT NOT NULL,
    palette TEXT NOT NULL
)