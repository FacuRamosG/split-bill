import { useState } from 'react'
import './App.css'
import { handleCalcu } from './handles/handleCalcu';
import getRandomColor from './const/randomColor';

function App() {
  const [formData, setFormData] = useState({
    person: "",
    amount: "",
    comidaTake: false,
    amountComida: "",
    totalComida: 0,
    personComida: 0,
    bebidaTake: false,
    amountBebida: "",
    totalBebida: 0,
    personBebida: 0,
    other: false,
    amountOther: "",
    totalOther: 0,
    personOther: 0,
    alcohol: false,
    amountAlcohol: "",
    totalAlcohol: 0,
    personAlcohol: 0,
  });

  const [tablePay, setTablePay] = useState([]);
  const [items, setItems] = useState([]);

  const addItem = (e) => {
    e.preventDefault();
    if (formData.person === "") return alert("Ingrese un nombre");
    const randomColor = getRandomColor();

    setItems([
      ...items,
      {
        id: Math.floor(Math.random() * 10000),
        person: formData.person,
        color: randomColor,
        comida: {
          comidaTake: formData.comidaTake,
          amountComida: formData.amountComida,
        },
        bebida: {
          bebidaTake: formData.bebidaTake,
          amountBebida: formData.amountBebida,
        },
        other: {
          other: formData.other,
          amountOther: formData.amountOther,
        },
        alcohol: {
          alcohol: formData.alcohol,
          amountAlcohol: formData.amountAlcohol,
        },
      },
    ]);
    

    setFormData({
      person: "",
      amount: "",
      comidaTake: false,
      amountComida: "",
      totalComida: formData.amountComida ? formData.totalComida + parseInt(formData.amountComida) : formData.totalComida,
      personComida: formData.comidaTake ? formData.personComida + 1 : formData.personComida,
      bebidaTake: false,
      amountBebida: "",
      totalBebida: formData.amountBebida ? formData.totalBebida + parseInt(formData.amountBebida) : formData.totalBebida,
      personBebida: formData.bebidaTake ? formData.personBebida + 1 : formData.personBebida ,
      other: false,
      amountOther: "",
      totalOther :formData.amountOther ?  formData.totalOther + parseInt(formData.amountOther) : formData.totalOther,
      personOther: formData.other ? formData.personOther + 1 : formData.personOther,
      alcohol: false,
      amountAlcohol: "",
      totalAlcohol: formData.amountAlcohol ? formData.totalAlcohol + parseInt(formData.amountAlcohol) : formData.totalAlcohol,
      personAlcohol: formData.alcohol ? formData.personAlcohol + 1 : formData.personAlcohol,
    });
  };

  const handleDelete = (id) => {
    const item = items.find((item) => item.id === id);
    setFormData({
      totalComida: item.comida?.amountComida ? formData.totalComida - parseInt(item.comida.amountComida) : formData.totalComida,
      totalBebida: item.bebida?.amountBebida ? formData.totalBebida - parseInt(item.bebida.amountBebida) : formData.totalBebida,
      totalOther: item.other?.amountOther ? formData.totalOther - parseInt(item.other.amountOther) : formData.totalOther,
      totalAlcohol: item.alcohol?.amountAlcohol ? formData.totalAlcohol - parseInt(item.alcohol.amountAlcohol) : formData.totalAlcohol,
      personComida: item.comida?.comidaTake ? formData.personComida - 1 : formData.personComida,
      personBebida: item.bebida?.bebidaTake ? formData.personBebida - 1 : formData.personBebida,
      personOther: item.other?.other ? formData.personOther - 1 : formData.personOther,
      personAlcohol: item.alcohol?.alcohol ? formData.personAlcohol - 1 : formData.personAlcohol,
    })
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  }

  const handleRestart = () => {
    setFormData({
      person: "",
      amount: "",
      comidaTake: false,
      amountComida: "",
      totalComida: 0,
      personComida: 0,
      bebidaTake: false,
      amountBebida: "",
      totalBebida: 0,
      personBebida: 0,
      other: false,
      amountOther: "",
      totalOther: 0,
      personOther: 0,
      alcohol: false,
      amountAlcohol: "",
      totalAlcohol: 0,
      personAlcohol: 0,
    });
    setItems([]);
    setTablePay([]);
  }

  
 
  return (
    <div className="p-4">
      <form action="" className='mb-8 sm:mb-0'>
        <div className='flex gap-4'>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-start h-[310px] sm:h-[250px]">
            <div className="flex flex-col justify-start gap-4 h-full">
              <label className="text-left">Nombre:</label>
              <input
                type="text"
                name="person"
                id="person"
                onChange={(e) =>
                  setFormData({ ...formData, person: e.target.value })
                }
                value={formData.person}
                className="h-10 w-50 p-4  bg-[#3B3B3B] border border-gray-600 rounded-lg text-white "
                placeholder="Facundo, Juan, ..."
                required
              />
            </div>

            <div className="flex flex-col justify-start h-full">
              <h3 className="mb-4 font-semibold text-white text-left">
                Participación:
              </h3>
              <ul className="items-center w-full text-sm font-medium  border rounded-lg  bg-gray-700 border-gray-600 text-white">
                <li className="w-full border-b flex justify-between sm:border-b-0 sm:border-r border-gray-600">
                  <div className="flex items-center justify-between pl-3">
                    <input
                      id="comida-checkbox-list"
                      type="checkbox"
                      checked={formData.comidaTake}
                      value={formData.comidaTake}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          comidaTake: !formData.comidaTake,
                        })
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                    />
                    <label
                      htmlFor="comida-checkbox-list"
                      className="w-full py-3 ml-2 text-sm text-left font-medium text-gray-300"
                    >
                      Comida
                    </label>
                  </div>
                  
                    <input
                      type="number"
                      value={formData.amountComida}
                      name="comidaMoney"
                      id=""
                      className="h-8 w-20 m-2 p-2  bg-[#3B3B3B] border border-gray-600 rounded-lg text-white"
                      onChange={(e) =>
                        setFormData({ ...formData, amountComida: e.target.value })
                      }
                    />
                  
                </li>

                <li className="w-full border-b flex justify-between sm:border-b-0 sm:border-r border-gray-600">
                  <div className="flex items-center justify-between pl-3">
                    <input
                      id="bebida-checkbox-list"
                      type="checkbox"
                      checked={formData.bebidaTake}
                      value={formData.bebidaTake}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          bebidaTake: !formData.bebidaTake,
                        })
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                    />
                    <label
                      htmlFor="bebida-checkbox-list"
                      className="w-full py-3 ml-2 text-sm font-medium text-left text-gray-300"
                    >
                      Bebida
                    </label>
                  </div>
                  
                    <input
                      type="number"
                      value={formData.amountBebida}
                      name="comidaMoney"
                      id=""
                      className="h-8 w-20 m-2 p-2  bg-[#3B3B3B] border border-gray-600 rounded-lg text-white"
                      onChange={(e) =>
                        setFormData({ ...formData, amountBebida: e.target.value })
                      }
                    />
                  
                </li>

                <li className="w-full border-b flex justify-between sm:border-b-0 sm:border-r border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="alcohol-checkbox-list"
                      type="checkbox"
                      checked={formData.alcohol}
                      onChange={(e) => setFormData({ ...formData, alcohol: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                    />
                    <label
                      htmlFor="alcohol-checkbox-list"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-300"
                    >
                      Alcohol
                    </label>
                  </div>
                  
                    <input
                      type="number"
                      value={formData.amountAlcohol}
                      name="alcoholMoney"
                      className="h-8 w-20 m-2 p-2  bg-[#3B3B3B] border border-gray-600 rounded-lg text-white"
                      onChange={(e) => setFormData({ ...formData, amountAlcohol: e.target.value })}
                    />
                  
                </li>

                <li className="w-full border-b flex justify-between sm:border-b-0 sm:border-r border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="other-checkbox-list"
                      type="checkbox"
                      checked={formData.other}
                      onChange={(e) => setFormData({ ...formData, other: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                    />
                    <label
                      htmlFor="other-checkbox-list"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-300"
                    >
                      Otros
                    </label>
                  </div>
                  
                    <input
                      type="number"
                      value={formData.amountOther}
                      name="otherMoney"
                      className="h-8 w-20 m-2 p-2  bg-[#3B3B3B] border border-gray-600 rounded-lg text-white"
                      onChange={(e) => setFormData({ ...formData, amountOther: e.target.value })}
                    />
                  
                </li>
                              
              
              </ul>
            </div>
          </div>
          <button onClick={addItem} className="h-16 sm:mt-9 m-auto sm:mx-0">
            +
          </button>
        </div>        
      </form>

      <table className="table-auto text-left min-w-full divide-y divide-gray-500/20 mt-4">
        <thead>
          <tr className="text-zinc-400 text-sm ">
              <th className="px-4 py-2 font-light">Nombre</th>
              <th className="px-4 py-2 font-light">Comida</th>
              <th className="px-4 py-2 font-light">Bebida</th>
              <th className="px-4 py-2 font-light">Alcohol</th>
              <th className="px-4 py-2 font-light">Otros</th>
              <th></th>

          </tr>
        </thead>  

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className='capitalize' style={{color:item.color}}>{item.person}</td>

                <td className="bg-red-500 text-center p-2">{item.comida.comidaTake ? (item.comida?.amountComida ? `$${item.comida.amountComida}` : '$0'): (item.comida?.amountComida > 0 ? `$${item.comida?.amountComida} pero no consume` : 'No consume')}</td>
                <td className="bg-blue-500 text-center p-2">{item.bebida.bebidaTake ? (item.bebida?.amountBebida ? `$${item.bebida.amountBebida}` : '$0') : (item.bebida.amountBebida > 0 ? `$${item.bebida.amountBebida} pero no consume` : 'No consume')}</td>
                <td className="bg-green-500 text-center p-2">{item.alcohol.alcohol ? (item.alcohol?.amountAlcohol ? `$${item.alcohol.amountAlcohol}` : '$0') : (item.alcohol.amountAlcohol > 0 ? `$${item.alcohol.amountAlcohol} pero no consume` : 'No consume')}</td>
                <td className="bg-yellow-500 text-center p-2">{item.other.other ? (item.other?.amountOther ? `$${item.other.amountOther}` : '$0') : (item.other.amountOther > 0 ? `$${item.other.amountOther} pero no consume` : 'No consume')}</td>
                <td><button className='hover:bg-red-600' onClick={() => {handleDelete(item.id)}}>X</button></td>
            
            </tr>
           ))}
           <tr>
            <td>Total</td>
            <td className='text-center'>${formData.totalComida ? formData.totalComida :0}</td>
            <td className='text-center'>${formData.totalBebida ? formData.totalBebida :0}</td>
            <td className='text-center'>${formData.totalAlcohol ? formData.totalAlcohol :0}</td>
            <td className='text-center'>${formData.totalOther ? formData.totalOther :0}</td>
           </tr>

        </tbody>               
      </table>

      <button className='mb-8' onClick={() => setTablePay(handleCalcu(formData,items))}>Calcular</button>

      {
        tablePay.length > 0 && (
          <>
          {tablePay.map((tansition) => (
            <div key={tansition.id}>
              <p className='text-lg'><span className='capitalize' style={{color:tansition.deudor.color}}>{tansition.deudor.nombre}</span> le debe a <span className='capitalize' style={{color:tansition.acreedor.color}}>{tansition.acreedor.nombre}</span> ${parseInt(tansition.cantidad)}</p>
            </div>
          ))}
          <div>
            <button className='mt-5' onClick={handleRestart}>Reiniciar</button>
          </div>
          </>
         )

      }
      
    </div>
  );
}

export default App
