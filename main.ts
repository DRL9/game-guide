import type { EmblemImbue, Prisma, Weapon } from '@prisma/client'
import fs from 'fs'
import db from './libs/db.js'

async function addEmblemImbue() {
  const content = await fs.promises.readFile('./tmp/imbue', 'utf-8')
  const lines = content.split('\n')
  let i = 0
  for (const line of lines) {
    const rows = line.split('\t')
    const record: EmblemImbue = {
      order: ++i,
      emblem: rows[0],
      imbue: rows[1],
      might: parseInt(rows[3]),
      weight: parseInt(rows[4]),
      hit: parseInt(rows[5]),
      crit: parseInt(rows[6]),
      avoid: parseInt(rows[7]),
      ddg: parseInt(rows[8])
    }
    await db.emblemImbue.upsert({
      where: {
        emblem: record.emblem
      },
      create: record,
      update: record
    })
  }
  await exportEmblemImbue('emblemImbue')
}

async function addWeapon() {
  const content = await fs.promises.readFile('./tmp/weapon', 'utf-8')
  const rows = parseCSV(content).slice(1)
  let type = ''
  let kind = ''
  let i = 0
  for (const row of rows) {
    if (row.length === 0) {
      continue
    }
    const name = row[2]
    if (!name) {
      continue
    }
    if (row[0]) {
      kind = row[0]
    }
    if (kind.includes('结合')) {
      type = 'engage'
    } else if (kind.includes('可装备')) {
      type = 'equip'
    }
    kind = kind.replace(/[（(].+/, '').trim()

    const record: Weapon = {
      order: ++i,
      kind,
      type,
      name,
      desc: row[3],
      approach: row[4],
      price: parseInt(row[5]),
      might: parseInt(row[6]),
      hit: parseInt(row[7]),
      crit: parseInt(row[8]),
      weight: parseInt(row[9]),
      avoid: parseInt(row[10]),
      ddg: parseInt(row[11]),
      eff: row[12],
      rng: parseInt(row[13]),
      level: row[14]
    }
    Object.keys(record).forEach((key) => {
      const r = record as any
      if (Number.isNaN(r[key])) {
        r[key] = null
      }
    })
    await db.weapon.upsert({
      where: {
        name_type: {
          name: record.name,
          type: record.type
        }
      },
      create: record,
      update: record
    })
  }
  await exportEmblemImbue('weapon')
}

function parseCSV(content: string, delimiter = ',') {
  const result: string[][] = [[]]
  let prevIndex = 0
  let startQuote = false
  for (let i = 0; i < content.length; i++) {
    const c = content[i]
    if (c === '"') {
      startQuote = !startQuote
    } else if (!startQuote) {
      if (c === delimiter) {
        let line = content.slice(prevIndex, i)
        if (line.startsWith('"') && line.endsWith('"')) {
          line = line.slice(1, line.length - 1)
        }
        result[result.length - 1].push(line)
        prevIndex = i + 1
      } else if (c === '\n') {
        result.push([])
        prevIndex = i + 1
      }
    }
  }
  return result
}

type ClientMethod =
  | '$connect'
  | '$disconnect'
  | '$use'
  | '$on'
  | '$transaction'
  | '$queryRawUnsafe'
  | '$queryRaw'
  | '$executeRawUnsafe'
  | '$executeRaw'
type ModelName = Exclude<keyof typeof db, ClientMethod>
type TypeFind = Prisma.EmblemImbueDelegate<undefined>

async function exportEmblemImbue(tableName: ModelName) {
  const records = await (db[tableName] as TypeFind).findMany()
  await fs.promises.writeFile('./public/game_data/' + tableName + '.json', JSON.stringify(records))
}

type TaskFn = () => Promise<void>
export async function runTask(tasks: TaskFn[]) {
  await Promise.all(tasks.map((fn) => fn()))
  console.log('success')
}

runTask([addWeapon, addEmblemImbue])
