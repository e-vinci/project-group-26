CREATE TABLE syntheses (
    id_synthese INTEGER PRIMARY KEY AUTOINCREMENT,
    titre_synthese TEXT,
    description_synthese TEXT,
    section TEXT,
    annee INTEGER,
    cours TEXT,
    chemin_fichier TEXT,
    mail TEXT,
    nombre_like INTEGER DEFAULT 0,
    nombre_telechargements INTEGER DEFAULT 0
);

CREATE TABLE telechargements (
    id_telechargement INTEGER PRIMARY KEY AUTOINCREMENT,
    id_synthese INTEGER,
    mail TEXT,
    FOREIGN KEY (id_synthese) REFERENCES syntheses(id_synthese),
    UNIQUE(id_synthese, mail)
);

CREATE TABLE likes (
    id_like INTEGER PRIMARY KEY AUTOINCREMENT,
    id_synthese INTEGER,
    mail TEXT,
    FOREIGN KEY (id_synthese) REFERENCES syntheses(id_synthese),
    UNIQUE(id_synthese, mail)
);

