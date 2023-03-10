import * as Api from '/api.js';
import { validateEmail } from '/useful-functions.js';
const $ = (selector) => document.querySelector(selector);
import { navTemplate, getCategoriseList, logoutEvent, loginClick } from '/common/nav.js';

/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate(), getCategoriseList();
	logoutEvent();
	loginClick();
}
addNav();

// 요소(element), input 혹은 상수
const emailInput = $('.email');
const passwordInput = $('.password');
const submitButton = $('.submit-btn');

//이벤트리스너
submitButton.addEventListener('click', handleSubmit);

// 로그인 진행
async function handleSubmit(e) {
	e.preventDefault();

	const email = emailInput.value;
	const password = passwordInput.value;

	// 잘 입력했는지 확인
	const isEmailValid = validateEmail(email);
	const isPasswordValid = password.length >= 4;

	if (!isEmailValid || !isPasswordValid) {
		return alert(
			'비밀번호가 4글자 이상인지, 이메일 형태가 맞는지 확인해 주세요.',
		);
	}

	// 로그인 api 요청
	try {
		const data = { email, password };
		const result = await Api.post('/api/login', data);
		const token = result.token;

		// 로그인 성공, 토큰을 세션 스토리지에 저장
		sessionStorage.setItem('token', token);

		alert(`정상적으로 로그인되었습니다.`);

		// 로그인 후 보고있던 페이지로 이동
		const pathname = sessionStorage.pathname;
		window.location.href=`${pathname}`;
		sessionStorage.removeItem(pathname)
	} catch (err) {
		console.error(err.stack);
		alert(`${err.message}`);
	}
}
