// import { response } from 'express';
import { navTemplate, getCategoriseList, logoutEvent, loginClick } from '/common/nav.js';
import { quest } from '/common/quest.js';
import * as Api from '/api.js';
/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate(),getCategoriseList();
	logoutEvent();
	loginClick();
}
addNav();
addOptionsToSelectBox();;

/* 참조함수 */
const $ = (selector) => document.querySelector(selector);
/* 토큰 */
const token = window.sessionStorage.getItem('token');

const imginput = $('.imgInput');

/* image upload */
function imgPathDisplay() {
	const preview = $('.imgPath');
	const curFiles = imginput.files;
	/* 업로드 클릭시 초기화 */
	while (preview.firstChild) {
		preview.removeChild(preview.firstChild);
	}

	if (curFiles.length === 0) {
		const para = document.createElement('p');
		para.textContent = '파일이 없습니다. 파일을 추가해주세요.';
	} else {
		const list = document.createElement('ol');
		list.setAttribute('class', 'inline-block');
		preview.appendChild(list);

		for (const file of curFiles) {
			file.src = URL.createObjectURL(file);
			const listItem = document.createElement('li');
			const para = document.createElement('p');
			para.textContent = `${file.name}`;
			listItem.appendChild(para);
			list.appendChild(listItem);
			return file;
		}
	}
}
let formData = new FormData();

let newTitle;
let newColor;
let newCategoryId;
let newPrice;
let newStock;
let newSize;
let newDesc;
//title,desc, color,category,size,stock,price
imginput.addEventListener('change', () => {
	formData.append('productImage', imgPathDisplay());
});

const descInput = $('#detailDescription');
descInput.addEventListener('change', (e) => {
	newDesc = e.target.value;
	return newDesc;
});

const titleInput = $('#titleInput');
titleInput.addEventListener('change', (e) => {
	newTitle = e.target.value;
	return newTitle;
});



const categoryValue = $('#category');
// 등록되어있는 카테고리 리스트를 api로 가져와서, 옵션 태그를 만들어 삽입함.
async function addOptionsToSelectBox() {
  const categorys = await Api.get("/api/categories");
  categorys.forEach((category) => {
    const { _id, name } = category;

    categoryValue.insertAdjacentHTML(
      "beforeend",
      `
      <option value=${_id}> ${name} </option>`
    );
  });
}
categoryValue.addEventListener('change', (e) => {
	
	newCategoryId = e.target.value;
	return newCategoryId;
});





const colorValue = $('#color');
colorValue.addEventListener('change', (e) => {
	newColor = e.target.value;
	return newColor;
});
/* 제품추가 */
const sizeSmall = $('#sizeSmall');
sizeSmall.addEventListener('change', (e) => {
	return (newSize = e.target.value);
});
const sizeMedium = $('#sizeMedium');
sizeMedium.addEventListener('change', (e) => {
	return (newSize = e.target.value);
});
const sizeLarge = $('#sizeLarge');
sizeLarge.addEventListener('change', (e) => {
	return (newSize = e.target.value);
});

const stock = $('#stockInput');
stock.addEventListener('change', (e) => {
	newStock = e.target.value;
	return newStock;
});

const price = $('#priceInput');
price.addEventListener('change', (e) => {
	newPrice = e.target.value;
	return newPrice;
});

const addBtn = $('.addProduct');

addBtn.addEventListener('click', (e) => {
	// e.preventDefault();
	const desc = $('#detailDescription');
	desc.addEventListener('change', (e) => {
		newDesc = e.target.value;
		return newDesc;
	});
	formData.append('name', newTitle);
	formData.append('color', newColor);
	formData.append('categoryId', newCategoryId);
	formData.append('size', newSize);
	formData.append('stock', newStock);
	formData.append('price', newPrice);
	formData.append('detailDescription', newDesc);

	addProduct(formData);
	alert('제품이 등록되었습니다.');
});

async function addProduct(formData) {
	await fetch('/api/product', {
		method: 'POST',
		headers: {
			authorization: `bearer ${token}`,
		},
		body: formData,
	});
}
