import { encryptData, decryptData } from './encryption';
export async function exportBackup(data: any, passphrase?: string): Promise<string> {
  const json = JSON.stringify(data);
  if (passphrase) return encryptData(data, passphrase);
  return btoa(json);
}
export async function importBackup(encoded: string, passphrase?: string): Promise<any> {
  if (passphrase) return decryptData(encoded, passphrase);
  const json = atob(encoded);
  return JSON.parse(json);
}
