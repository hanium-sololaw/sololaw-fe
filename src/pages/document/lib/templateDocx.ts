import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  type ParagraphChild,
} from "docx";
import type { TemplateBlock } from "../data/templates";

// ponytail: 폰트는 파일에 포함되지 않음 — 열람 PC에 Noto Serif KR이 없으면 Word가 대체 폰트로 표시.
const FONT = "Noto Serif KR";
const BODY_SIZE = 22;
const NONE = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const LINE = { style: BorderStyle.SINGLE, size: 4, color: "333333" };
const NO_BORDERS = { top: NONE, bottom: NONE, left: NONE, right: NONE };

const runs = (text: string, options: { bold?: boolean; size?: number } = {}): ParagraphChild[] =>
  text.split("\n").map(
    (line, index) =>
      new TextRun({ text: line, break: index ? 1 : 0, font: FONT, size: options.size ?? BODY_SIZE, bold: options.bold }),
  );

const paragraph = (
  text: string,
  options: { bold?: boolean; size?: number; align?: (typeof AlignmentType)[keyof typeof AlignmentType]; indent?: boolean; before?: number } = {},
) =>
  new Paragraph({
    children: runs(text, options),
    alignment: options.align,
    indent: options.indent ? { left: 440 } : undefined,
    spacing: { before: options.before ?? 0, after: 120, line: 360 },
  });

const cell = (text: string, width: number, options: { bold?: boolean; right?: boolean; borders?: object; shade?: boolean; center?: boolean } = {}) =>
  new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: options.borders ?? NO_BORDERS,
    shading: options.shade ? { type: ShadingType.CLEAR, fill: "F1F1F1" } : undefined,
    margins: { top: 40, bottom: 40, left: 80, right: 80 },
    children: [
      new Paragraph({
        children: runs(text, { bold: options.bold, size: options.borders ? 20 : BODY_SIZE }),
        alignment: options.right ? AlignmentType.RIGHT : options.center ? AlignmentType.CENTER : undefined,
      }),
    ],
  });

const grid = (rows: TableRow[], columns: number[]) =>
  new Table({ rows, columnWidths: columns, width: { size: columns.reduce((a, b) => a + b, 0), type: WidthType.DXA } });

const toNodes = (block: TemplateBlock): (Paragraph | Table)[] => {
  switch (block.type) {
    case "title":
      return [paragraph(block.text.split("").join(" "), { bold: true, size: 44, align: AlignmentType.CENTER, before: 120 })];
    case "heading":
      return [paragraph(block.text.split("").join(" "), { bold: true, align: AlignmentType.CENTER, before: 200 })];
    case "center":
      return [paragraph(block.text, { bold: true, align: AlignmentType.CENTER })];
    case "p":
      return [paragraph(block.text, { indent: block.indent })];
    case "note":
      return [paragraph(block.text, { size: 20 })];
    case "sign":
      return [paragraph(block.text, { align: AlignmentType.RIGHT, before: 240 })];
    case "court":
      return [paragraph(block.text, { bold: true, size: 28, before: 360 })];
    case "party":
      return [grid(block.rows.map(([label, value]) => new TableRow({ children: [cell(label.split("").join(" "), 1300), cell(value, 8000)] })), [1300, 8000])];
    case "kv":
      return [
        grid(
          block.rows.map(
            ([label, value, total]) =>
              new TableRow({
                children: [
                  cell(label, 4800, { bold: total, borders: total ? { ...NO_BORDERS, top: LINE } : undefined }),
                  cell(value, 2600, { bold: total, right: true, borders: total ? { ...NO_BORDERS, top: LINE } : undefined }),
                ],
              }),
          ),
          [4800, 2600],
        ),
      ];
    case "list":
      return [grid(block.rows.map(([left, right]) => new TableRow({ children: [cell(left, 3300), cell(right, 6000)] })), [3300, 6000])];
    case "table": {
      const borders = { top: LINE, bottom: LINE, left: LINE, right: LINE };
      const widths = [1300, 1800, 3000, 1500, 1700];
      const row = (cells: string[], head?: boolean) =>
        new TableRow({ children: cells.map((text, i) => cell(text, widths[i], { bold: head, shade: head, center: head, borders })) });
      return [grid([row(block.head, true), ...block.rows.map((r) => row(r))], widths)];
    }
  }
};

export async function downloadTemplateDocx(title: string, blocks: TemplateBlock[]) {
  const doc = new Document({
    sections: [
      {
        properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
        children: blocks.flatMap((block) => [...toNodes(block), new Paragraph({ spacing: { after: 80 } })]),
      },
    ],
  });
  const url = URL.createObjectURL(await Packer.toBlob(doc));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title}.docx`;
  link.click();
  URL.revokeObjectURL(url);
}
