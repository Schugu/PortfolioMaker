import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const DownloadFiles = () => {
  const handleDownload = async () => {
    const zip = new JSZip();
    const folder = zip.folder('profile');

    // Crear archivos dentro de la carpeta
    folder.file('archivo1.txt', 'Contenido del archivo 1');
    folder.file('archivo2.txt', 'Contenido del archivo 2');
    
    // Generar el archivo zip
    const content = await zip.generateAsync({ type: 'blob' });
    
    // Descargar el archivo zip
    saveAs(content, 'archivos.zip');
  };

  return (
    <div>
      <button onClick={handleDownload}>Descargar Archivos</button>
    </div>
  );
};

export default DownloadFiles;
