import axios from "axios";

const GVIZ_PREFIX = "google.visualization.Query.setResponse(";

export const SHEET_ID =
  process.env.MOCK_EXAM_SHEET_ID ||
  process.env.REACT_APP_GOOGLE_SHEET_ID ||
  "1y-SLaCkJUKYGWeF_Ic_nWjieK458qrhYWa8s83noWFI";
export const SHEET_NAME = process.env.MOCK_EXAM_SHEET_NAME || "Lead";
export const SHEET_RANGE = process.env.MOCK_EXAM_SHEET_RANGE || "";
export const REGISTRATION_LINK = process.env.MOCK_EXAM_REGISTRATION_LINK || "";

const DATE_KEYS = ["exam_date", "examdate", "mock_exam_sana", "sana", "date"];
const LINK_KEYS = [
  "registration_link",
  "registrationlink",
  "link",
  "register_link",
  "registration url",
];

export async function fetchMockExamData() {
  if (!SHEET_ID || SHEET_ID === "PASTE_PUBLIC_SHEET_ID") {
    return createEmptyResult("Google Sheets ID sozlanmagan.");
  }

  try {
    const params = new URLSearchParams({
      tqx: "out:json",
      sheet: SHEET_NAME,
    });

    if (SHEET_RANGE) {
      params.set("range", SHEET_RANGE);
    }

    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?${params.toString()}`;
    const response = await axios.get(url, {
      timeout: 10000,
      responseType: "text",
    });

    const payload = parseGvizResponse(response.data);
    const result = extractMockExam(payload);

    return {
      ...result,
      sourceUrl: url,
    };
  } catch (error) {
    console.error("[mock-exam:sheets] Google Sheets ma'lumotini olishda xatolik:", error.message);

    return createEmptyResult("Google Sheets ma'lumotini olishda xatolik yuz berdi.");
  }
}

function createEmptyResult(reason) {
  return {
    examDate: "",
    examDateDisplay: "",
    examDateValue: null,
    registrationLink: "",
    examKey: "",
    hasExam: false,
    reason,
  };
}

function parseGvizResponse(rawText) {
  const normalizedText = rawText
    .trim()
    .replace(/^\/\*.*?\*\//s, "")
    .trim();

  if (!normalizedText.startsWith(GVIZ_PREFIX) || !normalizedText.endsWith(");")) {
    throw new Error("GViz javobi kutilgan formatda emas.");
  }

  const jsonText = normalizedText.slice(GVIZ_PREFIX.length, -2);
  return JSON.parse(jsonText);
}

function extractMockExam(payload) {
  const table = payload?.table;
  const rows = table?.rows || [];
  const cols = table?.cols || [];

  if (!rows.length) {
    return createEmptyResult("Sheet bo'sh.");
  }

  const examDateFromTopRow = extractFixedCellDate(rows, 0, 1);
  if (examDateFromTopRow) {
    return {
      examDate: examDateFromTopRow.isoDate,
      examDateDisplay: examDateFromTopRow.display,
      examDateValue: examDateFromTopRow.date,
      registrationLink: REGISTRATION_LINK,
      examKey: examDateFromTopRow.isoDate,
      hasExam: true,
      reason: "",
    };
  }

  const headers = cols.map((col, index) => normalizeKey(col?.label || col?.id || `col_${index + 1}`));
  const mappedRows = rows
    .map((row) => mapRow(row, headers))
    .filter((row) => Object.values(row).some((cell) => cleanString(cell?.formatted || cell?.raw)));

  if (!mappedRows.length) {
    return createEmptyResult("Sheetda foydali ma'lumot topilmadi.");
  }

  const selectedRow = mappedRows.find((row) => findFirstMatchingValue(row, DATE_KEYS)) || mappedRows[0];
  const examDateCell = findFirstMatchingValue(selectedRow, DATE_KEYS) || Object.values(selectedRow)[0];
  const registrationLinkCell =
    findFirstMatchingValue(selectedRow, LINK_KEYS) ||
    Object.values(selectedRow).find((value, index) => index > 0 && typeof value?.raw === "string" && value.raw.includes("http")) ||
    Object.values(selectedRow)[1];

  const parsedDate = parseSheetDate(examDateCell);
  const registrationLink = cleanString(registrationLinkCell?.formatted || registrationLinkCell?.raw);

  if (!parsedDate) {
    return createEmptyResult("exam_date topilmadi yoki noto'g'ri formatda.");
  }

  return {
    examDate: parsedDate.isoDate,
    examDateDisplay: parsedDate.display,
    examDateValue: parsedDate.date,
    registrationLink,
    examKey: parsedDate.isoDate,
    hasExam: true,
    reason: "",
  };
}

function mapRow(row, headers) {
  return headers.reduce((accumulator, header, index) => {
    const cell = row?.c?.[index];
    accumulator[header] = {
      raw: cell?.v ?? "",
      formatted: cell?.f ?? "",
    };
    return accumulator;
  }, {});
}

function extractFixedCellDate(rows, rowIndex, columnIndex) {
  const cell = rows?.[rowIndex]?.c?.[columnIndex];

  if (!cell) {
    return null;
  }

  return parseSheetDate({
    raw: cell.v,
    formatted: cleanString(cell.f || cell.v),
  });
}

function findFirstMatchingValue(row, keys) {
  for (const [key, value] of Object.entries(row)) {
    if (keys.includes(key)) {
      return value;
    }
  }

  return null;
}

function normalizeKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function cleanString(value) {
  return String(value || "").trim();
}

function parseSheetDate(cell) {
  const rawValue = cell?.raw;
  const formattedValue = cleanString(cell?.formatted);

  if (!rawValue && !formattedValue) {
    return null;
  }

  if (rawValue instanceof Date && !Number.isNaN(rawValue.getTime())) {
    return buildParsedDate(rawValue, formattedValue);
  }

  if (typeof rawValue === "string") {
    const parsedFromRaw = parseDateLikeString(rawValue);
    if (parsedFromRaw) {
      return buildParsedDate(parsedFromRaw, formattedValue || rawValue);
    }
  }

  if (typeof rawValue === "number") {
    const excelEpochDate = new Date(Math.round((rawValue - 25569) * 86400 * 1000));
    if (!Number.isNaN(excelEpochDate.getTime())) {
      return buildParsedDate(excelEpochDate, formattedValue);
    }
  }

  const parsedFromFormatted = parseDateLikeString(formattedValue);
  if (parsedFromFormatted) {
    return buildParsedDate(parsedFromFormatted, formattedValue);
  }

  return null;
}

function parseDateLikeString(value) {
  const normalizedValue = cleanString(value);

  if (!normalizedValue) {
    return null;
  }

  const gvizMatch = normalizedValue.match(/Date\((\d+),(\d+),(\d+)/);
  if (gvizMatch) {
    const [, year, monthIndex, day] = gvizMatch;
    const gvizDate = new Date(Number(year), Number(monthIndex), Number(day));
    return Number.isNaN(gvizDate.getTime()) ? null : gvizDate;
  }

  const isoMatch = normalizedValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    const isoDate = new Date(Number(year), Number(month) - 1, Number(day));
    return Number.isNaN(isoDate.getTime()) ? null : isoDate;
  }

  const dottedMatch = normalizedValue.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
  if (dottedMatch) {
    const [, day, month, year] = dottedMatch;
    const localDate = new Date(Number(year), Number(month) - 1, Number(day));
    return Number.isNaN(localDate.getTime()) ? null : localDate;
  }

  const uzbekLabeledMatch = normalizedValue.match(/^(\d{4})-yil\s+(\d{1,2})-([A-Za-z]+)$/i);
  if (uzbekLabeledMatch) {
    const [, year, day, monthLabel] = uzbekLabeledMatch;
    const monthIndex = getMonthIndex(monthLabel);

    if (monthIndex >= 0) {
      const labeledDate = new Date(Number(year), monthIndex, Number(day));
      return Number.isNaN(labeledDate.getTime()) ? null : labeledDate;
    }
  }

  const parsedDate = new Date(normalizedValue);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function getMonthIndex(monthLabel) {
  const normalizedMonth = cleanString(monthLabel).toLowerCase();
  const months = {
    january: 0,
    jan: 0,
    february: 1,
    feb: 1,
    march: 2,
    mar: 2,
    april: 3,
    apr: 3,
    may: 4,
    june: 5,
    jun: 5,
    july: 6,
    jul: 6,
    august: 7,
    aug: 7,
    september: 8,
    sept: 8,
    sep: 8,
    october: 9,
    oct: 9,
    november: 10,
    nov: 10,
    december: 11,
    dec: 11,
  };

  return months[normalizedMonth] ?? -1;
}

function buildParsedDate(date, displayCandidate) {
  const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  return {
    date: localDate,
    isoDate: formatIsoDate(localDate),
    display: cleanString(displayCandidate) || formatUzbekDate(localDate),
  };
}

function formatIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatUzbekDate(date) {
  const months = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentabr",
    "oktabr",
    "noyabr",
    "dekabr",
  ];

  return `${date.getDate()}-${months[date.getMonth()]} ${date.getFullYear()}`;
}
