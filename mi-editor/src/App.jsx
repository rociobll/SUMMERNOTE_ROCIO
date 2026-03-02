import { useState } from "react";
import Editor from "./components/Editor";


function App() {

  const [content, setContent] = useState('')

  // guardar contenido - veo por consola
  const saveContent = () => {
    console.log('Contenido guardado.')
    console.log(content)
  }


  return (
    <div className="container editor-container">
      <div className="row justify-content-center">
        <h1>SUMMERNOTE - Prueba</h1>
        <div className= "editor">
        {/* le pasamos al componente la funcion setCointent para capturar cambios */}
          <Editor onChange={setContent}/> 

          boton para guardar contenido
          <button className="btn btn-success mt-4" onClick={saveContent}>
            Guardar contenido
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;