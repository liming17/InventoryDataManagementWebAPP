DROP TABLE IF EXISTS PRODUCT;

CREATE TABLE PRODUCT(
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(250) NOT NULL,
 color VARCHAR(250) NOT NULL,
 barcode VARCHAR(250) NOT NULL,
 prime_cost INT NOT NULL,
 sale_price INT NOT NULL,
 brand_id INT NOT NULL,
 size VARCHAR(250) NOT NULL,
 category VARCHAR(250) NOT NULL,
 style VARCHAR(250) NOT NULL,
 total_amount INT NOT NULL
);

-- INSERT INTO PRODUCT (name,color,barcode,prime_cost,sale_price,brand_id,size,category,style,total_amount) VALUES 
--   ('fashion purse female','red','69345523',100,200,1,'small','high-end','simple',20),
--   ('fashion purse female','yellow','69345524',100,200,1,'small','high-end','simple',20),
--   ('fashion purse female','black','69345525',100,200,1,'small','high-end','simple',20),
--   ('fashion purse female','pink','69345526',100,200,1,'small','high-end','simple',20),
--   ('fashion purse female','brown','69345527',100,200,1,'small','high-end','simple',20);
