import * as pdfjsLib from "pdfjs-dist";

// pdfjs worker (Vite-friendly)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function extractPdfText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const maxPages = Math.min(pdf.numPages, 25); // mobile-first reliability
  const parts: string[] = [];

  for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const strings = (content.items as Array<{ str?: string }>).map((i) => i.str || "");
    const pageText = strings.join(" ").replace(/\s+/g, " ").trim();
    if (pageText) parts.push(pageText);
  }

  return parts.join("\n\n");
}
