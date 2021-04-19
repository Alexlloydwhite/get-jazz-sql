CREATE TABLE "artists" (
    "id" SERIAL PRIMARY KEY,
    "artist_name" varchar(80) not null,
    "year_born" date
);

CREATE TABLE "songs" (
	"id" SERIAL PRIMARY KEY,
	"title" varchar(80) not null,
	"length" varchar(80) not null,
	"released" date
);

INSERT INTO "artists" ("id","artist_name","year_born") 
VALUES (1, 'Ella Fitzgerald', '04-25-1917'),
	(2, 'Dave Brubeck', '12-06-1920'), 
	(3, 'Miles Davis', '05-26-1926'),
	(4, 'Esperanza Spalding', '10-18-1984');
	
INSERT INTO "songs" ("id","title","length","released")
VALUES (1, 'Take Five', '5:24', '1959-09-29'),
	(2, 'So What', '9:22', '1959-08-17'),
	(3, 'Black Gold', '5:17', '2012-02-01');