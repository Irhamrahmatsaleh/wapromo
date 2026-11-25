import test from "node:test";
import assert from "node:assert/strict";
import {
  isoToFlag,
  ALL_COUNTRIES,
  getDefaultCountryForLocale,
  normalizeWhatsAppWithDialCode,
  detectCountryFromInternationalDigits,
  sanitizePhoneInput,
  stripSelectedDialCode,
  normalizeWhatsAppNumber,
  isValidWhatsAppNumber,
  toWhatsAppJid,
} from "./phone";

test("isoToFlag generates accurate Unicode flag emojis mathematically", () => {
  assert.strictEqual(isoToFlag("ID"), "🇮🇩");
  assert.strictEqual(isoToFlag("BR"), "🇧🇷");
  assert.strictEqual(isoToFlag("SA"), "🇸🇦");
  assert.strictEqual(isoToFlag("ES"), "🇪🇸");
  assert.strictEqual(isoToFlag("US"), "🇺🇸");
  assert.strictEqual(isoToFlag(""), "🌐");
  assert.strictEqual(isoToFlag("XYZ"), "🌐");
});

test("ALL_COUNTRIES covers 242 countries and territories", () => {
  assert.strictEqual(ALL_COUNTRIES.length, 242);
  const ind = ALL_COUNTRIES.find((c) => c.iso === "ID");
  assert.ok(ind);
  assert.strictEqual(ind?.dial, "62");
  assert.strictEqual(ind?.flag, "🇮🇩");
});

test("getDefaultCountryForLocale maps 5 golden languages to primary countries", () => {
  assert.strictEqual(getDefaultCountryForLocale("id").iso, "ID");
  assert.strictEqual(getDefaultCountryForLocale("pt").iso, "BR");
  assert.strictEqual(getDefaultCountryForLocale("ar").iso, "SA");
  assert.strictEqual(getDefaultCountryForLocale("es").iso, "ES");
  assert.strictEqual(getDefaultCountryForLocale("en").iso, "US");
});

test("normalizeWhatsAppWithDialCode strips non-digits, trunk prefix 0, and international 00", () => {
  // Indonesia (dial 62)
  assert.strictEqual(normalizeWhatsAppWithDialCode("081234567890", "62"), "6281234567890");
  assert.strictEqual(normalizeWhatsAppWithDialCode("812-3456-7890", "62"), "6281234567890");
  assert.strictEqual(normalizeWhatsAppWithDialCode("+62 812 3456 7890", "62"), "6281234567890");
  assert.strictEqual(normalizeWhatsAppWithDialCode("006281234567890", "62"), "6281234567890");

  // Saudi Arabia (dial 966)
  assert.strictEqual(normalizeWhatsAppWithDialCode("0501234567", "966"), "966501234567");

  // Brazil (dial 55)
  assert.strictEqual(normalizeWhatsAppWithDialCode("11912345678", "55"), "5511912345678");

  // Empty or non-digit input
  assert.strictEqual(normalizeWhatsAppWithDialCode("", "62"), "");
  assert.strictEqual(normalizeWhatsAppWithDialCode("++--  ()", "62"), "");
});

test("detectCountryFromInternationalDigits recognizes countries by dial code prefix", () => {
  const matchId = detectCountryFromInternationalDigits("6281234567890");
  assert.ok(matchId);
  assert.strictEqual(matchId?.country.iso, "ID");
  assert.strictEqual(matchId?.national, "81234567890");

  const matchBr = detectCountryFromInternationalDigits("5511912345678");
  assert.ok(matchBr);
  assert.strictEqual(matchBr?.country.iso, "BR");
  assert.strictEqual(matchBr?.national, "11912345678");

  const matchUs = detectCountryFromInternationalDigits("15551234567");
  assert.ok(matchUs);
  assert.strictEqual(matchUs?.country.iso, "US");
  assert.strictEqual(matchUs?.national, "5551234567");
});

test("sanitizePhoneInput handles manual typing and paste/autofill cleanly", () => {
  const defaultCountry = getDefaultCountryForLocale("id");

  // Manual typing ignores non-digits
  const typed = sanitizePhoneInput("8123", "812", defaultCountry);
  assert.strictEqual(typed.value, "8123");
  assert.strictEqual(typed.country.iso, "ID");

  // Typing '+' is ignored
  const typedPlus = sanitizePhoneInput("+", "", defaultCountry);
  assert.strictEqual(typedPlus.value, "");

  // Pasting full international number with +62 switches/keeps country and extracts national digits
  const pasted = sanitizePhoneInput("+62 812-3456-7890", "", defaultCountry);
  assert.strictEqual(pasted.value, "81234567890");
  assert.strictEqual(pasted.country.iso, "ID");

  // Pasting a Brazilian number switches country to Brazil
  const pastedBr = sanitizePhoneInput("+55 11 98765-4321", "", defaultCountry);
  assert.strictEqual(pastedBr.value, "11987654321");
  assert.strictEqual(pastedBr.country.iso, "BR");
});

test("stripSelectedDialCode removes redundant selected dial code", () => {
  assert.strictEqual(stripSelectedDialCode("6281234567890", "62"), "81234567890");
  // Does not strip if remaining digits are too short
  assert.strictEqual(stripSelectedDialCode("62123", "62"), "62123");
  // Does not touch numbers that don't start with the dial code
  assert.strictEqual(stripSelectedDialCode("81234567890", "62"), "81234567890");
});

test("normalizeWhatsAppNumber respects locale defaults", () => {
  assert.strictEqual(normalizeWhatsAppNumber("081234567890", "id"), "6281234567890");
  assert.strictEqual(normalizeWhatsAppNumber("0501234567", "ar"), "966501234567");
  assert.strictEqual(normalizeWhatsAppNumber("11912345678", "pt"), "5511912345678");
});

test("isValidWhatsAppNumber complies with ITU E.164 standard (8 to 15 digits)", () => {
  assert.strictEqual(isValidWhatsAppNumber("6281234567890"), true);
  assert.strictEqual(isValidWhatsAppNumber("15551234567"), true);
  assert.strictEqual(isValidWhatsAppNumber("5511912345678"), true);

  // Invalid: too short
  assert.strictEqual(isValidWhatsAppNumber("628123"), false);
  // Invalid: too long (> 15 digits)
  assert.strictEqual(isValidWhatsAppNumber("628123456789012345"), false);
  // Invalid: starts with 0
  assert.strictEqual(isValidWhatsAppNumber("081234567890"), false);
  // Invalid: non-digits
  assert.strictEqual(isValidWhatsAppNumber("+6281234567890"), false);
});

test("toWhatsAppJid formats into standard @s.whatsapp.net", () => {
  assert.strictEqual(toWhatsAppJid("081234567890", "id"), "6281234567890@s.whatsapp.net");
  assert.strictEqual(toWhatsAppJid("invalid-phone", "id"), null);
});
