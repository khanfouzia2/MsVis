import { PanelPlugin } from '@grafana/data';
import { SimpleOptions, defaults } from './types';
//import { SimplePanel } from './SimplePanel';
import { SimpleEditor } from './SimpleEditor';
import { App} from './tool-frontend/src/App' 

export const plugin = new PanelPlugin<SimpleOptions>(App).setDefaults(defaults).setEditor(SimpleEditor);
