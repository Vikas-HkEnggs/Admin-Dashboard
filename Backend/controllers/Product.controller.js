const { Item, Option, SubOption, SubSubOption  } = require('../models/item.model');

// Admin: Create a new product with options
exports.createProductWithOptions = async (req, res) => {
    const { name, productCode, options } = req.body;
    try {
        const product = await Item.create({ name, productCode });

        for (const option of options) {
            const createdOption = await Option.create({
                productId: product.id,
                name: option.name,
                values: option.values,
                type: option.type,
            });

            if (option.subOptions) {
                for (const subOption of option.subOptions) {
                    const createdSubOption = await SubOption.create({
                        optionId: createdOption.id,
                        title: subOption.title,
                        type: subOption.type,
                    });

                    if (subOption.subSubOptions) {
                        for (const subSubOption of subOption.subSubOptions) {
                            await SubSubOption.create({
                                subOptionId: createdSubOption.id,
                                title: subSubOption.title,
                                type: subSubOption.type,
                            });
                        }
                    }
                }
            }
        }

        res.status(201).json({ message: 'Product and options created successfully!', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create product with options.' });
    }
};



exports.getAllProduct = async (req, res) => {
    try {
        const products = await Item.findAll({
            include: [
                {
                    model: Option,
                    as: 'options',
                    include: [
                        {
                            model: SubOption,
                            as: 'subOptions',
                            include: [
                                {
                                    model: SubSubOption,
                                    as: 'subSubOptions'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        // Reshape the response to include option values
        const enhancedProducts = products.map(product => ({
            id: product.id,
            name: product.name,
            productCode: product.productCode,
            options: product.options.map(option => ({
                id: option.id,
                name: option.name,
                type: option.type,
                values: option.values, // Include values for each option
                subOptions: (option.type === "boolean") 
                    ? option.subOptions.map(subOption => ({
                        id: subOption.id,
                        optionId: subOption.optionId,
                        title: subOption.title,
                        type: subOption.type,
                        subSubOptions: subOption.subSubOptions.map(subSubOption => ({
                            id: subSubOption.id,
                            title: subSubOption.title
                        }))
                    })) 
                    : []
            }))
        }));

        res.status(200).json(enhancedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to retrieve products.' });
    }
};


exports.getProductOptions = async (req, res) => {
    try {
        const options = await Option.findAll({
            where: { productId: req.params.productId },
            include: [
                {
                    model: SubOption,
                    as: 'subOptions', // Matches alias in model definition
                    include: [
                        {
                            model: SubSubOption,
                            as: 'subSubOptions', // Matches alias in model definition
                        },
                    ],
                },
            ],
        });

        // Format response if needed
        const enhancedOptions = options.map(option => ({
            id: option.id,
            name: option.name,
            type: option.type,
            subOptions: option.subOptions ? option.subOptions.map(subOption => ({
                id: subOption.id,
                title: subOption.title,
                type: subOption.type,
                subSubOptions: subOption.subSubOptions ? subOption.subSubOptions.map(subSubOption => ({
                    id: subSubOption.id,
                    title: subSubOption.title
                })) : []
            })) : []
        }));

        res.status(200).json(enhancedOptions);
    } catch (error) {
        console.error('Error fetching product options:', error);
        res.status(500).json({ message: 'Failed to retrieve product options.' });
    }
};
