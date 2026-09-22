import { test } from "node:test";
import assert from "node:assert/strict";
import { buildWhatsAppHref, formatIndianPhone, getContactActions } from "../src/lib/contact";

const baseSettings = {
  phone: null as string | null,
  whatsapp: null as string | null,
  email: null as string | null,
  googleMapsUrl: null as string | null,
};

test("no contact actions when nothing is configured", () => {
  assert.deepEqual(getContactActions(baseSettings), []);
});

test("no contact actions for a null settings row", () => {
  assert.deepEqual(getContactActions(null), []);
});

test("only phone appears when only phone is configured", () => {
  const actions = getContactActions({ ...baseSettings, phone: "+91 98765 43210" });
  assert.equal(actions.length, 1);
  assert.equal(actions[0].kind, "phone");
  assert.equal(actions[0].href, "tel:+919876543210");
});

test("WhatsApp link strips non-digits and has no '+' (wa.me expects raw digits)", () => {
  const actions = getContactActions({ ...baseSettings, whatsapp: "+91 98765-43210" });
  assert.equal(actions[0].href, "https://wa.me/919876543210");
});

test("all four actions appear when everything is configured, in a stable order", () => {
  const actions = getContactActions({
    phone: "9876543210",
    whatsapp: "919876543210",
    email: "hello@kapiladairyfarm.com",
    googleMapsUrl: "https://maps.google.com/?q=Kapila+Dairy+Farm",
  });
  assert.deepEqual(actions.map((a) => a.kind), ["phone", "whatsapp", "email", "maps"]);
});

test("removing a field removes only that action", () => {
  const withPhone = getContactActions({ ...baseSettings, phone: "9876543210", email: "a@b.com" });
  assert.deepEqual(withPhone.map((a) => a.kind), ["phone", "email"]);

  const withoutPhone = getContactActions({ ...baseSettings, email: "a@b.com" });
  assert.deepEqual(withoutPhone.map((a) => a.kind), ["email"]);
});

test("formatIndianPhone formats 12-digit (with 91) and 10-digit numbers the same way", () => {
  assert.equal(formatIndianPhone("919909680284"), "+91 99096 80284");
  assert.equal(formatIndianPhone("+91 99096-80284"), "+91 99096 80284");
  assert.equal(formatIndianPhone("9909680284"), "+91 99096 80284");
});

test("formatIndianPhone leaves numbers it doesn't recognise untouched", () => {
  assert.equal(formatIndianPhone("0261 2345678"), "0261 2345678");
});

test("buildWhatsAppHref URL-encodes the pre-filled message", () => {
  assert.equal(buildWhatsAppHref("+91 99096 80284"), "https://wa.me/919909680284");
  assert.equal(
    buildWhatsAppHref("919909680284", "Order — 5 KG & more?"),
    "https://wa.me/919909680284?text=Order%20%E2%80%94%205%20KG%20%26%20more%3F"
  );
});
