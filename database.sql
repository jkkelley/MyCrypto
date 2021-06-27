
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO "user" ("username", "password")
	VALUES 
		('a', '123'),
		('b', '123'),
		('c', '123'),
		('d', '123'),
		('e', '123'),
		('f', '123'),
		('g', '123'),
		('h', '123')
;
		


CREATE TABLE "user_profile" (
	"id" serial NOT NULL,
	"users_first_name" VARCHAR(255) NOT NULL,
	"users_last_name" VARCHAR(255),
	"account_balance" DECIMAL NOT NULL DEFAULT '100000',
	"email" varchar(100) NOT NULL,
	"phone_number" varchar(20),
	"profile_image" varchar(500),
	"users_profile" BOOLEAN DEFAULT 'FALSE',
	"users_id" int NOT NULL,
	"users_nickname" varchar(50),
    "profile_date_created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "user_profile_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE user_profile ALTER COLUMN profile_image DROP not null;
ALTER TABLE user_profile ALTER COLUMN phone_number DROP not null;

INSERT INTO "user_profile" (
	"users_first_name",
	"users_last_name",
	"email",
	"users_id",
	"users_nickname"
	)
	VALUES 
		('jam', 'kel', 'jkk@gmail.com', 1, 'jammin'),
		('tom', 'kel', 'tek@gmail.com', 2, 'Slammin'),
		('skip', 'now', 'skippin@gmail.com', 3, 'Shaggy'),
		('Jon', 'Cage', 'jc91@gmail.com', 4, 'Johnny5'),
		('Slim', 'Jim', 'isThatYourRealName@gmail.com', 5, 'Sure Is'),
		('Boots', 'Townin', 'need.these.boots@gmail.com', 6, 'Cowboy'),
		('l337', 'H@x0r', 'cantguessmypassword@gmail.com', 7, 'Dark Night'),
		('Steve', 'Johnson', 's.j.wannaMaker@gmail.com', 8, 'Coolie-O');
	

CREATE TABLE "coin_page" (
	"id" serial NOT NULL,
	"crypto_name" varchar(255) NOT NULL,
	"amount_owned" DECIMAL NOT NULL,
	"date_purchased" DATE,
	"price_purchased_at" DECIMAL NOT NULL,
	"favorited" BOOLEAN DEFAULT 'false',
	"user_profile_id" int NOT NULL,
	CONSTRAINT "coin_page_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE coin_page ALTER COLUMN favorited DROP not null;

INSERT INTO coin_page (
	"crypto_name",
	"amount_owned",
	"price_purchased_at",
	"user_profile_id",
	"date_purchased"
	)
	VALUES 
		('BITCOIN', 1.38, 33578.69, 1, '3/25/2019'),
		('BITCOIN', 5.78, 9401.11, 2, '11/26/2017'),
		('BITCOIN', .27457945, 9581.52, 3, '2/20/2020'),
		('BITCOIN', 2.5664, 9401.11, 4, '11/26/2017'),
		('BITCOIN', 3.14, 4857.10, 5, '3/12/2020'),
		('BITCOIN', .0001, 64899.00, 6, '8/13/2020'),
		('BITCOIN', 5.14, 7688.47, 7, '2/06/2018'),
		('BITCOIN', 80, 102.80, 8, '8/9/2013');
	

CREATE TABLE "user_to_crypto" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"crypto_id" int NOT NULL,
	CONSTRAINT "user_to_crypto_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO user_to_crypto (
	user_id,
	crypto_id
	)
	VALUES 
		(1, 1),
		(2, 2),
		(3, 3),
		(4, 4),
		(5, 5),
		(6, 6),
		(7, 7),
		(8, 8);


CREATE TABLE "notes" (
	"id" serial NOT NULL,
	"notes" varchar(500) NOT NULL,
	"date_entered" DATE NOT NULL DEFAULT 'NOW',
	"coin_page_id" int NOT NULL,
	CONSTRAINT "notes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


INSERT INTO notes ("notes", "coin_page_id")
	VALUES 
		('It was a lovely day.', 1),
		('Can''t wait for this to hit the moon.', 2),
		('Is it time to hit the casino?', 3),
		('Seems like a reasonable coin.', 4),
		('I think I bought at the wrong time.', 5),
		('We''re ballin''.', 6),
		('I don''t even know what I''m doing here.', 7),
		('I hope I''m rich one day!', 8);
	
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_fk0" FOREIGN KEY ("users_id") REFERENCES "user"("id");

ALTER TABLE "coin_page" ADD CONSTRAINT "coin_page_fk0" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id");

ALTER TABLE "user_to_crypto" ADD CONSTRAINT "user_to_crypto_fk0" FOREIGN KEY ("user_id") REFERENCES "user_profile"("id");
ALTER TABLE "user_to_crypto" ADD CONSTRAINT "user_to_crypto_fk1" FOREIGN KEY ("crypto_id") REFERENCES "coin_page"("id");

ALTER TABLE "notes" ADD CONSTRAINT "notes_fk0" FOREIGN KEY ("coin_page_id") REFERENCES "coin_page"("id");

