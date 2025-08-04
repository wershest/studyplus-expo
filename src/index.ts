// Reexport the native module. On web, it will be resolved to StudyplusExpoModule.web.ts
// and on native platforms to StudyplusExpoModule.ts
export { default } from './StudyplusExpoModule';
export { default as StudyplusExpoView } from './StudyplusExpoView';
export * from  './StudyplusExpo.types';
