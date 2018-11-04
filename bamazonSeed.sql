DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(18, 2),
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Post-it Flags Electric Glow", "Office Supplies", 3.29, 30),
("Ergonomic Mouse Pad", "Office Supplies", 9.77, 10),
("2019 Planner - Academic Weekly", "School Supplies", 14.99, 18),
("Tombow Dual Brush Pen Art Markers", "Art Supplies", 11.98, 20),
("Papermate Inkjoy Gel Pens", "Office Supplies", 14.99, 5),
("Leuchtturm Dotted Notebook", "Office Supplies", 19.95, 30),
("20 PCS Journal Stencil Planner Set", "Craft Supplies", 6.98, 50),
("40 Rolls Washi Tape Set", "Art Supplies", 10.99, 80),
("Life Planner Stickers Set", "Craft Supplies", 12.95, 10),
("BamazonBasics Multipurpose Scissors - 3 pack", "Office Supplies", 6.49, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Craft Organizer", "Craft Supplies", 6.78, 43);


SELECT * FROM products;


