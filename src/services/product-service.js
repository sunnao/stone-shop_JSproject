import { productModel } from '../db';

class ProductService {
	// 본 파일의 맨 아래에서, ProductService(productModel) 하면, 이 함수의 인자로 전달됨
	constructor(productModel) {
		this.productModel = productModel;
	}

	// 1. 제품 등록하기
	async addProduct(productInfo) {
		// 객체 destructuring
		const { name } = productInfo;

		// 제품명 중복 확인
		const product = await this.productModel.findByName(name);
		if (product) {
			throw new Error(
				'이 제품명은 현재 사용중입니다. 다른 제품명을 입력해 주세요.',
			);
		}

		// db에 저장
		const createdNewProduct = await this.productModel.create(productInfo);

		// 정상적으로 저장됐는지 체크
		const newProductCheck = await this.productModel.findById(
			createdNewProduct._id,
		);
		if (!newProductCheck) {
			const error = new Error('제품이 정상적으로 저장되지 않았습니다.');
			error.name = 'InternalServerError';
			throw error;
		}

		return createdNewProduct;
	}

	// 2. 제품 목록받아오기.
	// 전체목록 받아오기
	async getProducts() {
		const totalProduct = await this.productModel.findAll();
		if (!totalProduct) {
			throw new Error('등록된 상품이 없습니다.');
		}
		return totalProduct;
	}

	// // category에 해당하는 제품 목록을 받음.
	// async getProductsByCategory(category) {
	//   const products = await this.productModel.findByCategory(category);
	//   return products;
	// }

	// id에 해당하는 제품을 받음.
	async getProductById(_id) {
		const product = await this.productModel.findById(_id);
		return product;
	}

	// 제품이름에 해당하는 제품을 받음.
	async getProductByName(name) {
		//상품 등록 여부 확인
		const product = await this.productModel.findByName(name);
		console.log(product);
		if (!product) {
			console.log(name);
			throw new Error('해당 제품을 찾을 수 없습니다.');
		}
		return product;
	}

	// 제품크기에 해당하는 제품을 받음.
	async getProductBySize(size) {
		return await this.productModel.findBySize(size);
	}

	//제품 가격범위에 해당하는 제품을 받음.
	async getProductByPrice(price1, price2) {
		return await this.productModel.findByPrice(price1, price2);
	}

	// 제품정보 수정
	async editProduct(_id, updateInfo) {
		// 우선 해당 id의 제품이 db에 있는지 확인
		let product = await this.productModel.findById(_id);

		// db에서 찾지 못한 경우, 에러 메시지 반환
		if (!product) {
			const error = new Error('등록되어있지 않은 상품입니다.');
			error.name = 'NotFound';
			throw error;
		}

		// 업데이트 진행
		product = await this.productModel.update({ _id, updateInfo });

		return product;
	}

	//제품 삭제
	async deleteProduct(name) {
		const product = await this.productModel.findByName(name);
		if (!product) {
			throw new Error('존재하지 않는 상품입니다.');
		}
		return await this.productModel.delete(product._id);
	}
}

const productService = new ProductService(productModel);

export { productService };