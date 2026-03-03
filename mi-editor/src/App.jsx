import { useState } from "react";
import Editor from "./components/Editor";
import { SUPPORTED_LANGUAGES } from "./constants";

// 👇 Datos iniciales (simulan base de datos)
const initialTemplates = [
  {
    id: 1,
    name: "Bienvenida ES",
    language: SUPPORTED_LANGUAGES.es,
    content: "<p>Hola {name}, bienvenido</p>"
  },
  {
    id: 2,
    name: "Welcome EN",
    language: SUPPORTED_LANGUAGES.en,
    content: "<p>Hello {name}, welcome</p>"
  }
];


function App() {
  const [lang, setLanguage] = useState(SUPPORTED_LANGUAGES.es)
  const [templates, setTemplates] = useState(initialTemplates)
  const [content, setContent] = useState('')

  // guardar contenido - veo por consola
  const saveContent = () => {
    const newTemplate= {
      id: templates.length + 1,
      name: "nueva plantilla"
    }
    setTemplates(newTemplate)
    console.log('Contenido guardado.')
    console.log(content)
   
  }


  return (
    <><div className="container editor-container">
      <div className="row justify-content-center">
        <h1>SUMMERNOTE - Prueba</h1>
        <div className="editor">
          {/* le pasamos al componente la funcion setContent para capturar cambios */}
          <Editor value={content} onChange={setContent} lang={lang} />

          {/* boton para guardar contenido */}
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
          <option value={SUPPORTED_LANGUAGES.es}>Español</option>
          <option value={SUPPORTED_LANGUAGES.en}>English</option>
          <option value={SUPPORTED_LANGUAGES.fr}>Français</option>
          <option value={SUPPORTED_LANGUAGES.it}>Italiano</option>
          <option value={SUPPORTED_LANGUAGES.de}>Deutsch</option>


        </select>
      </div></>
  );
}

export default App;