import * as XLSX from "xlsx";
import { Id } from "@/convex/_generated/dataModel";
import { Response, FormField } from "./types";

/**
 * Generate and trigger download of XLSX for given responses and fields
 */
export function downloadResponsesXlsx(
  formId: Id<"forms">,
  responses: Response[],
  fields: FormField[]
) {
  const headers = [
    "Respondent",
    "Submitted At",
    "Time Taken",
    ...fields.map((f) => f.label),
  ];
  const wsData: string[][] = [headers];

  if (responses.length > 0) {
    for (const resp of responses) {
      const timeTaken =
        resp.responseTimeMs != null
          ? `${Math.floor(resp.responseTimeMs / 60000)}m ${Math.floor((resp.responseTimeMs % 60000) / 1000)}s`
          : "-";
      const row = [
        resp.respondentEmail || "Anonymous",
        new Date(resp.submittedAt).toLocaleString(),
        timeTaken,
      ];
      for (const field of fields) {
        const ans = resp.answers.find((a) => a.fieldId === field._id);
        row.push(ans?.value != null ? String(ans.value) : "");
      }
      wsData.push(row);
    }
  } else {
    wsData.push(["No responses yet"]);
  }

  // Create workbook and sheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, "Responses");

  // Write workbook to binary array and trigger download
  const wbout: ArrayBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([wbout], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `responses_${formId}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
