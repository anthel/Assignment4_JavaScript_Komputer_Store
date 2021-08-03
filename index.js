var currentBankBalance = 0;
var isLoanAvailable = true;
var currentDebt = 0;

const app = () => {

    renderBanner();

    const root = document.getElementById("root");
    const container = document.createElement("div");
    container.setAttribute("class", "container");
    root.appendChild(container);

    renderBankComponent();

    renderWorkComponent();

    renderProductListComponent();
}

const renderBanner = () => {
    const root = document.getElementById("root");

    const banner = document.createElement("div");
    banner.setAttribute("class", "banner")
    
    const bannerText = document.createTextNode("Komputer Store");

    root.appendChild(banner);
    banner.appendChild(bannerText);
}
const renderBankComponent = () => {
    
    const container = document.getElementsByClassName("container")[0];

    const bankContainer = document.createElement("div");
    bankContainer.setAttribute("class", "bankContainer");
    container.appendChild(bankContainer);

    const bank = document.createElement("div");
    bank.setAttribute("class", "bank");
    bankContainer.appendChild(bank);

    const bankTitle = document.createElement("h2");
    bank.appendChild(bankTitle);
    const bankTitleText = document.createTextNode("Joe Banker");
    bankTitle.appendChild(bankTitleText);

    const bankBalance = document.createElement("p");
    bank.appendChild(bankBalance);
    const bankBalanceText = document.createTextNode("Balance");
    bankBalance.appendChild(bankBalanceText);

    const currency = document.createElement("a");
    currency.setAttribute("class", "currentBalance");
    currency.textContent = " kr";
    bankBalance.appendChild(currency);

    const currentBalance = document.createElement("a");
    currentBalance.setAttribute("class", "currentBalance");
    currentBalance.setAttribute("id", "currentBankValue");
    currentBalance.textContent = currentBankBalance;
    bankBalance.appendChild(currentBalance);

    const loanBalance = document.createElement("p");
    bank.appendChild(loanBalance);

    const loanBalanceText = document.createTextNode("");
    loanBalance.appendChild(loanBalanceText);

    const currentLoanBalance = document.createElement("a");
    currentLoanBalance.setAttribute("class", "currentBalance");
    currentLoanBalance.setAttribute("id", "loanBalance");

    const loanCurrency = document.createElement("a");
    loanCurrency.setAttribute("class", "currentBalance");
    
    const loanButton = document.createElement("button");
    loanButton.setAttribute("class", "loanButton");
    loanButton.textContent = "Get loan";
    
    loanButton.addEventListener("click", () => {
        if(isLoanAvailable) {
            const limit = currentBankBalance * 2;
            const loanAmount = prompt("How much would you like to loan today? Maximum is: " + limit + " kr");
            if(loanAmount <= limit) {
                currentBankBalance += parseInt(loanAmount);
                currentDebt = parseInt(loanAmount);
                currentBalance.textContent = currentBankBalance;
                loanBalance.textContent = "Current debt " ;
                loanCurrency.textContent = " kr";
                loanBalance.appendChild(loanCurrency);
                currentLoanBalance.textContent = currentDebt;
                loanBalance.appendChild(currentLoanBalance);
                
                isLoanAvailable = false;
            }
        }
        else {
            alert('You have outstanding loan debt, pay it off first!"');
        }
    })
    bank.appendChild(loanButton);
}

const renderWorkComponent = () => {
    const container = document.getElementsByClassName("container")[0];

    const workContainer = document.createElement("div");
    workContainer.setAttribute("class", "workContainer");
    container.appendChild(workContainer);

    const work = document.createElement("div");
    work.setAttribute("class", "work");
    workContainer.appendChild(work);

    const workTitle = document.createElement("h2");
    work.appendChild(workTitle);
    const workTitleText = document.createTextNode("Work");
    workTitle.appendChild(workTitleText);

    const payBalance = document.createElement("p");
    work.appendChild(payBalance);
    const payBalanceText = document.createTextNode("Pay");
    payBalance.appendChild(payBalanceText);
    const currentPayBalance = document.createElement("a");
    currentPayBalance.setAttribute("class", "currentBalance");
    currentPayBalance.textContent = 0;

    const currency = document.createElement("a");
    currency.setAttribute("class", "currentBalance");
    currency.textContent = " kr";
    payBalance.appendChild(currency);
    payBalance.appendChild(currentPayBalance);
    
    const depositButton = document.createElement("button");
    depositButton.setAttribute("class", "depositButton");
    depositButton.textContent = "Bank";

    depositButton.addEventListener("click", () => {

        const balance = document.getElementById("currentBankValue");
        if(isLoanAvailable) {
            currentBankBalance += parseInt(currentPayBalance.textContent);
            balance.textContent = parseInt(balance.textContent) + parseInt(currentPayBalance.textContent);
        }
        else {
            const loanBalance = document.getElementById("loanBalance");
            currentBankBalance += parseInt(currentPayBalance.textContent) *0.9;
            balance.textContent = currentBankBalance;
            currentDebt = currentDebt - parseInt(currentPayBalance.textContent)*0.1;
            loanBalance.textContent = currentDebt;
            if(currentDebt === 0)
                isLoanAvailable = true;
        }
        currentPayBalance.textContent = 0;
    })
    work.appendChild(depositButton);

    const workButton = document.createElement("button");
    workButton.setAttribute("class", "workButton");
    workButton.textContent = "Work";
    workButton.addEventListener("click", () => {

        const increasePay = parseInt(currentPayBalance.textContent) + 100;
        currentPayBalance.textContent = increasePay;
    })
    work.appendChild(workButton);

    const repayLoanButton = document.createElement("button");
    repayLoanButton.setAttribute("class", "repayLoanButton");
    repayLoanButton.textContent = "Repay";

    repayLoanButton.addEventListener("click", () => {

        const loanBalance = document.getElementById("loanBalance");
        const balance = document.getElementById("currentBankValue");
        if(currentDebt > 0) {
            currentDebt -= parseInt(currentPayBalance.textContent);
            if(currentDebt < 0) {
                
                isLoanAvailable = true;
                currentBankBalance -= currentDebt;
                balance.textContent = currentBankBalance;

                alert('Debt cleared! You have been refunded ' + -currentDebt + 'kr');
                currentDebt = 0;
                loanBalance.textContent = currentDebt;
            }
            currentPayBalance.textContent = 0;
        }
        else {
            
            alert('You dont have a loan to pay off!');
        }
    })
    
    work.appendChild(repayLoanButton);
}


