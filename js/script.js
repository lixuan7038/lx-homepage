let currentLang = 'zh';
let isLightMode = false;
let currentStyle = 'purple';

function detectTimeMode() {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
}

function applyTimeMode() {
    isLightMode = detectTimeMode();
    
    if (isLightMode) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
    
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.textContent = isLightMode ? '🌙' : '☀️';
    }
}

function detectLanguageByIP() {
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang !== null) {
        currentLang = savedLang;
        updateLanguageDisplay();
    }
    
    fetchIPAddress();
}

function fetchIPAddress() {
    getIPInfo().then(result => {
        const ipElement = document.getElementById('ip-address');
        if (ipElement) {
            ipElement.textContent = result.ip || 'Unknown';
        }
        
        if (!localStorage.getItem('preferredLang')) {
            if (result.countryCode) {
                switch (result.countryCode.toUpperCase()) {
                    case 'CN':
                        currentLang = 'zh';
                        localStorage.removeItem('preferredLang');
                        break;
                    case 'JP':
                        currentLang = 'ja';
                        break;
                    case 'KR':
                        currentLang = 'ko';
                        break;
                    default:
                        currentLang = 'en';
                        break;
                }
            } else {
                currentLang = 'zh';
            }
            updateLanguageDisplay();
        }
    });
}

function updateLanguageDisplay() {
    const langText = document.getElementById('lang-text');
    const langNames = {
        'zh': '中文',
        'en': 'English',
        'ja': '日本語',
        'ko': '한국어'
    };
    if (langText) {
        langText.textContent = langNames[currentLang];
    }
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
}



