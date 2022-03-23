import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [modal, setModal] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const Transaction = {
    add(transaction) {
      setTransactions([...transactions, transaction]);
    },
    remove(index) {
      transactions.splice(index, 1);
      setTransactions([...transactions]);
    },
    incomes() {
      let income = 0;
      transactions.forEach(transaction => {
        if (transaction.amount > 0) {
          income += transaction.amount;
        }
      });
      return income;
    },
    expenses() {
      let expense = 0;
      transactions.forEach(transaction => {
        if (transaction.amount < 0) {
          expense += transaction.amount;
        }
      });
      return expense;
    },
    total() {
      return Transaction.incomes() + Transaction.expenses();
    },
  };

  const formatDate = date => {
    const splittedDate = date.split("-");
    return splittedDate.reverse().join("/");
  };

  const formatCurrency = value => {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return signal + value;
  };

  const formatValues = () => {
    return {
      description,
      amount: Math.round(amount * 100),
      date: formatDate(date),
    };
  };

  const validateFields = () => {
    if (!(description.trim() && amount.trim() && date.trim())) {
      throw new Error("Por favor, preencha todos os campos");
    }
  };

  const clearFields = () => {
    setDescription("");
    setAmount("");
    setDate("");
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    try {
      validateFields();
      const transaction = formatValues();
      Transaction.add(transaction);

      clearFields();
      setModal(false);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    setTransactions(
      JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    );
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "dev.finances:transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  return (
    <div className={styles.container}>
      <header>
        <Image
          src="/assets/logo.svg"
          alt="Logo Dev Finance"
          width="172"
          height="24"
        />
      </header>
      <main className="container">
        <section id="balance">
          <h2 className="sr-only">Balanço</h2>

          <div className="card">
            <h3>
              <span>Entradas</span>
              <Image
                src="/assets/income.svg"
                alt="Imagem de Entradas"
                width="32"
                height="32"
              />
            </h3>
            <p id="incomeDisplay">{formatCurrency(Transaction.incomes())}</p>
          </div>
          <div className="card">
            <h3>
              <span>Saídas</span>
              <Image
                src="/assets/expense.svg"
                alt="Imagem de Saídas"
                width="32"
                height="32"
              />
            </h3>
            <p id="expenseDisplay">{formatCurrency(Transaction.expenses())}</p>
          </div>
          <div className="card total">
            <h3>
              <span>Total</span>
              <Image
                src="/assets/total.svg"
                alt="Imagem de Total"
                width="32"
                height="32"
              />
            </h3>
            <p id="totalDisplay">{formatCurrency(Transaction.total())}</p>
          </div>
        </section>

        <section id="transaction">
          <h2 className="sr-only">Transações</h2>
          <button onClick={() => setModal(true)} className="button new">
            + Nova Transação
          </button>
          <table id="data-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Data</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="description">{transaction.description}</td>
                  <td className={transaction.amount > 0 ? "income" : "expense"}>
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="date">{transaction.date}</td>
                  <td>
                    <Image
                      onClick={() => Transaction.remove(index)}
                      src="/assets/minus.svg"
                      alt="Remover Transação"
                      width="28"
                      height="28"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <div className={`modal-overlay ${modal ? "active" : ""}`}>
        <div className="modal">
          <div id="form">
            <h2>Nova Transação</h2>
            <form onSubmit={handleOnSubmit}>
              <div className="input-group">
                <label className="sr-only" htmlFor="description">
                  Descrição
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Descrição"
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="sr-only" htmlFor="amount">
                  Valor
                </label>
                <input
                  type="number"
                  id="amount"
                  step="0.01"
                  name="amount"
                  placeholder="0,00"
                  value={amount}
                  onChange={event => setAmount(event.target.value)}
                />
                <small className="help">
                  Use o sinal - (negativo) para despesas e, (vírgula) para casas
                  decimais
                </small>
              </div>
              <div className="input-group">
                <label className="sr-only" htmlFor="date">
                  Data
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  defaultValue={new Date().toLocaleDateString()}
                  onChange={event => setDate(event.target.value)}
                />
              </div>
              <div className="input-group actions">
                <button
                  type="reset"
                  className="button cancel"
                  onClick={() => setModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer>
        <p>dev.finance$</p>
      </footer>
    </div>
  );
}
