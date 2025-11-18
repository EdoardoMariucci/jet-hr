export function getValidatedRal(inputId: string = "ral"): number | null {
  const input = document.getElementById(inputId) as HTMLInputElement | null;
  const raw = input?.value?.trim() ?? "";
  const normalized = raw.replace(",", ".");
  const value = Number(normalized);

  if (!raw || Number.isNaN(value) || value <= 0) {
    alert("Inserisci un numero valido maggiore di 0");
    input?.focus();
    return null;
  }

  return value;
}
