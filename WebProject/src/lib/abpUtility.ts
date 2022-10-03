import AppConsts from './appconst';

declare const abp: any;

export function L(key: string, sourceName?: string): string {
  const localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;
  if (sourceName) {
    return abp.localization.localize(key, sourceName);
  }
  return abp.localization.localize(key, localizationSourceName);
}

export function isGranted(permissionName: string): boolean {
  if (abp.auth.getRoles().indexOf(permissionName) >= 0) {
    return true;
  }
  return false;
}