function animateNumber(element, targetValue) {
    const duration = 2000;
    const startTime = Date.now();
    const startValue = 0;
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOut);
        
        element.textContent = formatNumber(currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

const translations = {
    zh: {
        profile: '个人简介',
        experience: '成长经历',
        skills: '技能专长',
        projects: '项目展示',
        contact: '联系方式',
        profile_title: '个人简介',
        profile_position: '网络安全工程师 | 渗透测试专家',
        profile_desc: '专注网络安全领域，精通渗透测试与漏洞挖掘。拥有3年以上安全从业经验，擅长Web安全、移动端安全及内网渗透。热爱信息安全技术，持有CISP-PTE、OSCP等专业认证，参与过多个众测项目并获致谢。始终站在攻击者视角，帮助企业发现安全隐患，保障系统安全。',
        stat_years: '年安全经验',
        stat_projects: '漏洞发现',
        stat_articles: 'CVE编号',
        stat_visitors: '访客数量',
        experience_title: '成长经历',
        exp_1_title: '安全研究员 @ 某安全厂商',
        exp_1_desc: '负责红队攻击与渗透测试工作，参与国家级护网行动，为金融、运营商等行业客户提供安全评估服务。',
        exp_2_title: '安全工程师 @ 互联网企业',
        exp_2_desc: '负责Web应用安全测试与代码审计，建立安全开发规范，推进SDL安全开发生命周期建设。',
        exp_3_title: '安全实习生 @ 网络安全公司',
        exp_3_desc: '参与渗透测试项目，学习漏洞挖掘技术，独立完成多个Web安全测试任务。',
        exp_4_title: '本科学习 @ 网络空间安全学院',
        exp_4_desc: '主修网络空间安全专业，系统学习密码学、网络攻防、安全协议等核心课程。',
        skills_title: '技能专长',
        projects_title: '项目展示',
        project_1_title: '漏洞扫描器',
        project_1_desc: '基于Python开发的自动化漏洞扫描工具，支持Web指纹识别、弱口令检测、SQL注入、XSS等常见漏洞检测。',
        project_2_title: '内网渗透框架',
        project_2_desc: 'Go语言开发的内网渗透测试框架，支持端口转发、横向移动、权限维持等功能，适合红队攻防演练使用。',
        project_3_title: 'Scribble 画图软件',
        project_3_desc: '基于HTML5 Canvas开发的在线画图工具，支持多种画笔颜色、粗细调节、橡皮擦功能，可保存画作。界面简洁流畅，支持触屏操作。',
        contact_title: '联系方式',
        contact_email: '电子邮箱',
        contact_github: 'GitHub',
        contact_website: '个人网站'
    },
    en: {
        profile: 'Profile',
        experience: 'Experience',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact',
        profile_title: 'Profile',
        profile_position: 'Security Engineer | Penetration Tester',
        profile_desc: 'Focused on cybersecurity, proficient in penetration testing and vulnerability research. With 3+ years of security experience, skilled in Web security, mobile security, and internal network penetration. Passionate about information security technology, holding CISP-PTE, OSCP certifications. Always standing from the attacker perspective to help enterprises discover security vulnerabilities.',
        stat_years: 'Years Security',
        stat_projects: 'Vulnerabilities Found',
        stat_articles: 'CVE Numbers',
        stat_visitors: 'Visitors',
        experience_title: 'Experience',
        exp_1_title: 'Security Researcher @ Security Vendor',
        exp_1_desc: 'Responsible for red team operations and penetration testing, participating in national-level cyber defense exercises, providing security assessment services for finance and telecom industries.',
        exp_2_title: 'Security Engineer @ Internet Company',
        exp_2_desc: 'Responsible for Web application security testing and code auditing, establishing secure development standards, promoting SDL implementation.',
        exp_3_title: 'Security Intern @ Security Company',
        exp_3_desc: 'Participated in penetration testing projects, learned vulnerability research techniques, independently completed multiple Web security testing tasks.',
        exp_4_title: 'Undergraduate @ Cybersecurity School',
        exp_4_desc: 'Major in Cybersecurity, systematically studied cryptography, network attack and defense, security protocols and other core courses.',
        skills_title: 'Skills',
        projects_title: 'Projects',
        project_1_title: 'Vulnerability Scanner',
        project_1_desc: 'Automated vulnerability scanner developed with Python, supporting Web fingerprinting, weak password detection, SQL injection, XSS and other common vulnerability detection.',
        project_2_title: 'Internal Network Pentest Framework',
        project_2_desc: 'Internal network penetration testing framework developed with Go, supporting port forwarding, lateral movement, persistence, suitable for red team operations.',
        project_3_title: 'Scribble Drawing Software',
        project_3_desc: 'An online drawing tool developed with HTML5 Canvas, supporting multiple brush colors, size adjustment, eraser function, and image saving. Clean and smooth interface with touch support.',
        contact_title: 'Contact',
        contact_email: 'Email',
        contact_github: 'GitHub',
        contact_website: 'Website'
    },
    ja: {
        profile: 'プロフィール',
        experience: '経歴',
        skills: 'スキル',
        projects: 'プロジェクト',
        contact: '連絡先',
        profile_title: 'プロフィール',
        profile_position: 'サイバーセキュリティエンジニア | ペネトレーションテスター',
        profile_desc: 'サイバーセキュリティ分野に専念し、ペネトレーションテストと脆弱性発見に精通。3年以上のセキュリティ経験を持ち、Webセキュリティ、モバイルセキュリティ、内部ネットワーク浸透に長けています。情報セキュリティ技術に情熱を注ぎ、CISP-PTE、OSCPなどの認定を取得。常に攻撃者の視点に立ち、企業がセキュリティ脆弱性を発見し、システム安全を確保するのを支援しています。',
        stat_years: '年のセキュリティ経験',
        stat_projects: '脆弱性発見',
        stat_articles: 'CVE番号',
        stat_visitors: '訪問者数',
        experience_title: '経歴',
        exp_1_title: 'セキュリティリサーチャー @ セキュリティ企業',
        exp_1_desc: 'レッドチーム攻撃とペネトレーションテストを担当。国家レベルのサイバー防衛演習に参加。金融、通信事業者などの業界顧客にセキュリティ評価サービスを提供。',
        exp_2_title: 'セキュリティエンジニア @ インターネット企業',
        exp_2_desc: 'Webアプリケーションセキュリティテストとコード監査を担当。セキュア開発規範を確立し、SDLセキュア開発ライフサイクルの構築を推進。',
        exp_3_title: 'セキュリティインターン @ サイバーセキュリティ会社',
        exp_3_desc: 'ペネトレーションテストプロジェクトに参加。脆弱性発見技術を学び、複数のWebセキュリティテストタスクを独立して完了。',
        exp_4_title: '学部生 @ サイバーセキュリティ学科',
        exp_4_desc: 'サイバーセキュリティを専攻。暗号学、ネットワーク攻防、セキュリティプロトコルなどのコアコースを体系的に学習。',
        skills_title: 'スキル',
        projects_title: 'プロジェクト',
        project_1_title: '脆弱性スキャナー',
        project_1_desc: 'Pythonで開発された自動脆弱性スキャニングツール。Webフィンガープリント認識、弱いパスワード検出、SQLインジェクション、XSSなどの一般的な脆弱性検出をサポート。',
        project_2_title: '内部ネットワーク浸透フレームワーク',
        project_2_desc: 'Go言語で開発された内部ネットワークペネトレーションテストフレームワーク。ポート転送、横方向移動、持続性をサポート。レッドチーム演習に適しています。',
        project_3_title: 'Scribble 描画ソフトウェア',
        project_3_desc: 'HTML5 Canvasで開発されたオンライン描画ツール。複数のブラシカラー、サイズ調整、消しゴム機能、画像保存をサポート。タッチ操作にも対応。',
        contact_title: '連絡先',
        contact_email: 'メールアドレス',
        contact_github: 'GitHub',
        contact_website: '個人ウェブサイト'
    },
    ko: {
        profile: '프로필',
        experience: '경력',
        skills: '기술',
        projects: '프로젝트',
        contact: '연락처',
        profile_title: '프로필',
        profile_position: '사이버 보안 엔지니어 | 페네트레이션 테스터',
        profile_desc: '사이버 보안 분야에 전념하며 페네트레이션 테스트와 취약점 발견에 능숙합니다. 3년 이상의 보안 경험을 보유하고 있으며 웹 보안, 모바일 보안 및 내부 네트워크 침투에 능숙합니다. 정보 보안 기술에 열정을 가지고 CISP-PTE, OSCP 등의 인증을 보유하고 있습니다. 항상 공격자 관점에서 기업이 보안 취약점을 발견하고 시스템 안전을 보장하도록 돕고 있습니다.',
        stat_years: '년 보안 경험',
        stat_projects: '취약점 발견',
        stat_articles: 'CVE 번호',
        stat_visitors: '방문자 수',
        experience_title: '경력',
        exp_1_title: '보안 연구원 @ 보안 기업',
        exp_1_desc: '레드 팀 공격 및 페네트레이션 테스트 업무 담당. 국가 수준 사이버 방위 훈련에 참여. 금융, 통신사 등 업계 고객에 보안 평가 서비스 제공.',
        exp_2_title: '보안 엔지니어 @ 인터넷 기업',
        exp_2_desc: '웹 애플리케이션 보안 테스트 및 코드 감사 담당. 안전 개발 규범을 수립하고 SDL 안전 개발 라이프사이클 구축을 추진.',
        exp_3_title: '보안 인턴 @ 사이버 보안 회사',
        exp_3_desc: '페네트레이션 테스트 프로젝트에 참여. 취약점 발견 기술을 학습하고 여러 웹 보안 테스트 작업을 독립적으로 완료.',
        exp_4_title: '학부생 @ 사이버 보안 학과',
        exp_4_desc: '사이버 보안을 전공. 암호학, 네트워크 공격 및 방어, 보안 프로토콜 등 핵심 과정을 체계적으로 학습.',
        skills_title: '기술',
        projects_title: '프로젝트',
        project_1_title: '취약점 스캐너',
        project_1_desc: 'Python으로 개발된 자동화 취약점 스캔 도구. 웹 지문 인식, 약한 비밀번호 검출, SQL 주입, XSS 등 일반적인 취약점 검출을 지원.',
        project_2_title: '내부 네트워크 침투 프레임워크',
        project_2_desc: 'Go 언어로 개발된 내부 네트워크 페네트레이션 테스트 프레임워크. 포트 전달, 횡적 이동, 지속성을 지원. 레드 팀 운용에 적합.',
        project_3_title: 'Scribble 드로잉 소프트웨어',
        project_3_desc: 'HTML5 Canvas로 개발된 온라인 드로잉 도구. 여러 브러시 색상, 크기 조정, 지우개 기능, 이미지 저장을 지원. 터치 지원.',
        contact_title: '연락처',
        contact_email: '이메일',
        contact_github: 'GitHub',
        contact_website: '개인 웹사이트'
    }
};

function toggleLangMenu() {
    const menu = document.getElementById('lang-menu');
    menu.classList.toggle('show');
}

function changeLanguage(lang) {
    if (currentLang === lang) return;
    currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    
    const langText = document.getElementById('lang-text');
    const langNames = {
        'zh': '中文',
        'en': 'English',
        'ja': '日本語',
        'ko': '한국어'
    };
    langText.textContent = langNames[lang];
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    const menu = document.getElementById('lang-menu');
    menu.classList.remove('show');
}

document.addEventListener('click', (e) => {
    const langMenu = document.getElementById('lang-menu');
    const langBtn = document.querySelector('.current-lang-btn');
    const styleMenu = document.getElementById('style-menu');
    const styleBtn = document.querySelector('.current-style-btn');
    
    if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.classList.remove('show');
    }
    if (!styleBtn.contains(e.target) && !styleMenu.contains(e.target)) {
        styleMenu.classList.remove('show');
    }
});

