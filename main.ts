import type { EmblemImbue, Prisma } from '@prisma/client'
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
      damage: parseInt(rows[3]),
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

runTask([addEmblemImbue])
