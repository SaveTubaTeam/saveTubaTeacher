import { selectAssignment } from "../redux/currentClassSlice";

const kk = {
  common: {
    teacherLogin: "Мұғалімнің кіруі",
    createAccount: "Есептік жазба жасау",
    teacher: "Мұғалім",
    email: "Электрондық пошта",
    password: "Құпия сөз",
    firstName: "Аты",
    lastName: "Тегі",
    signIn: "Кіру",
    logInWithGoogle: "Google арқылы кіру",
    otherLogin: "Басқа кіру",
    changeLanguage: "Тілді өзгерту",
    forgotPassword: "Құпия сөзді ұмытып қалдыңыз ба",
    or: "Немесе",
    createAccount: "Есептік жазба жасау",
    return: "Қайту",
    register: "Тіркелу",
    backToClassrooms: "Сыныптарға оралу",
    createAClass: "Сынып жасау",
    createClass: "Сынып жасау",
    exemplaGratia: '(мысалы, А сыныбы)',
    yourClassrooms: "Сіздің сыныптарыңыз",
    logOut: "Шығу",
    assignment: "Тапсырма",
    assignments: "Тапсырмалар",
    noAssignments: "0 Тапсырмалар...",
    grade: "Сынып",
    grades: "Сыныптар",
    showClassCode: "Сынып кодын көрсету",
    enterClassName: "Сынып атауын енгізіңіз",
    classNameDisplayText: "Бұл барлық оқушыларға көрсетілетін сынып атауы.",
    selectAGrade: "Сыныпты таңдаңыз",
    gradeLevelDisplayText: "Сынып деңгейі тапсырмалар деңгейін шектемейді. Бұл тек сәйкестендіру үшін.",
    cancel: "Бас тарту",
    submit: "Жіберу",
    dashboard: "Басқару тақтасы",
    selectAnAssignment: "Тапсырманы таңдаңыз",
    upcomingAssignment: "Алдағы тапсырма",
    pastAssignment: "Өткен тапсырмалар",
    createAssignment: "Тапсырма жасау",
    currentAssignment: "Бұл тапсырма қазір таңдалған.",
    lesson: "Сабақ",
    chapter: "тарау",
    numberOfActivities: "Әрекеттер саны",
    dateAssigned: "Тағайындалған күні",
    preview: "Алдын ала қарау",
    create: "Жасау",
    account: "Есептік жазба",
    dueDate: "Мерзімі:",
    help: "Көмек",
    contactSupport: "Қолдау қызметіне хабарласыңыз",
    yourPersonalAccount: "Сіздің жеке есептік жазбаңыз",
    displayName: "Көрсетілетін атау",
    displayNameText: "Save Tuba мобильді қосымшасында тек сіздің тегі көрсетіледі.",
    displayEmailTextOne: "Егер сіз жақында көмек сұраған болсаңыз, қолдау тобы осы электрондық пошта арқылы сізбен байланысады.",
    displayEmailTextTwo: "Сіздің электрондық пошта мекенжайыңыз студенттерге немесе қолдау тобынан басқа ешкімге көрсетілмейді.",
    settings: "Параметрлер",
    currentLanguage: "Ағымдағы тіл",
    havegoogle: "Google есептік жазбаңыз бар ма?",
    backtogooglelogin: "Тіркелудің қажеті жоқ! Google кіру бетіне қайта оралыңыз.",
  },
  error: {
    emailAlreadyInUse: "Электрондық пошта мекенжайы қолданыста.",
    googlePopupBlocked: "Google қалқымалы терезесі блокталды. Қалқымалы терезелерге рұқсат беріңіз.",
    networkRequestFailed: "Желілік сұрау орындалмады. Қайталап көріңіз немесе қолдау қызметіне хабарласыңыз.",
    invalidLogin: "Қате кіру. Қайталап көріңіз.",
    errorOccured: "Қате орын алды. Қайталап көріңіз немесе қолдау қызметіне хабарласыңыз.",
    incorrectPassword: "Қате құпия сөз",
    pleaseCreateTeacherAccount: "Жалғастыру үшін мұғалімнің есептік жазбасын жасаңыз",
    enterValidEmail: "Жарамды электрондық пошта енгізіңіз",
    doesNotExist: "жоқ",
    accountAlreadyExists: "Есептік жазба бар.",
    weakPassword: "Құпия сөз әлсіз. Құпия сөзіңіздің ұзындығы 6 таңбадан артық екеніне көз жеткізіңіз.",
    enterFirstName: "Атыңызды енгізіңіз",
    enterLastName: "Тегіңізді енгізіңіз",
    pageRouterError: "Кешіріңіз, күтпеген қате пайда болды.",
    pleaseTryAgain: "Қайталап көріңіз немесе savetuba2023@gmail.com электрондық поштаға қолдау қызметіне хабарласыңыз.",
    pageNotFound: "404 Бет табылмады",
    pageDoesNotExist: "Іздеп отырған бет жоқ.",
    oops: "Қап!",
    enterValidGrade: "Жарамды сынып енгізіңіз",
    enterClassName: "Сынып атауын енгізіңіз",
    errorCreatingClass: "Сынып жасау кезінде қате пайда болды. Қолдау қызметіне хабарласыңыз.",
  },
  success: {
    accountCreated: "Есептік жазба жасалды. Қош келдіңіз",
    resetPasswordEmailSent: "Құпия сөзді қалпына келтіру үшін электрондық пошта жіберілді",
    loggedOut: "Шықты",
    successfullyCreated: "сәтті жасалды",
  },
  loading: {
    loading: "Жүктеу...",
    sendingPasswordReset: "Құпия сөзді қалпына келтіру үшін электрондық пошта жіберілуде...",
    creatingAccount: "Есептік жазба жасалуда",
    creatingClass: "Сынып жасалуда"
  }
}

export default kk;