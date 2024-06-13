document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const logForm = document.getElementById('logForm');
    const logList = document.getElementById('logList');
    const dateInput = document.getElementById('date');
    const contentInput = document.getElementById('content');
    const editIndexInput = document.getElementById('editIndex');

    // Register user
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username && password) {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                users.push({ username, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('注册成功！请登录。');
                window.location.href = 'login.html';
            }
        });
    }

    // Login user
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', username);
                window.location.href = 'log.html';
            } else {
                alert('用户名或密码错误');
            }
        });
    }

    // Load logs for logged in user
    if (logForm) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            alert('请先登录');
            window.location.href = 'login.html';
        }

        function loadLogs() {
            const logs = JSON.parse(localStorage.getItem('logs')) || {};
            logList.innerHTML = '';
            const userLogs = logs[loggedInUser] || [];
            userLogs.forEach((log, index) => {
                const li = document.createElement('li');
                li.innerHTML = `${log.date}: ${log.content} <button onclick="editLog(${index})">编辑</button>`;
                logList.appendChild(li);
            });
        }

        // Save or update a log
        logForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const date = dateInput.value;
            const content = contentInput.value;
            const editIndex = editIndexInput.value;

            if (date && content) {
                const logs = JSON.parse(localStorage.getItem('logs')) || {};
                const userLogs = logs[loggedInUser] || [];
                if (editIndex === '') {
                    userLogs.push({ date, content });
                } else {
                    userLogs[editIndex] = { date, content };
                    editIndexInput.value = '';
                }
                logs[loggedInUser] = userLogs;
                localStorage.setItem('logs', JSON.stringify(logs));
                loadLogs();
                logForm.reset();
            }
        });

        // Edit a log
        window.editLog = function (index) {
            const logs = JSON.parse(localStorage.getItem('logs')) || {};
            const userLogs = logs[loggedInUser] || [];
            const log = userLogs[index];
            dateInput.value = log.date;
            contentInput.value = log.content;
            editIndexInput.value = index;
        }

        // Initial load
        loadLogs();
    }

    // Random quote generation
    const quotes = [
    { "zh": "今天的努力就是为了铺设明天的成功之路。", "en": "Today's effort is to pave the way for tomorrow's success." },
    { "zh": "每一个伟大的成就都是从决定开始的。", "en": "Every great achievement begins with a decision." },
    { "zh": "只要路是对的，就不怕路远。", "en": "As long as the road is right, you are not afraid of the distance." },
    { "zh": "行动是成功的阶梯，行动越多，登得越高。", "en": "Action is the ladder to success, the more you act, the higher you climb." },
    { "zh": "坚持到底，才能笑到最后。", "en": "Persevere to the end, only then can you laugh at the end." },
    { "zh": "每一个不曾起舞的日子，都是对生命的辜负。", "en": "Every day without dancing is a day wasted." },
    { "zh": "成功属于那些努力不懈的人。", "en": "Success belongs to those who work tirelessly." },
    { "zh": "用心去做每一件事，你会发现奇迹。", "en": "Put your heart into everything you do, and you will see miracles." },
    { "zh": "梦想不会自动实现，必须通过努力去实现。", "en": "Dreams don't come true automatically; you must work hard to achieve them." },
    { "zh": "今天的付出，是为了明天的收获。", "en": "Today's effort is for tomorrow's harvest." },
    { "zh": "学习是通往梦想的桥梁。", "en": "Learning is the bridge to dreams." },
    { "zh": "每一个成功者都有一个开始。勇于开始，才能找到成功的路。", "en": "Every successful person has a beginning. Be brave to start, and you will find the way to success." },
    { "zh": "只有不断超越自我，才能迎接更加美好的明天。", "en": "Only by constantly surpassing yourself can you embrace a better tomorrow." },
    { "zh": "坚持梦想，哪怕前路坎坷，也要勇往直前。", "en": "Stick to your dreams, even if the road is bumpy, you must move forward bravely." },
    { "zh": "知识改变命运，学习成就未来。", "en": "Knowledge changes destiny, learning creates the future." },
    { "zh": "无论多么艰难，都要继续向前，因为你正在创造奇迹。", "en": "No matter how difficult it is, keep moving forward because you are creating miracles." },
    { "zh": "努力是成功的基石，没有努力就没有成功。", "en": "Effort is the cornerstone of success; without effort, there is no success." },
    { "zh": "把每一次失败都当成一次学习的机会。", "en": "Treat every failure as a learning opportunity." },
    { "zh": "学习是打开未来之门的钥匙。", "en": "Learning is the key to opening the door to the future." },
    { "zh": "每一滴汗水都是成功的阶梯。", "en": "Every drop of sweat is a step towards success." },
    { "zh": "努力不一定会成功，但不努力一定不会成功。", "en": "Effort does not necessarily lead to success, but without effort, there is no success." },
    { "zh": "梦想是指引我们前进的灯塔。", "en": "Dreams are the beacons that guide us forward." },
    { "zh": "用心学习，你会发现知识的力量无穷。", "en": "Study diligently, and you will find the power of knowledge is boundless." },
    { "zh": "成功需要付出，梦想需要行动。", "en": "Success requires effort, and dreams require action." },
    { "zh": "每一个今天的努力，都是为了明天的美好。", "en": "Every effort today is for a better tomorrow." },
    { "zh": "学会坚持，学会奋斗，才能迎接更美好的未来。", "en": "Learn to persist, learn to strive, and you can embrace a better future." },
    { "zh": "知识是你最好的投资。", "en": "Knowledge is your best investment." },
    { "zh": "努力是人生最好的礼物。", "en": "Effort is the best gift in life." },
    { "zh": "奋斗的路上，充满了无限可能。", "en": "The road of struggle is full of infinite possibilities." },
    { "zh": "每一个梦想都值得我们用尽全力去追求。", "en": "Every dream is worth pursuing with all our might." },
    { "zh": "只要你肯努力，未来充满无限可能。", "en": "As long as you are willing to work hard, the future is full of infinite possibilities." },
    { "zh": "学习是最美好的追求。", "en": "Learning is the most beautiful pursuit." },
    { "zh": "每一分努力都是在为未来积累。", "en": "Every effort is accumulating for the future." },
    { "zh": "成功的背后是无数次的努力与付出。", "en": "Behind success are countless efforts and sacrifices." },
    { "zh": "勇于追梦，才能梦想成真。", "en": "Dare to chase dreams, only then can dreams come true." },
    { "zh": "只有经历了磨难，才能品尝到成功的甘甜。", "en": "Only after experiencing hardships can you taste the sweetness of success." },
    { "zh": "奋斗的青春最美丽。", "en": "Struggling youth is the most beautiful." },
    { "zh": "每一次失败都是成功的垫脚石。", "en": "Every failure is a stepping stone to success." },
    { "zh": "知识的海洋无边无际，勇敢去探索吧。", "en": "The ocean of knowledge is boundless; go explore it bravely." },
    { "zh": "不忘初心，方得始终。", "en": "Stay true to your original intention, and you will achieve your goal." },
    { "zh": "学无止境，知识是无限的。", "en": "There is no end to learning; knowledge is infinite." },
    { "zh": "勤奋是成功的密码。", "en": "Diligence is the key to success." },
    { "zh": "每一个梦想的实现，都需要坚持不懈的努力。", "en": "The realization of every dream requires persistent effort." },
    { "zh": "追求卓越，才能走向成功的彼岸。", "en": "Pursuing excellence is the way to the shore of success." },
    { "zh": "成功的路上没有捷径，只有一步一个脚印。", "en": "There are no shortcuts on the road to success, only step by step." },
    { "zh": "用知识武装自己，你会无往不胜。", "en": "Arm yourself with knowledge, and you will be invincible." },
    { "zh": "相信自己，你是最棒的。", "en": "Believe in yourself; you are the best." },
    { "zh": "每一个伟大的梦想，都需要坚定的信念和不懈的努力。", "en": "Every great dream requires firm belief and relentless effort." },
    { "zh": "追梦的路上，汗水是最好的伙伴。", "en": "On the road of chasing dreams, sweat is the best companion." },
    { "zh": "只有不断努力，才能实现人生的价值。", "en": "Only through continuous effort can you realize the value of life." },
    { "zh": "勇敢追梦，无惧风雨。", "en": "Bravely chase dreams, unafraid of wind and rain." }
    ];

    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

    const quoteElement = document.getElementById('quote');
    const quoteEnElement = document.getElementById('quoteEn');
    if (quoteElement && quoteEnElement) {
        const randomQuote = getRandomQuote();
        quoteElement.textContent = randomQuote.zh;
        quoteEnElement.textContent = randomQuote.en;
    }
});
