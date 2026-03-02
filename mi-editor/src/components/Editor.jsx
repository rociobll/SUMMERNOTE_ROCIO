import { useEffect, useRef } from "react";
import "./Editor.css";


// value para recibir contenido desde App y onchange para mandar contenido a App, y language para soporte multi
function Editor({ value, onChange, lang }) {
  // useRef para referenciar div del DOm deonde se montará summernote
  const editorRef = useRef(null);

  // tomar jquery del CDN (window.$)
  const $ = window.$;

  useEffect(() => {
    
    // Inicializar Summernote
    $(editorRef.current).summernote({
      height: 300,
      placeholder: "Escriba aquí",
      lang: lang,
      callbacks: {
        onFocus: function () {
          const content = $(editorRef.current).summernote("code")

          if (content === "<p><br></p>") {
            $(editorRef.current).summernote("code", "")
          }
        },
        onChange: function (contents) {
          // cada vez que el contenido cambia, llamamos a la función que nos pasa App.js
          onChange(contents)
        },
      },
    });

      if (value) {
        $(editorRef.current).summernote("code", value);
  }

    // Limpiar al desmontar
    return () => {
      $(editorRef.current).summernote("destroy")
    };
  }, [$, lang]);  //cuando cambie idioma se destruye y vuelve a crear otro editor con nuevo idioma

  useEffect(() => {
   if (value !== undefined && editorRef.current) {
    $(editorRef.current).summernote("code", value);
   }
  }, [$, value]);

  // //  cargar contenido en el editor
  // const loadContent = () => {
  //   const template = "<p>Hola {name}, bienvenido a tu nota de hoy</p>";
  //   // code de summernote pone el contenido html dentro de editor
  //   $(editorRef.current).summernote("code", template);
  //   // actualizar estado de React para q App tenga el contenido
  //   onChange(template);
  // };

  // funcion insertar placeholders en posicion cursor
  const insertPlaceHolder = (placeholder) => {
    $(editorRef.current).summernote("insertText", `{${placeholder}}`);
  };

  return (
 
    <div>
      {/* aqui se monta summernote */}
      <div ref={editorRef}></div>

      {/* botones para placeholders */}
      <div className="mt-3">
        <p>Insertar variable:</p>
        <button
          className="btn -btn-info me-2"
          onClick={() => insertPlaceHolder("name")}
        >
          {"{name}"}
        </button>

        <button
          className="btn -btn-info"
          onClick={() => insertPlaceHolder("date")}
        >
          {"{date}"}
        </button>

        {/* boton cargar contenido */}
        {/* <button className="btn btn-warning" onClick={loadContent}> */}
        <button className="btn btn-warning">

          Cargar contenido
        </button>
      </div>
    </div>
    // </div>
  );
}

export default Editor;
