CREATE TABLE location
(
    id   BIGSERIAL PRIMARY KEY,
    x    BIGINT NOT NULL,
    y    FLOAT  NOT NULL,
    z    FLOAT  NOT NULL,
    name TEXT   NOT NULL
);

CREATE TABLE coordinates
(
    id BIGSERIAL PRIMARY KEY,
    x  BIGINT           NOT NULL,
    y  DOUBLE PRECISION NOT NULL
);

CREATE TABLE person
(
    id             SERIAL PRIMARY KEY,
    name           TEXT                                                 NOT NULL,
    coordinates_id BIGINT REFERENCES coordinates (id) ON DELETE CASCADE NOT NULL,
    creation_date  TIMESTAMP                                            NOT NULL,
    height         INT                                                  NOT NULL,
    birthday       TIMESTAMP                                            NOT NULL,
    eye_color      VARCHAR(15)                                          NOT NULL,
    hair_color     VARCHAR(15),
    location_id    BIGINT REFERENCES location (id) ON DELETE CASCADE    NOT NULL
);