import { RouterEvent } from '@angular/router';
import { RouteInfo } from './sidebar.metadata';
import { Role } from 'src/app/core/models/role';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'MENUITEMS.MAIN.TEXT',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    role: ['All'],
    submenu: [],
  },

  //#region //!Admin and Staff Modules

  //#region //? DASHBOARD
  {
    path: '/admin/dashboard/main',
    title: 'MENUITEMS.DASHBOARD.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'space_dashboard',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [Role.Admin , Role.Staff,Role.Teacher , Role.Student],
    submenu: [
      // {
      //   path: '/admin/dashboard/main',
      //   title: 'MENUITEMS.DASHBOARD.LIST.DASHBOARD1',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   role: [''],
      //   submenu: [],
      // },
    ],
  },
//#endregion

  //#region //?Class
     {
    path: '',
    title: 'MENUITEMS.CLASSROOMS.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'school',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [Role.Admin],
    submenu: [
      {
        path: '/admin/classrooms/all-classrooms',
        title: 'MENUITEMS.CLASSROOMS.LIST.ALL-CLASSROOMS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/classrooms/add-classroom',
        title: 'MENUITEMS.CLASSROOMS.LIST.ADD-CLASSROOM',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  //#endregion

    //#region //?Branch
     {
    path: '',
    title: 'MENUITEMS.BRANCHES.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'business',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [Role.Admin],
    submenu: [
      {
        path: '/admin/branches/all-branches',
        title: 'MENUITEMS.BRANCHES.LIST.ALL-BRANCHES',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/branches/add-branch',
        title: 'MENUITEMS.BRANCHES.LIST.ADD-BRANCH',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  //#endregion

  //#region //?Staff
     {
    path: '',
    title: 'MENUITEMS.STAFFES.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'person_pin',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [Role.Admin],
    submenu: [
      {
        path: '/admin/staff/all-staff',
        title: 'MENUITEMS.STAFFES.LIST.ALL-STAFFES',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/staff/add-staff',
        title: 'MENUITEMS.STAFFES.LIST.ADD-STAFF',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  //#endregion

  //#region //?teacher
     {
    path: '',
    title: 'MENUITEMS.TEACHERS.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'people_alt',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [Role.Admin , Role.Staff],
    submenu: [
      {
        path: '/admin/teachers/all-teachers',
        title: 'MENUITEMS.TEACHERS.LIST.ALL-TEACHERS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/teachers/add-teacher',
        title: 'MENUITEMS.TEACHERS.LIST.ADD-TEACHER',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },

  //#endregion

  //#region  //?student
  {
    path: '',
    title: 'MENUITEMS.STUDENTS.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'face',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [Role.Admin, Role.Staff],
    submenu: [
      {
        path: '/admin/students/all-students',
        title: 'MENUITEMS.STUDENTS.LIST.ALL-STUDENTS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/students/add-student',
        title: 'MENUITEMS.STUDENTS.LIST.ADD-STUDENT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  //#endregion

  //#region  //?courses
  {
    path: '',
    title: 'MENUITEMS.COURSES.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'book',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [Role.Admin , Role.Staff],
    submenu: [
      {
        path: '/admin/courses/all-courses',
        title: 'MENUITEMS.COURSES.LIST.ALL-COURSES',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/courses/add-course',
        title: 'MENUITEMS.COURSES.LIST.ADD-COURSE',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  //#endregion

  //#region  //?announcements
  {
    path: '',
    title: 'MENUITEMS.ANNOUNCEMENT.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'announcement',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [Role.Admin , Role.Staff],
    submenu: [
      {
        path: '/admin/announcement/all-announcements',
        title: 'MENUITEMS.ANNOUNCEMENT.LIST.ALL-ANNOUNCEMENT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/announcement/add-announcement',
        title: 'MENUITEMS.ANNOUNCEMENT.LIST.ADD-ANNOUNCEMENT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  //#endregion

//#endregion

  //#region //!Teacher Modules
  // {
  //   path: '/teacher/dashboard',
  //   title: 'MENUITEMS.TEACHER.LIST.DASHBOARD',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'space_dashboard',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: [Role.Teacher],
  //   submenu: [],
  // },
  {
    path: '/teacher/lectures',
    title: 'MENUITEMS.TEACHER.LIST.LECTURES',
    iconType: 'material-icons-two-tone',
    icon: 'menu_book',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [Role.Teacher],
    submenu: [],
  },
  //#endregion

  //#region //!Student Modules

  // {
  //   path: '/student/dashboard',
  //   title: 'MENUITEMS.STUDENT.LIST.DASHBOARD',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'space_dashboard',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: [Role.Student],
  //   submenu: [],
  // },
  {
    path: '/student/lectures',
    title: 'MENUITEMS.STUDENT.LIST.LECTURES',
    iconType: 'material-icons-two-tone',
    icon: 'menu_book',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [Role.Student],
    submenu: [],
  },
//#endregion


    //!xx multi item DASHBOARD
  {
    path: '',
    title: 'MENUITEMS.DASHBOARD.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'space_dashboard',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [
      {
        path: '/admin/dashboard/main',
        title: 'MENUITEMS.DASHBOARD.LIST.DASHBOARD1',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/dashboard/dashboard2',
        title: 'MENUITEMS.DASHBOARD.LIST.DASHBOARD2',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/dashboard/teacher-dashboard',
        title: 'MENUITEMS.DASHBOARD.LIST.TEACHER-DASHBOARD',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: '',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/dashboard/student-dashboard',
        title: 'MENUITEMS.DASHBOARD.LIST.STUDENT-DASHBOARD',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: '',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
];
