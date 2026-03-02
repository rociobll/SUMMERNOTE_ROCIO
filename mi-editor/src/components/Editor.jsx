import { useEffect, useRef } from "react";
import "./Editor.css";

function Editor({ onChange }) {
  const editorRef = useRef(null);

  // tomar jquery del CDN (window.$)
  const $ = window.$;

  useEffect(() => {
    // Inicializar Summernote
    $(editorRef.current).summernote({
      height: 300,
      placeholder: "Escriba aquí",
      lang: "es-ES",
      callbacks: {
        onFocus: function () {
          const content = $(editorRef.current).summernote('code')

          if (content === "<p><br></p>") {
            $(editorRef.current).summernote('code', "")
          }
        },
        onChange: function (contents) {
          onChange(contents);
        },
      },
    });

    // Limpiar al desmontar
    return () => {
      $(editorRef.current).summernote("destroy");
    };
  }, []);

  //  cargar contenido en el editor
  const loadContent = () => {
    const template = "<p>Hola {name}, bienvenido a tu nota de hoy</p>";
    // code de summernote pone el contenido html dentro de editor
    $(editorRef.current).summernote("code", template);
    // actualizar estado de React para q App tenga el contenido
    onChange(template);
  };

  // funcion insertar placeholders en pos cursor
  const insertPlaceHolder = (placeholder) => {
    $(editorRef.current).summernote("insertText", `{${placeholder}`);
  };

  return (
    // <div className="formulario">
    // <form action="">
    //   <label htmlFor="name">Nombre</label>
    //   <input type="text" id="name" name="user_name" />

    //     <label htmlFor="date">Fecha</label>
    //   <input type="datetime-local" id="date" name="date" />
      
    // </form>
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
        <button className="btn btn-warning" onClick={loadContent}>
          Cargar contenido
        </button>
      </div>
    </div>
    // </div>
  );
}

export default Editor;
