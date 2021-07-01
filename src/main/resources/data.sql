-- -- DROP TABLE IF EXISTS BRAND;
-- DROP TABLE IF EXISTS PRODUCT_LIST;
-- DROP TABLE IF EXISTS BRAND;

-- CREATE TABLE BRAND (
-- 	BRAND_ID INT NOT NULL AUTO_INCREMENT, 
-- 	BRAND_CATEGORY VARCHAR(255) ,
-- 	BRAND_NAME VARCHAR(255) NOT NULL,
-- 	BRAND_COMPANY VARCHAR(255) ,
-- 	BRAND_DESCRIPTION TEXT,
-- 	PRIMARY KEY (BRAND_ID)
-- );


-- CREATE TABLE PRODUCT_LIST (
-- 	PRODUCT_ID	INT NOT NULL AUTO_INCREMENT,
-- 	PRODUCT_NAME VARCHAR(255) NOT NULL,
-- 	COLOUR VARCHAR(255) NOT NULL, 
-- 	BARCODE	VARCHAR(25),
-- 	PRIME_COST	NUMERIC(18,2) NOT NULL,
-- 	SALE_PRICE	NUMERIC(18,2) NOT NULL,
-- 	BRAND_ID INT,
-- 	PRODUCT_SIZE VARCHAR(10) NOT NULL,
-- 	PRODUCT_CATEGORY VARCHAR(255) NOT NULL,
-- 	PRODUCT_STYLE VARCHAR(10) NOT NULL, 
-- 	TOTAL_AMOUNT INT NOT NULL DEFAULT 0, 
-- 	PRIMARY KEY (PRODUCT_ID),
-- 	FOREIGN KEY (BRAND_ID) REFERENCES BRAND(BRAND_ID)
-- );

-- INSERT INTO PRODUCT (name,color,barcode,prime_cost,sale_price,brand_id,size,category,style,total_amount) VALUES 
--   ('fashion purse female','red','69345523',100,200,1,'small','high-end','simple',20),
--   ('fashion purse female','yellow','69345524',100,200,1,'small','high-end','simple',20),
--   ('fashion purse female','black','69345525',100,200,1,'small','high-end','simple',20),
--   ('fashion purse female','pink','69345526',100,200,1,'small','high-end','simple',20),
--   ('fashion purse female','brown','69345527',100,200,1,'small','high-end','simple',20);
