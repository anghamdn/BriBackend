CREATE DATABASE bricolup;
USE bricolup;
CREATE TABLE clients(
    id INT NOT NULL AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    nomUtilisateur VARCHAR(100) NOT NULL UNIQUE,
    telephone VARCHAR(100) NOT NULL,
    passe VARCHAR(100) NOT null,
    etat VARCHAR(20) NOT null,
    PRIMARY KEY(id)

)ENGINE = InnoDB;