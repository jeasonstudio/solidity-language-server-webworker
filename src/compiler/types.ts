export type CompilerFeatures =
  | 'legacySingleInput'
  | 'multipleInputs'
  | 'importCallback'
  | 'nativeStandardJSON';

export type LowLevelCompileFunc =
  | 'compileSingle'
  | 'compileMulti'
  | 'compileCallback'
  | 'compileStandard';

export type CompileFunc = (input: string, callback?: Function) => string;

export interface ISolc {
  compile: CompileFunc;
  compileStandard: CompileFunc;
  setupMethod: WrapperFunc;
  features: Record<CompilerFeatures, boolean>;
  lowlevel: Record<LowLevelCompileFunc, CompileFunc | null>;
  version: Function;
  semver: Function;
  license: Function;
}

export type WrapperFunc = (soljson: any) => ISolc;
