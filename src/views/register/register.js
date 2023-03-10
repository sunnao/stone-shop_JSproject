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
// const fullNameInput = $('#fullNameInput');
// const emailInput = $('#emailInput');
// const passwordInput = $('#passwordInput');
// const passwordConfirmInput = $('#passwordConfirmInput');
// const submitButton = $('#submitButton');
const fullNameInput = $('.name');
const emailInput = $('.email');
const passwordInput = $('.password');
const passwordConfirmInput = $('.password-confirm');
const submitButton = $('.submit-btn');

//이벤트리스너
submitButton.addEventListener('click', handleSubmit);

// 회원가입 진행
async function handleSubmit(e) {
	e.preventDefault();
	const fullName = fullNameInput.value;
	const email = emailInput.value;
	const password = passwordInput.value;
	const passwordConfirm = passwordConfirmInput.value;

	// 잘 입력했는지 확인
	const isFullNameValid = fullName.length >= 2;
	const isEmailValid = validateEmail(email);
	const isPasswordValid = password.length >= 4;
	const isPasswordSame = password === passwordConfirm;

	if (!isFullNameValid || !isPasswordValid) {
		return alert('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
	}

	if (!isEmailValid) {
		return alert('이메일 형식이 맞지 않습니다.');
	}

	if (!isPasswordSame) {
		return alert('비밀번호가 일치하지 않습니다.');
	}

	// 회원가입 api 요청
	try {
		const data = { fullName, email, password };

		await Api.post('/api/register', data);

		alert(`정상적으로 회원가입되었습니다.`);

		// 로그인 페이지 이동
		window.location.href = '/login';
	} catch (err) {
		console.error(err.stack);
		alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
	}
}
