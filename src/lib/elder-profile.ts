export const ELDER_NAME_STORAGE_KEY = "familia.elder.name";
export const ELDER_PHONE_STORAGE_KEY = "familia.elder.phone";
export const ELDER_PIN_STORAGE_KEY = "familia.elder.pin";
export const ELDER_PHONE_PREFIX_STORAGE_KEY = "familia.elder.phonePrefix";

export const normalizePhone = (value: string) => value.replace(/\s/g, "");

export const buildStoredPhone = (countryPrefix: string, phone: string) =>
  `${countryPrefix}${normalizePhone(phone)}`;

type ElderProfileInput = {
  name: string;
  countryPrefix: string;
  phone: string;
  pin: string;
};

export const storeElderProfile = ({ name, countryPrefix, phone, pin }: ElderProfileInput) => {
  localStorage.setItem(ELDER_NAME_STORAGE_KEY, name.trim());
  localStorage.setItem(ELDER_PHONE_PREFIX_STORAGE_KEY, countryPrefix);
  localStorage.setItem(ELDER_PHONE_STORAGE_KEY, buildStoredPhone(countryPrefix, phone));
  localStorage.setItem(ELDER_PIN_STORAGE_KEY, pin);
};

export const getStoredElderName = () => localStorage.getItem(ELDER_NAME_STORAGE_KEY);

export const getStoredElderCredentials = () => {
  const storedPhone = localStorage.getItem(ELDER_PHONE_STORAGE_KEY);
  const storedPin = localStorage.getItem(ELDER_PIN_STORAGE_KEY);

  if (!storedPhone || !storedPin) return null;

  return { phone: storedPhone, pin: storedPin };
};