function toggleTheme() {
    isLightMode = !isLightMode;
    document.body.classList.toggle('light-mode', isLightMode);
    document.getElementById('theme-icon').textContent = isLightMode ? '🌙' : '☀️';
    localStorage.setItem('themeMode', isLightMode ? 'light' : 'dark');
}

function toggleStyleMenu() {
    const menu = document.getElementById('style-menu');
    menu.classList.toggle('show');
}

function changeStyle(style) {
    if (currentStyle === style) return;
    
    document.body.classList.remove(`style-${currentStyle}`);
    document.body.classList.add(`style-${style}`);
    
    const styleDot = document.getElementById('current-style-dot');
    const styleColors = {
        'purple': 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
        'blue': 'linear-gradient(135deg, #3B82F6, #60A5FA)',
        'yellow': 'linear-gradient(135deg, #F59E0B, #FBBF24)'
    };
    styleDot.style.background = styleColors[style];
    
    currentStyle = style;
    
    const menu = document.getElementById('style-menu');
    menu.classList.remove('show');
}

document.addEventListener('click', function(e) {
    const styleSwitcher = document.querySelector('.style-switcher');
    if (!styleSwitcher.contains(e.target)) {
        const menu = document.getElementById('style-menu');
        if (menu) {
            menu.classList.remove('show');
        }
    }
});

function openScribble() {
    window.location.href = `Scribble/Scribble.html?style=${currentStyle}`;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
            setTimeout(() => {
                section.classList.add('visible');
            }, index * 120);
        }
    });

    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 120);
        }
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 180);
        }
    });

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 60);
        }
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 180);
        }
    });

    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 120);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    applyTimeMode();
    
    try {
        detectLanguageByIP();
    } catch (e) {
        console.log('Language detection failed, continuing...');
    }
    
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500 + index * 100);
    });

    setTimeout(() => {
        document.querySelector('.section').classList.add('visible');
    }, 300);
});
