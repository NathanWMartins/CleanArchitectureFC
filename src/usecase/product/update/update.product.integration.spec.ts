import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";

const input = {
    id: "123",
    name: "Pão Doce",
    price: 10,
};

describe("Test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        const product = new Product("123", "Pão", 10);
        const productRepository = new ProductRepository();

        await productRepository.create(product);

        const usecase = new UpdateProductUseCase(productRepository);

        const input = {
            id: "123",
            name: "Pão Doce",
            price: 15
        }

        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    });
});
