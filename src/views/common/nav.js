import * as Api from '/api.js';
/* 참조함수 */
const $ = (selector) => document.querySelector(selector);

/* nav template */
export function navTemplate() {
	return `
    <nav class="w-full py-2">
			<ul id="navbar" class="flex w-full" aria-label="breadcrumbs">
				<li class="pl-10 flex items-center my-auto text-xl">
					<a href="/" class="inline-block h-10 w-10">
						<img class="w-full h-full" src="/images/dolpalee-logo.png" alt="홈버튼">
					</a>
				</li>
				<li class="pl-10">
					<button
						class="text-black bg-white hover:bg-black hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
						type="button"
						data-dropdown-toggle="dropdown"
					>
						카테고리
						<svg
							class="w-4 h-4 ml-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							></path>
						</svg>
					</button>
					<!-- Dropdown menu -->
					<div
						class="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4"
						id="dropdown"
					>
						<ul id="dropdown-ul" class="py-1" aria-labelledby="dropdown">
							<li>
								<a
									href="/category/전체"
									class="hover:bg-gray-100 text-gray-700 block px-4 py-2"
									>전체
								</a>
							</li>
						</ul>
					</div>
				</li>

				<li class="w-1/12 pl-5 my-auto ml-auto text-sm">
					<a href="/admin">페이지관리</a>
				</li>
				<li class="w-1/12 pl-5 my-auto text-sm">
					<a href="/account">계정관리</a>
				</li>
				<li class="w-1/12 pl-5 my-auto text-sm">
					<a href="/login">로그인</a>
				</li>
				<li class="w-1/12 pl-5 my-auto text-sm">
					<a href="/register">회원가입</a>
				</li>
				<li class="w-1/12 pl-5 my-auto text-sm">
					<a href="/cart">
						<span>
							<i class="fas fa-cart-shopping" aria-hidden="true"></i>
						</span>
						<span> 카트</span>
					</a>
				</li>
			</ul>
		</nav>
  `;
}

// 등록되어있는 카테고리 리스트를 api로 가져와서, 드롭박스추가
export async function getCategoriseList() {
	const dropdown = $('#dropdown-ul');
  const categories = await Api.get("/api/categories");
  categories.forEach((category) => {
    const { _id, name } = category;

    dropdown.insertAdjacentHTML(
      "beforeend",
      `<li>
				<a
					href="/category/${name}"
					class="hover:bg-gray-100 text-gray-700 block px-4 py-2"
					>${name}</a
				>
			</li>`
    );
  });
}
