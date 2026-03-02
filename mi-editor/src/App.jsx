import Editor from "./components/Editor";


function App() {
  return (
    <div className="container editor-container">
      <div className="row justify-content-center">
        <h1>SUMMERNOTE - Prueba</h1>
        <div className= "editor">
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default App;