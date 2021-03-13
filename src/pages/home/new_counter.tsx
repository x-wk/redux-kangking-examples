import React from 'react';

function NewCounter() {

   const [testCount, setTestCount] = React.useState(99);
   const [count, setCount] = React.useState(0);
   const [name, setName] = React.useState('tom');

   function add() {
      setCount(count + 1);
   }

   function changeName() {
      setName('jack');
   }

   function addTest() {
      setTestCount(testCount + 2);
   }

   return (
      <div>
         <h1>当前结果: {count}, {name}, {testCount}</h1>
         <button onClick={add}>点我加1</button>
         <button onClick={addTest}>点我加test</button>
         <button onClick={changeName}>点我改名</button>
      </div>
   );
}

export default NewCounter;
