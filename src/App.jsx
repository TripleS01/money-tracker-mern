import './App.css'

import { useEffect, useState } from 'react'

const URL = 'http://localhost:5555/api/transactions';

function App() {
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const response = await fetch(URL);
    return await response.json();
  }

  function addNewTransaction(event) {
    event.preventDefault();

    const price = name.split(' ')[0];

    fetch(URL, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        dateTime
      })
    }).then(response => {
      response.json().then(json => {
        setName('');
        setDateTime('');
        setDescription('');
        console.log('result', json);
      })
    });
  }

  let balance = 0;

  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }
  balance = balance.toFixed(2);

  const cents = balance.split('.')[1];
  const dollars = balance.split('.')[0];


  return (
    <>
      <main>

        <h1>${dollars}.<span>{cents}</span> </h1>

        <form onSubmit={addNewTransaction}>

          <div className="base">
            <input
              type="text"
              placeholder="$... new transaction"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <input
              type="datetime-local"
              value={dateTime}
              onChange={event => setDateTime(event.target.value)}
            />
          </div>
          <div className="description">
            <input
              type="text"
              placeholder="description"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </div>
          <div>
            <button type="submit">Add new transaction</button>
          </div>

          <div className="transactions">

            {transactions.length > 0 && transactions.map(transaction => (

              <div className="transaction">

                <div className="transaction-left">
                  <div className="transaction-name">{transaction.name}</div>
                  <div className="transaction-description">{transaction.description}</div>
                </div>

                <div className="transaction-right">
                  <div className={"transaction-price " + (transaction.price < 0 ? 'red' : 'green')}>$
                    {transaction.price}
                  </div>
                  <div className="transaction-datetime">{transaction.dateTime}</div>
                </div>

              </div>
            ))}

          </div>

        </form>
      </main>
    </>
  )
}

export default App
