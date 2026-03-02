import { useState } from "react";
import Editor from "./components/Editor";

// 👇 Datos iniciales (simulan base de datos)
const initialTemplates = [
  {
    id: 1,
    name: "Bienvenida ES",
    language: "es-ES",
    content: "<p>Hola {name}, bienvenido</p>"
  },
  {
    id: 2,
    name: "Welcome EN",
    language: "en-US",
    content: "<p>Hello {name}, welcome</p>"
  }
];


function App() {
  const [lang, setLanguage] = useState('es-ES')
  const [templates, setTemplates] = useState(initialTemplates)
  const [content, setContent] = useState('')

  // guardar contenido - veo por consola
  const saveContent = () => {
    const newTemplate= {
      id: templates.length + 1,
      name: "nueva plantilla"
    }
    console.log('Contenido guardado.')
    console.log(content)
   
  }


  return (
    <><div className="container editor-container">
      <div className="row justify-content-center">
        <h1>SUMMERNOTE - Prueba</h1>
        <div className="editor">
          {/* le pasamos al componente la funcion setCointent para capturar cambios */}
          <Editor value={content} onChange={setContent} lang={lang} />

          boton para guardar contenido
          <button className="btn btn-success mt-4" onClick={saveContent}>
            Guardar contenido
          </button>
        </div>
      </div>
    </div><div>
        <select
          className="form-select mt-3"
          onChange={(e) => {
            const selected = templates.find(t => t.id === Number(e.target.value));
            if (selected) {
              setContent(selected.content);
            }
          } }
        >
          <option value="">Selecciona una plantilla</option>
          {templates.map(template => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
        <select
          className="form-select"
          value={lang}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="es-ES">Español</option>
          <option value="en-US">English</option>
          <option value="fr-FR">Francés</option>
          <option value="it-IT">Italiano</option>

        </select>
      </div></>
  );
}

export default App;