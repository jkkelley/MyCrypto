
 CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_profile" (
	"id" serial NOT NULL,
	"users_first_name" serial(255) NOT NULL,
	"users_last_name" serial(255),
	"account_balance" DECIMAL NOT NULL DEFAULT '100000',
	"email" varchar(100) NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"profile_image" varchar(500) NOT NULL,
	"users_profile" BOOLEAN NOT NULL DEFAULT 'FALSE',
	"users_id" int NOT NULL,
	"users_nickname" varchar(50) NOT NULL,
	"profile_date_created" timestamp with time zone NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	CONSTRAINT "user_profile_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "coin_page" (
	"id" serial NOT NULL,
	"crypto_name" varchar(255) NOT NULL,
	"amount_owned" DECIMAL NOT NULL,
	"date_purchased" DATE,
	"price_purchased_at" DECIMAL NOT NULL,
	"favorited" BOOLEAN NOT NULL DEFAULT 'false',
	"user_profile_id" int NOT NULL,
	CONSTRAINT "coin_page_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_to_crypto" (
	"id" serial NOT NULL,
	"user_profile_id" int NOT NULL,
	"coin_page_id" int NOT NULL,
	CONSTRAINT "user_to_crypto_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "notes" (
	"id" serial NOT NULL,
	"notes" varchar(500) NOT NULL,
	"date_entered" DATE NOT NULL DEFAULT 'NOW',
	"coin_page_id" int NOT NULL,
	CONSTRAINT "notes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_fk0" FOREIGN KEY ("users_id") REFERENCES "user"("id");

ALTER TABLE "coin_page" ADD CONSTRAINT "coin_page_fk0" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id");

ALTER TABLE "user_to_crypto" ADD CONSTRAINT "user_to_crypto_fk0" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id");
ALTER TABLE "user_to_crypto" ADD CONSTRAINT "user_to_crypto_fk1" FOREIGN KEY ("coin_page_id") REFERENCES "coin_page"("id");

ALTER TABLE "notes" ADD CONSTRAINT "notes_fk0" FOREIGN KEY ("coin_page_id") REFERENCES "coin_page"("id");