/* eslint-disable max-len */

// ロール（guardの引数で利用する）.
// ※NestJS公式（authorizationの章）にあわせてenumで定義、関連箇所もunionではなくenumで定義.
export enum Role {
  // 01：お知らせ系.
  InformationAvailable = 'informationAvailable',
  InformationCreatable = 'informationCreatable',
  InformationEditable = 'informationEditable',
  InformationDeletable = 'informationDeletable',
  // 02：BBBBB系.
  BbbbbAvailable = 'bbbbbAvailable',
  BbbbbCreatable = 'bbbbbCreatable',
  BbbbbEditable = 'bbbbbEditable',
  BbbbbDeletable = 'bbbbbDeletable',
  // 03：CCCCC系.
  CccccAvailable = 'cccccAvailable',
  CccccCreatable = 'cccccCreatable',
  CccccEditable = 'cccccEditable',
  CccccDeletable = 'cccccDeletable',
}

// コード値定義：管理Webメニュー種別.
export enum AdminwebMenuType {
  Information = '01',
  Bbbbb = '02',
  Ccccc = '03',
}

// 権限.
enum Authority {
  Available = 'Available', // 参照.
  Creatable = 'Creatable',
  Editable = 'Editable',
  Deletable = 'Deletable',
}

// 権限のプロパティ名 ※key,valueはUserAuthorityDtoの変数名にあわせる.
enum AuthorityPropertyName {
  isAvailable = 'isAvailable',
  isCreatable = 'isCreatable',
  isEditableSelfOrganization = 'isEditableSelfOrganization',
  isEditableOtherOrganization = 'isEditableOtherOrganization',
  isDeletableSelfOrganization = 'isDeletableSelfOrganization',
  isDeletableOtherOrganization = 'isDeletableOtherOrganization',
}

// 権限毎に参照すべきプロパティ名のマッピング.
export const authorityPropertyMap = new Map<Authority, AuthorityPropertyName[]>(
  [
    [Authority.Available, [AuthorityPropertyName.isAvailable]],
    [Authority.Creatable, [AuthorityPropertyName.isCreatable]],
    [
      Authority.Editable,
      [
        AuthorityPropertyName.isEditableSelfOrganization,
        AuthorityPropertyName.isEditableOtherOrganization,
      ],
    ],
    [
      Authority.Deletable,
      [
        AuthorityPropertyName.isDeletableSelfOrganization,
        AuthorityPropertyName.isDeletableOtherOrganization,
      ],
    ],
  ],
);

interface IAdminwebAuthority {
  menuId: AdminwebMenuType;
  authority: Authority;
}

// ロール毎に参照すべきメニューと権限のマッピング.
export const roleAdminwebAuthorityMap = new Map<Role, IAdminwebAuthority>([
  // 01：お知らせ系.
  [
    Role.InformationAvailable,
    { menuId: AdminwebMenuType.Information, authority: Authority.Available },
  ],
  [
    Role.InformationCreatable,
    { menuId: AdminwebMenuType.Information, authority: Authority.Creatable },
  ],
  [
    Role.InformationEditable,
    { menuId: AdminwebMenuType.Information, authority: Authority.Editable },
  ],
  [
    Role.InformationDeletable,
    { menuId: AdminwebMenuType.Information, authority: Authority.Deletable },
  ],
  // 02：BBBBB系.
  [
    Role.BbbbbAvailable,
    { menuId: AdminwebMenuType.Bbbbb, authority: Authority.Available },
  ],
  [
    Role.BbbbbCreatable,
    { menuId: AdminwebMenuType.Bbbbb, authority: Authority.Creatable },
  ],
  [
    Role.BbbbbEditable,
    { menuId: AdminwebMenuType.Bbbbb, authority: Authority.Editable },
  ],
  [
    Role.BbbbbDeletable,
    { menuId: AdminwebMenuType.Bbbbb, authority: Authority.Deletable },
  ],
  // 03：CCCCC系.
  [
    Role.CccccAvailable,
    { menuId: AdminwebMenuType.Ccccc, authority: Authority.Available },
  ],
  [
    Role.CccccCreatable,
    { menuId: AdminwebMenuType.Ccccc, authority: Authority.Creatable },
  ],
  [
    Role.CccccEditable,
    { menuId: AdminwebMenuType.Ccccc, authority: Authority.Editable },
  ],
  [
    Role.CccccDeletable,
    { menuId: AdminwebMenuType.Ccccc, authority: Authority.Deletable },
  ],
]);
