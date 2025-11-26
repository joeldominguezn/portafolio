import { useState } from 'react';

interface Props {
    fileUrl: string;       // La ruta del PDF (ej: "/documentos/mi-cv.pdf")
    fileName?: string;     // Nombre sugerido para descargar
    height?: string;       // Altura del visor (default: 600px)
}

export default function PdfViewer({ fileUrl, fileName = "documento.pdf", height = "600px" }: Props) {
    return (
        <div className="w-full h-full flex flex-col bg-container-2">
            {/* 2. EL VISOR (Iframe Nativo) */}
            <div className='flex-1 w-full h-full relative'>
                <object
                    data={fileUrl}
                    type="application/pdf"
                    width="100%"
                    height={height}
                    name={fileName}
                    className="block w-full h-full"
                >
                    {/* Fallback por si el navegador no soporta PDFs (móviles muy viejos) */}
                    <div className="flex flex-col items-center justify-center h-full p-10 text-center text-gray-500 dark:text-gray-400">
                        <p className="mb-2">Tu navegador no puede visualizar este PDF directamente.</p>
                        <a href={fileUrl} download={fileName} className="text-blue-600 hover:underline dark:text-blue-500">
                            Haz click aquí para descargarlo.
                        </a>
                    </div>
                </object>
            </div>
        </div>
    );
}