import { createUniver, defaultTheme, LocaleType, Tools } from '@univerjs/presets'
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core'
import sheetsCoreEnUS from '@univerjs/presets/preset-sheets-core/locales/en-US'

import './style.css'
import '@univerjs/presets/lib/styles/preset-sheets-core.css'
import { RowHeaderCustomExtension } from './row-header-extension'
import { ColumnHeaderCustomExtension } from './column-header-extension'
import { MainCustomExtension } from './main-extension'

const { univerAPI } = createUniver({
  locale: LocaleType.EN_US,
  locales: {
    enUS: Tools.deepMerge(
      {},
      sheetsCoreEnUS,
    ),
  },
  theme: defaultTheme,
  presets: [
    UniverSheetsCorePreset(),
  ],
})

const unitId = 'workbook'

// create univer sheet instance
univerAPI.createUniverSheet({id:unitId,sheets:{
  'sheet-01':{
    id:'sheet-01',
    name:'Sheet01'
  }
}});

// register custom extension
univerAPI.getHooks().onRendered(() => {
  univerAPI.registerSheetRowHeaderExtension(unitId, new RowHeaderCustomExtension());
  univerAPI.registerSheetColumnHeaderExtension(unitId, new ColumnHeaderCustomExtension());
  univerAPI.registerSheetMainExtension(unitId, new MainCustomExtension());
})

