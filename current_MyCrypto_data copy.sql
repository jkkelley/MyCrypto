CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL
);

CREATE TABLE "user_profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"users_first_name" VARCHAR(255) NOT NULL,
	"users_last_name" VARCHAR(255),
	"account_balance" DECIMAL NOT NULL DEFAULT '100000',
	"email" varchar(100) NOT NULL,
	"phone_number" varchar(20),
	"profile_image" varchar(500),
	"users_profile" BOOLEAN DEFAULT 'FALSE',
	"users_nickname" varchar(50),
    "profile_date_created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "users_id" int not null REFERENCES "user" on delete CASCADE

); 


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
	"id" serial PRIMARY KEY NOT NULL,
	"crypto_name" varchar(255) NOT NULL,
	"amount_owned" DECIMAL NOT NULL,
	"date_purchased" DATE,
	"price_purchased_at" DECIMAL NOT NULL,
	"favorited" BOOLEAN DEFAULT 'false',
	"user_profile_id" int not null REFERENCES "user_profile" on delete CASCADE

);

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
	"id" serial PRIMARY KEY NOT NULL,
    "user_profile_id" int not null REFERENCES "user_profile" on delete CASCADE,
	"coin_page_id" int not null REFERENCES "coin_page" on delete CASCADE
	
);

INSERT INTO user_to_crypto (
	user_profile_id,
	coin_page_id
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
	"id" serial PRIMARY KEY NOT NULL,
	"notes" varchar(500) NOT NULL,
	"date_entered" DATE NOT NULL DEFAULT 'NOW',
	"coin_page_id" int not null REFERENCES "coin_page" on delete CASCADE
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