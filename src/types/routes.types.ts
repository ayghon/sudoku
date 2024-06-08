export enum Routes {
  Home = 'index',
}

export type ParamList = {
  [Routes.Home]: undefined;
};

export type SearchParamList<TRoute extends Routes> = ParamList[TRoute];
