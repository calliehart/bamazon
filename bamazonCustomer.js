const mysql = require("mysql");
const inquirer = require("inquirer");
const columnify = require("columnify");
const chalk = require("chalk");


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "C@lm2011",
    database: "bamazon_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
  });

  function start() { 
    console.log(chalk.greenBright(`\n-----------------------------\n`));
    console.log(chalk.green.bold("         Bamazon!"));
    console.log(chalk.greenBright(`\n-----------------------------\n`));

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(columnify(res, {columnSplitter: '  |  '}));
        });
        
        setTimeout(inquirerLoad, 1000);
  };

    function inquirerLoad() {
        console.log(`\n`);
        inquirer.prompt([
            {
                name: "selectedItem",
                message: "To purchase, enter ITEM ID: "
            },{
                name: "quantityWanted",
                message: "Enter desired QUANTITY: "
            }
    
        ]).then(function(answers){
            let selectedItem = answers.selectedItem;
            let quantityWanted = answers.quantityWanted;

            connection.query("SELECT * FROM products WHERE ?", { item_id: selectedItem}, function(err, res) {
                if (err) throw err;
            
                //console.log(res[0].stock_quantity);

                if (quantityWanted > res[0].stock_quantity) {
                    console.log(chalk.red("Insufficient quantity!"));
                    console.log("We are sorry, but we are unable to place your order. Please try again for " + chalk.red.underline(res[0].stock_quantity) + " or fewer.");
                    setTimeout(start, 2500);

                }else {
                    console.log(chalk.blueBright(`\n_____________________________________\n`));
                    console.log(chalk.blue("....placing order...."));
                    console.log(chalk.blueBright(`_____________________________________\n`));

                    let newQuantity = res[0].stock_quantity - quantityWanted;
                    let totalCost = res[0].price * quantityWanted;

                    updateProduct(newQuantity, selectedItem, totalCost);
                    
                };
            });

        });
     };

     function updateProduct(newQuantity, selectedItem, totalCost) {
        let query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQuantity
              },
              {
                item_id: selectedItem
              }
            ],
            function(err, res) {
                //console.log(res);
                //console.log(res[0].affectedRows + " products updated!\n");
                console.log("Order confirmed.");
                console.log("Your total is: $" + totalCost);
                setTimeout(start, 2500);
            }
          );
          //console.log(query.sql);
     };
