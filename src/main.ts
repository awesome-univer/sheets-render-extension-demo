import "./style.css";
import "@univerjs/design/lib/index.css";
import "@univerjs/ui/lib/index.css";
import "@univerjs/sheets-ui/lib/index.css";
import "@univerjs/sheets-formula/lib/index.css";
import "@univerjs/sheets-numfmt/lib/index.css";

import { LocaleType, Univer } from "@univerjs/core";
import { defaultTheme } from "@univerjs/design";
import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverDocsUIPlugin } from "@univerjs/docs-ui";
import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";
import { UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsNumfmtPlugin } from "@univerjs/sheets-numfmt";
import { UniverSheetsUIPlugin } from "@univerjs/sheets-ui";
import { UniverUIPlugin } from "@univerjs/ui";
import { FUniver } from '@univerjs/facade';
import { zhCN, enUS } from 'univer:locales'
import { RowHeaderCustomExtension } from "./row-header-extension";
import { ColumnHeaderCustomExtension } from "./column-header-extension";
import { MainCustomExtension } from "./main-extension";

// univer
const univer = new Univer({
  theme: defaultTheme,
  locale: LocaleType.EN_US,
  locales: {
    [LocaleType.ZH_CN]: zhCN,
    [LocaleType.EN_US]: enUS,
  },
});

// core plugins
univer.registerPlugin(UniverDocsPlugin, {
  hasScroll: false,
});
univer.registerPlugin(UniverDocsUIPlugin);
univer.registerPlugin(UniverRenderEnginePlugin);
univer.registerPlugin(UniverUIPlugin, {
  container: "app",
  header: true,
  toolbar: true,
  footer: true,
});
univer.registerPlugin(UniverSheetsPlugin);
univer.registerPlugin(UniverSheetsUIPlugin);

// sheet feature plugins
univer.registerPlugin(UniverSheetsNumfmtPlugin);
univer.registerPlugin(UniverFormulaEnginePlugin);
univer.registerPlugin(UniverSheetsFormulaPlugin);

const unitId = 'workbook'
// create univer sheet instance
univer.createUniverSheet({id:unitId});

const univerAPI = FUniver.newAPI(univer);

// register custom extension
univerAPI.getHooks().onRendered(() => {
  univerAPI.registerSheetRowHeaderExtension(unitId, new RowHeaderCustomExtension());
  univerAPI.registerSheetColumnHeaderExtension(unitId, new ColumnHeaderCustomExtension());
  univerAPI.registerSheetMainExtension(unitId, new MainCustomExtension());
})

