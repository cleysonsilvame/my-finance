import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { App } from "../scripts";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [app, setApp] = useState(null);

  useEffect(() => {
    setApp(App.init());
  }, []);

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
            <p id="incomeDisplay">R$ 0,00</p>
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
            <p id="expenseDisplay">R$ 0,00</p>
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
            <p id="totalDisplay">R$ 0,00</p>
          </div>
        </section>

        <section id="transaction">
          <h2 className="sr-only">Transações</h2>
          <a onClick={() => app.Modal.open()} className="button new">
            + Nova Transação
          </a>
          <table id="data-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Data</th>
                <th></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </section>
      </main>

      <div className="modal-overlay">
        <div className="modal">
          <div id="form">
            <h2>Nova Transação</h2>
            <form onSubmit={event => app.Form.submit(event)}>
              <div className="input-group">
                <label className="sr-only" htmlFor="description">
                  Descrição
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Descrição"
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
                <input type="date" id="date" name="date" />
              </div>
              <div className="input-group actions">
                <a
                  href="#"
                  className="button cancel"
                  onClick={() => app.Modal.close()}
                >
                  Cancelar
                </a>
                <button>Salvar</button>
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
