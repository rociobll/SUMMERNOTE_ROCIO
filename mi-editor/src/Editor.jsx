import { useEffect, useRef } from "react"

function Editor() {
  const editorRef = useRef(null)

  // tomar jquery del CDN (window.$)
  const $ = window.$

  useEffect(() => {
    // Inicializar Summernote
    $(editorRef.current).summernote({
      height: 300,       // altura del editor
      placeholder: "Escribe aquí...",
      lang: 'es-ES'
    });


    // Limpiar al desmontar
    return () => {
      $(editorRef.current).summernote("destroy")
    };
  }, []);

  return <div ref={editorRef}></div>;
}

export default Editor;