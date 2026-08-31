import { openDB, IDBPDatabase } from 'idb';
import { HealthEntry, Transaction, HabitEntry, JournalEntry, Goal, WidgetConfig, User } from '@/types';

let db: IDBPDatabase | null = null;

export async function getDB() {
  if (db) return db;
  db = await openDB('AURA', 1, {
    upgrade(d) {
      if (!d.objectStoreNames.contains('health')) {
        const s = d.createObjectStore('health', { keyPath: 'date' });
        s.createIndex('date', 'date');
      }
      if (!d.objectStoreNames.contains('transactions')) {
        const s = d.createObjectStore('transactions', { keyPath: 'id' });
        s.createIndex('date', 'date');
        s.createIndex('category', 'category');
      }
      if (!d.objectStoreNames.contains('habits')) {
        const s = d.createObjectStore('habits', { keyPath: ['habitId', 'date'] });
        s.createIndex('date', 'date');
        s.createIndex('habitId', 'habitId');
      }
      if (!d.objectStoreNames.contains('journal')) {
        const s = d.createObjectStore('journal', { keyPath: 'id' });
        s.createIndex('date', 'date');
      }
      if (!d.objectStoreNames.contains('goals')) {
        d.createObjectStore('goals', { keyPath: 'id' });
      }
      if (!d.objectStoreNames.contains('widgets')) {
        d.createObjectStore('widgets', { keyPath: 'id' });
      }
      if (!d.objectStoreNames.contains('user')) {
        d.createObjectStore('user', {});
      }
    },
  });
  return db;
}

export async function saveHealth(entries: HealthEntry[]) {
  const db = await getDB();
  const tx = db.transaction('health', 'readwrite');
  await tx.objectStore('health').clear();
  for (const e of entries) await tx.objectStore('health').add(e);
  await tx.done;
}

export async function loadHealth(): Promise<HealthEntry[]> {
  const db = await getDB();
  return db.getAll('health');
}

export async function saveTransactions(txs: Transaction[]) {
  const db = await getDB();
  const tx = db.transaction('transactions', 'readwrite');
  await tx.objectStore('transactions').clear();
  for (const t of txs) await tx.objectStore('transactions').add(t);
  await tx.done;
}

export async function loadTransactions(): Promise<Transaction[]> {
  const db = await getDB();
  return db.getAll('transactions');
}

export async function saveHabits(entries: HabitEntry[]) {
  const db = await getDB();
  const tx = db.transaction('habits', 'readwrite');
  await tx.objectStore('habits').clear();
  for (const h of entries) await tx.objectStore('habits').add(h);
  await tx.done;
}

export async function loadHabits(): Promise<HabitEntry[]> {
  const db = await getDB();
  return db.getAll('habits');
}

export async function saveJournal(entries: JournalEntry[]) {
  const db = await getDB();
  const tx = db.transaction('journal', 'readwrite');
  await tx.objectStore('journal').clear();
  for (const e of entries) await tx.objectStore('journal').add(e);
  await tx.done;
}

export async function loadJournal(): Promise<JournalEntry[]> {
  const db = await getDB();
  return db.getAll('journal');
}

export async function saveGoals(goals: Goal[]) {
  const db = await getDB();
  const tx = db.transaction('goals', 'readwrite');
  await tx.objectStore('goals').clear();
  for (const g of goals) await tx.objectStore('goals').add(g);
  await tx.done;
}

export async function loadGoals(): Promise<Goal[]> {
  const db = await getDB();
  return db.getAll('goals');
}

export async function saveWidgets(widgets: WidgetConfig[]) {
  const db = await getDB();
  const tx = db.transaction('widgets', 'readwrite');
  await tx.objectStore('widgets').clear();
  for (const w of widgets) await tx.objectStore('widgets').add(w);
  await tx.done;
}

export async function loadWidgets(): Promise<WidgetConfig[]> {
  const db = await getDB();
  return db.getAll('widgets');
}
