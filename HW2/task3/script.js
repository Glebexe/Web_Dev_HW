let bankAccount = {
    balance: 500,
    deposit: function(amount) {
        this.balance += amount;
    },
    withdraw: function(amount) {
        if (amount > this.balance) {
            document.getElementById("result").innerText = "Недостаточно средств на счете.";
        } else {
            this.balance -= amount;
        }
    }
};

function processTransaction() {
    const amount = Number(document.getElementById("amount").value);
    const choice = document.getElementById("choice").value;
    
    if (choice == "внести") {
        bankAccount.deposit(amount);
        document.getElementById("result").innerText = `Сумма ${amount} успешно внесена. Новый баланс: ${bankAccount.balance}`;
    } else if (choice == "снять") {
        bankAccount.withdraw(amount);
        if (amount <= bankAccount.balance) {
            document.getElementById("result").innerText = `Сумма ${amount} успешно снята. Новый баланс: ${bankAccount.balance}`;
        }
    }
}