const renderProductListComponent = () => {
    const container = document.getElementsByClassName("container")[0];

    const productListContainer = document.createElement("div");
    productListContainer.setAttribute("class", "productListContainer");
    container.appendChild(productListContainer);

    const productList = document.createElement("div");
    productList.setAttribute("class", "productList");
    productListContainer.appendChild(productList);

    const productListTitle = document.createElement("h2");
    productList.appendChild(productListTitle);
    const productListTitleText = document.createTextNode("Laptops");
    productListTitle.appendChild(productListTitleText);

    const selectProduct = document.createElement("select");
    getComputers().then(result => {
        result.forEach(element => {
            const laptop = document.createElement("option");
            laptop.addEventListener("click", (e) => {
                const container = document.getElementsByClassName("container")[0];
                const productInfo = document.getElementsByClassName("productInfo")[0];
                container.removeChild(productInfo);
                renderProductInfoComponent(result);
                removeProductFeatures();
                renderProductFeatures();
            })  
            laptop.text = element.title;
            selectProduct.add(laptop);
        });
        renderProductInfoComponent(result);
    })
    productList.appendChild(selectProduct);

    const productFeaturesTitle = document.createElement("h4");
    productFeaturesTitle.textContent = "Features: ";
    productList.appendChild(productFeaturesTitle);

    const productFeatures = document.createElement("div"); // Created in common parent for less repetition
    

    const renderProductFeatures = () => {
        
        productList.appendChild(productFeatures);
        
        getComputers().then(result => {
        result.forEach(element => {
            if(element.title === selectProduct.options[selectProduct.selectedIndex].value) {
                element.specs.forEach(item => {
                
                const productFeaturesText = document.createElement("p");
                productFeaturesText.setAttribute("class", "productFeatures");
                productFeaturesText.textContent = item;
                productFeatures.appendChild(productFeaturesText);
            })
            }
        })
    })
    }
    const removeProductFeatures = () => {
        while(productFeatures.firstChild) {
            productFeatures.removeChild(productFeatures.firstChild);
        }
    }

    const renderProductInfoComponent = (products) => {

        const container = document.getElementsByClassName("container")[0];
        const productInfo = document.createElement("div");
        productInfo.setAttribute("class", "productInfo");
    
        
        container.appendChild(productInfo);
        
        products.forEach(element => {
            if(element.title === selectProduct.options[selectProduct.selectedIndex].value) { // Product info component needs to access the select product element, hence nested functions.
                
                const imageContainer = document.createElement("div");
                imageContainer.setAttribute("class", "imageContainer");

                const itemInfoContainer = document.createElement("div");
                itemInfoContainer.setAttribute("class", "itemInfoContainer");

                const purchaseProductContainer = document.createElement("div");
                purchaseProductContainer.setAttribute("class", "productContainer");

                productInfo.appendChild(imageContainer);
                productInfo.appendChild(itemInfoContainer);
                productInfo.appendChild(purchaseProductContainer);

                
                const image = document.createElement("img");
                image.src = 'https://noroff-komputer-store-api.herokuapp.com/'+ element.image;
                image.width = 200;
                image.height = 200;
                image.onerror = () => {
                    image.src = './images/noimage.bmp';
                };

                const title = document.createElement("h1");
                title.textContent = element.title;
            
                const description = document.createElement("p");
                description.textContent = element.description;
            
                const price = document.createElement("h3");
                price.setAttribute("class", "price");
                price.textContent = element.price + " kr";

                imageContainer.appendChild(image);
                itemInfoContainer.appendChild(title);
                itemInfoContainer.appendChild(description);
                purchaseProductContainer.appendChild(price);
                
                const buyButton = document.createElement("button");
                buyButton.setAttribute("class", "buyButton");
                buyButton.textContent = "Buy now";
                buyButton.addEventListener("click", () => {
                    if(element.price <= currentBankBalance) {
                        const balance = document.getElementById("currentBankValue");
                        currentBankBalance -= element.price;
                        balance.textContent = currentBankBalance;

                        alert('Congratulations, you now own a new mega laptop!');
                    }
                    else {
                        alert('You do not have enough money to buy this laptop! ');
                    }
                })
                purchaseProductContainer.appendChild(buyButton);
            }
        });
    }
}

const getComputers = () => {
    return fetch('https://noroff-komputer-store-api.herokuapp.com/computers')
        .then(response => response.json());
}

app();