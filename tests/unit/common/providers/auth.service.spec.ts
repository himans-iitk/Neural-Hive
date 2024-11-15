import { Test, TestingModule } from '@nestjs/testing';
import { GlobalModule } from '@/modules/global.module';
import { AuthService } from '@/common/providers/auth.service';
import { UserAuthorityDto } from '@/resources/dtos/user-authority.dto';
import { EmployeeEntity } from '@/resources/entities/employee/employee.entity';
import { RoleEntity } from '@/resources/entities/employee/role.entity';
import { EmployeeRepository } from '@/resources/repositories/employee.repository';

jest.mock('@/resources/repositories/employee.repository', () => {
  return {
    EmployeeRepository: jest.fn().mockImplementation(() => {
      return {
        findOne: async () => {
          return {
            employee: <EmployeeEntity>{},
            mibunRoles: [<RoleEntity>{}],
            organizationRoles: [<RoleEntity>{}],
            employeesRoles: [<RoleEntity>{}],
          };
        },
      };
    }),
  };
});

describe('AuthService', () => {
  let repository: EmployeeRepository;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      providers: [AuthService, EmployeeRepository],
    }).compile();

    repository = module.get<EmployeeRepository>(EmployeeRepository);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return expectedData (employeesRoles)', async () => {
      const employeeNum = '2000000001';
      const findOneData = {
        employee: <EmployeeEntity>{ employee_num: employeeNum },
        mibunRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '02',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '03',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
        ],
        organizationRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '02',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '03',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
        ],
        employeesRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
          <RoleEntity>{
            adminweb_menu_type: '02',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
          <RoleEntity>{
            adminweb_menu_type: '03',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
        ],
      };
      const expectedData = [
        <UserAuthorityDto>{
          menuId: '01',
          isAvailable: true,
          isCreatable: true,
          isEditableSelfOrganization: true,
          isEditableOtherOrganization: true,
          isDeletableSelfOrganization: true,
          isDeletableOtherOrganization: true,
        },
        <UserAuthorityDto>{
          menuId: '02',
          isAvailable: true,
          isCreatable: true,
          isEditableSelfOrganization: true,
          isEditableOtherOrganization: true,
          isDeletableSelfOrganization: true,
          isDeletableOtherOrganization: true,
        },
        <UserAuthorityDto>{
          menuId: '03',
          isAvailable: true,
          isCreatable: true,
          isEditableSelfOrganization: true,
          isEditableOtherOrganization: true,
          isDeletableSelfOrganization: true,
          isDeletableOtherOrganization: true,
        },
      ];
      jest
        .spyOn(repository, 'findOne')
        .mockImplementationOnce(async () => findOneData);
      await service.validateUser(employeeNum).then(value => {
        expect(value.id).toEqual(employeeNum);
        expect(value.authorityList).toEqual(expectedData);
      });
    });

    it('should return expectedData (employeesRoles)(true、false)', async () => {
      const employeeNum = '2000000001';
      const findOneData = {
        employee: <EmployeeEntity>{ employee_num: employeeNum },
        mibunRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '02',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '03',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
        ],
        organizationRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '02',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '03',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
        ],
        employeesRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: false,
            is_deletable_self_organization: true,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '02',
            is_available: true,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '03',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
        ],
      };
      const expectedData = [
        <UserAuthorityDto>{
          menuId: '01',
          isAvailable: true,
          isCreatable: true,
          isEditableSelfOrganization: true,
          isEditableOtherOrganization: false,
          isDeletableSelfOrganization: true,
          isDeletableOtherOrganization: false,
        },
        <UserAuthorityDto>{
          menuId: '02',
          isAvailable: true,
          isCreatable: false,
          isEditableSelfOrganization: false,
          isEditableOtherOrganization: false,
          isDeletableSelfOrganization: false,
          isDeletableOtherOrganization: false,
        },
        <UserAuthorityDto>{
          menuId: '03',
          isAvailable: false,
          isCreatable: false,
          isEditableSelfOrganization: false,
          isEditableOtherOrganization: false,
          isDeletableSelfOrganization: false,
          isDeletableOtherOrganization: false,
        },
      ];
      jest
        .spyOn(repository, 'findOne')
        .mockImplementationOnce(async () => findOneData);
      await service.validateUser(employeeNum).then(value => {
        expect(value.id).toEqual(employeeNum);
        expect(value.authorityList).toEqual(expectedData);
      });
    });

    it('should return expectedData (employeesRoles is lack)', async () => {
      const employeeNum = '2000000001';
      const findOneData = {
        employee: <EmployeeEntity>{ employee_num: employeeNum },
        mibunRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '02',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
          <RoleEntity>{
            adminweb_menu_type: '03',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
        ],
        organizationRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '02',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
          <RoleEntity>{
            adminweb_menu_type: '03',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
        ],
        employeesRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
        ],
      };
      const expectedData = [
        <UserAuthorityDto>{
          menuId: '01',
          isAvailable: true,
          isCreatable: true,
          isEditableSelfOrganization: true,
          isEditableOtherOrganization: true,
          isDeletableSelfOrganization: true,
          isDeletableOtherOrganization: true,
        },
        <UserAuthorityDto>{
          menuId: '02',
          isAvailable: false,
          isCreatable: false,
          isEditableSelfOrganization: false,
          isEditableOtherOrganization: false,
          isDeletableSelfOrganization: false,
          isDeletableOtherOrganization: false,
        },
        <UserAuthorityDto>{
          menuId: '03',
          isAvailable: false,
          isCreatable: false,
          isEditableSelfOrganization: false,
          isEditableOtherOrganization: false,
          isDeletableSelfOrganization: false,
          isDeletableOtherOrganization: false,
        },
      ];
      jest
        .spyOn(repository, 'findOne')
        .mockImplementationOnce(async () => findOneData);
      await service.validateUser(employeeNum).then(value => {
        expect(value.id).toEqual(employeeNum);
        expect(value.authorityList).toEqual(expectedData);
      });
    });

    it('should return expectedData (mibunRoles: true, organizationRoles: true)', async () => {
      const employeeNum = '2000000001';
      const findOneData = {
        employee: <EmployeeEntity>{ employee_num: employeeNum },
        mibunRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
          <RoleEntity>{
            adminweb_menu_type: '02',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
          <RoleEntity>{
            adminweb_menu_type: '03',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
        ],
        organizationRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
          <RoleEntity>{
            adminweb_menu_type: '02',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
          <RoleEntity>{
            adminweb_menu_type: '03',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
        ],
        employeesRoles: [],
      };
      const expectedData = [
        <UserAuthorityDto>{
          menuId: '01',
          isAvailable: true,
          isCreatable: true,
          isEditableSelfOrganization: true,
          isEditableOtherOrganization: true,
          isDeletableSelfOrganization: true,
          isDeletableOtherOrganization: true,
        },
        <UserAuthorityDto>{
          menuId: '02',
          isAvailable: true,
          isCreatable: true,
          isEditableSelfOrganization: true,
          isEditableOtherOrganization: true,
          isDeletableSelfOrganization: true,
          isDeletableOtherOrganization: true,
        },
        <UserAuthorityDto>{
          menuId: '03',
          isAvailable: true,
          isCreatable: true,
          isEditableSelfOrganization: true,
          isEditableOtherOrganization: true,
          isDeletableSelfOrganization: true,
          isDeletableOtherOrganization: true,
        },
      ];
      jest
        .spyOn(repository, 'findOne')
        .mockImplementationOnce(async () => findOneData);
      await service.validateUser(employeeNum).then(value => {
        expect(value.id).toEqual(employeeNum);
        expect(value.authorityList).toEqual(expectedData);
      });
    });

    it('should return expectedData (mibunRoles: true or false, organizationRoles: true or false)', async () => {
      const employeeNum = '2000000001';
      const findOneData = {
        employee: <EmployeeEntity>{ employee_num: employeeNum },
        mibunRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: true,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: true,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '02',
            is_available: false,
            is_creatable: true,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: true,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '03',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: true,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: true,
          },
        ],
        organizationRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: true,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: true,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '02',
            is_available: false,
            is_creatable: true,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: true,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '03',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: true,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: true,
          },
        ],
        employeesRoles: [],
      };
      const expectedData = [
        <UserAuthorityDto>{
          menuId: '01',
          isAvailable: true,
          isCreatable: false,
          isEditableSelfOrganization: false,
          isEditableOtherOrganization: true,
          isDeletableSelfOrganization: false,
          isDeletableOtherOrganization: false,
        },
        <UserAuthorityDto>{
          menuId: '02',
          isAvailable: false,
          isCreatable: true,
          isEditableSelfOrganization: false,
          isEditableOtherOrganization: false,
          isDeletableSelfOrganization: true,
          isDeletableOtherOrganization: false,
        },
        <UserAuthorityDto>{
          menuId: '03',
          isAvailable: false,
          isCreatable: false,
          isEditableSelfOrganization: true,
          isEditableOtherOrganization: false,
          isDeletableSelfOrganization: false,
          isDeletableOtherOrganization: true,
        },
      ];
      jest
        .spyOn(repository, 'findOne')
        .mockImplementationOnce(async () => findOneData);
      await service.validateUser(employeeNum).then(value => {
        expect(value.id).toEqual(employeeNum);
        expect(value.authorityList).toEqual(expectedData);
      });
    });

    it('should return expectedData (mibunRoles: true, organizationRoles: false)', async () => {
      const employeeNum = '2000000001';
      const findOneData = {
        employee: <EmployeeEntity>{ employee_num: employeeNum },
        mibunRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
          <RoleEntity>{
            adminweb_menu_type: '02',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
          <RoleEntity>{
            adminweb_menu_type: '03',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
        ],
        organizationRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '02',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
          <RoleEntity>{
            adminweb_menu_type: '03',
            is_available: false,
            is_creatable: false,
            is_editable_self_organization: false,
            is_editable_other_organization: false,
            is_deletable_self_organization: false,
            is_deletable_other_organization: false,
          },
        ],
        employeesRoles: [],
      };
      const expectedData = [
        <UserAuthorityDto>{
          menuId: '01',
          isAvailable: false,
          isCreatable: false,
          isEditableSelfOrganization: false,
          isEditableOtherOrganization: false,
          isDeletableSelfOrganization: false,
          isDeletableOtherOrganization: false,
        },
        <UserAuthorityDto>{
          menuId: '02',
          isAvailable: false,
          isCreatable: false,
          isEditableSelfOrganization: false,
          isEditableOtherOrganization: false,
          isDeletableSelfOrganization: false,
          isDeletableOtherOrganization: false,
        },
        <UserAuthorityDto>{
          menuId: '03',
          isAvailable: false,
          isCreatable: false,
          isEditableSelfOrganization: false,
          isEditableOtherOrganization: false,
          isDeletableSelfOrganization: false,
          isDeletableOtherOrganization: false,
        },
      ];
      jest
        .spyOn(repository, 'findOne')
        .mockImplementationOnce(async () => findOneData);
      await service.validateUser(employeeNum).then(value => {
        expect(value.id).toEqual(employeeNum);
        expect(value.authorityList).toEqual(expectedData);
      });
    });

    it('should return expectedData (mibunRoles is empty, organizationRoles: true)', async () => {
      const employeeNum = '2000000001';
      const findOneData = {
        employee: <EmployeeEntity>{ employee_num: employeeNum },
        mibunRoles: [],
        organizationRoles: [
          <RoleEntity>{
            adminweb_menu_type: '01',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
          <RoleEntity>{
            adminweb_menu_type: '02',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
          <RoleEntity>{
            adminweb_menu_type: '03',
            is_available: true,
            is_creatable: true,
            is_editable_self_organization: true,
            is_editable_other_organization: true,
            is_deletable_self_organization: true,
            is_deletable_other_organization: true,
          },
        ],
        employeesRoles: [],
      };
      const expectedData = [
        <UserAuthorityDto>{
          menuId: '01',
          isAvailable: false,
          isCreatable: false,
          isEditableSelfOrganization: false,
          isEditableOtherOrganization: false,
          isDeletableSelfOrganization: false,
          isDeletableOtherOrganization: false,
        },
        <UserAuthorityDto>{
          menuId: '02',
          isAvailable: false,
          isCreatable: false,
          isEditableSelfOrganization: false,
          isEditableOtherOrganization: false,
          isDeletableSelfOrganization: false,
          isDeletableOtherOrganization: false,
        },
        <UserAuthorityDto>{
          menuId: '03',
          isAvailable: false,
          isCreatable: false,
          isEditableSelfOrganization: false,
          isEditableOtherOrganization: false,
          isDeletableSelfOrganization: false,
          isDeletableOtherOrganization: false,
        },
      ];
      jest
        .spyOn(repository, 'findOne')
        .mockImplementationOnce(async () => findOneData);
      await service.validateUser(employeeNum).then(value => {
        expect(value.id).toEqual(employeeNum);
        expect(value.authorityList).toEqual(expectedData);
      });
    });
  });
});
