const EXAM_DATE_SHEET_ID = "1y-SLaCkJUKYGWeF_Ic_nWjieK458qrhYWa8s83noWFI";
const EXAM_DATE_SHEET_NAME = "Lead";
const GVIZ_PREFIX = "google.visualization.Query.setResponse(";

export async function fetchMockExamData() {
  if (!EXAM_DATE_SHEET_ID || EXAM_DATE_SHEET_ID === "PASTE_PUBLIC_SHEET_ID") {
    return createEmptyResult("Google Sheets ID sozlanmagan.");
  }

  const params = new URLSearchParams({
    tqx: "out:json",
    sheet: EXAM_DATE_SHEET_NAME,
    range: "B1",
  });

  const url = `https://docs.google.com/spreadsheets/d/${EXAM_DATE_SHEET_ID}/gviz/tq?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`GViz request failed with status ${response.status}`);
  }

  const payload = parseGvizResponse(await response.text());
  return extractB1Date(payload);
}

function createEmptyResult(reason) {
  return {
    hasExam: false,
    examDate: "",
    examDateDisplay: "",
    registrationLink: "",
    reason,
  };
}

function parseGvizResponse(rawText) {
  const normalizedText = rawText.trim().replace(/^\/\*.*?\*\/\s*/s, "");

  if (!normalizedText.startsWith(GVIZ_PREFIX) || !normalizedText.endsWith(");")) {
    throw new Error("GViz javobi kutilgan formatda emas.");
  }

  return JSON.parse(normalizedText.slice(GVIZ_PREFIX.length, -2));
}

function extractB1Date(payload) {
  const cell = payload?.table?.rows?.[0]?.c?.[0];

  if (!cell || (!cell.v && !cell.f)) {
    return createEmptyResult("B1 katagi bo'sh.");
  }

  const parsedDate = parseSheetDate({
    raw: cell.v,
    formatted: cleanString(cell.f || cell.v),
  });

  if (!parsedDate) {
    return createEmptyResult("B1 katakdagi sana noto'g'ri formatda.");
  }

  return {
    hasExam: true,
    examDate: parsedDate.isoDate,
    examDateDisplay: parsedDate.display,
    registrationLink: "",
    reason: "",
  };
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

  if (typeof rawValue === "string") {
    const parsedFromRaw = parseDateLikeString(rawValue);
    if (parsedFromRaw) {
      return buildParsedDate(parsedFromRaw, formattedValue || formatUzbekDate(parsedFromRaw));
    }
  }

  if (typeof rawValue === "number") {
    const excelEpochDate = new Date(Math.round((rawValue - 25569) * 86400 * 1000));
    if (!Number.isNaN(excelEpochDate.getTime())) {
      return buildParsedDate(excelEpochDate, formattedValue || formatUzbekDate(excelEpochDate));
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

  return `${date.getFullYear()}-yil ${date.getDate()}-${months[date.getMonth()]}da`;
}
