import './App.css'
import { ReactTerminal } from "react-terminal";
import { TerminalContextProvider } from "react-terminal";
import minimongo from "minimongo"

/* commands

db.animals.upsert({ species: "cat", name: "Mog" })
db.animals.upsert({ species: "cat", name: "Slinky Malinky" })
db.animals.upsert({ species: "dog", name: "Nell" })

db.animals.find().fetch()
db.animals.find({species: "cat"}).fetch()
db.animals.findOne({species: "dog"})
*/

const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor

const db = new minimongo.MemoryDb();
(globalThis as any)["db"] = db

db.addCollection("animals");

const runCommand = async (...bits: string[]) =>  {
  const command = bits.join(" ")
  const result =  await (AsyncFunction(`return await ${command};`))()
  return JSON.stringify(result)
}

const App = () => <TerminalContextProvider>
        <div style={{width: '600px', height: '350px'}}>
            <ReactTerminal theme="dark" defaultHandler={runCommand}/>
        </div>
      </TerminalContextProvider>


export default App
